# // Full project: Frontend (React + Tailwind) and Backend (Flask)
# // -----------------------------------------------------------------
# // FILE: backend/app.py
# // Run: python backend/app.py  (ensure .env contains SQLITE_PATH and NEON_DATABASE_URL if using Postgres)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os, math, datetime, sqlite3, numpy as np
from typing import List, Tuple
import psycopg2
from psycopg2.extras import RealDictCursor
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

PG_URL      = os.getenv("NEON_DATABASE_URL")
SQLITE_PATH = os.getenv("SQLITE_PATH", "./db.db")
MODEL_NAME  = os.getenv("EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

app = Flask(__name__)
CORS(app)

# ---------- DB helpers (sqlite for internships + embeddings)

def sqli_conn():
    con = sqlite3.connect(SQLITE_PATH)
    con.row_factory = sqlite3.Row
    return con

# Lightweight versions of helper functions from your script

def load_internships() -> List[sqlite3.Row]:
    with sqli_conn() as con:
        rows = con.execute("""
            SELECT id, title, start_date, duration, stipend, stipend_value, apply_by, link, city, state, skills
            FROM internships
        """).fetchall()
        return rows

# Load embeddings stored as bytes -> numpy arrays

def load_all_embeddings(jobs: List[sqlite3.Row]):
    vecs, meta = [], []
    with sqli_conn() as con:
        for j in jobs:
            row = con.execute("SELECT vector FROM job_embeddings WHERE job_id=?", (j["id"],)).fetchone()
            if not row:
                continue
            vecs.append(np.frombuffer(row["vector"], dtype=np.float32))
            meta.append(j)
    if not vecs:
        return np.zeros((0, 384), dtype=np.float32), []
    return np.vstack(vecs), meta

# date parsing

def parse_iso(d: str):
    try:
        return datetime.date.fromisoformat(d[:10])
    except:
        return None


def days_since_or_default(date_str1: str, date_str2: str) -> int:
    for s in (date_str1, date_str2):
        if s:
            d = parse_iso(s)
            if d:
                return (datetime.date.today() - d).days
    return 60

# scoring

def score_jobs(user_vec, job_mat, metas, user_city, user_state):
    if job_mat.shape[0] == 0:
        return []

    sims = (user_vec @ job_mat.T).ravel()
    out = []
    for sim, m in zip(sims, metas):
        ds = days_since_or_default(m["start_date"], m["apply_by"])
        recency = math.exp(-ds/14.0)
        loc_bonus = 0.05 if (user_city and user_state and m["city"] == user_city and m["state"] == user_state) else 0.0
        score = 0.82*float(sim) + 0.15*recency + loc_bonus
        reasons = []
        if sim > 0.35: reasons.append("skills fit")
        if recency > 0.7: reasons.append("recent posting")
        if loc_bonus > 0: reasons.append("near your location")
        out.append({
            "id": m["id"],
            "title": m["title"],
            "city": m["city"],
            "state": m["state"],
            "link": m["link"],
            "score": round(score, 3),
            "why": ", ".join(reasons[:3])
        })
    out.sort(key=lambda x: x["score"], reverse=True)
    return out[:5]

# Load model once (expensive)
print("Loading embedding model... (this may take a while)")
model = SentenceTransformer(MODEL_NAME)
print("Model loaded")

# Preload internships + embeddings into memory on startup for faster responses
print("Loading internships and embeddings...")
jobs = load_internships()
job_mat, metas = load_all_embeddings(jobs)
print(f"Loaded {len(metas)} embeddings for {len(jobs)} internships")

@app.route('/api/recommendations', methods=['POST'])
def recommend():
    data = request.json or {}
    # expected fields from frontend
    skills = data.get('skills', '')
    interests = data.get('interests', '')
    branch = data.get('branch', '')
    degree = data.get('degree', '')
    city = data.get('city', '')
    state = data.get('state', '')

    user_text = " ".join([skills, interests, branch, degree, city, state])
    u_vec = model.encode([user_text], normalize_embeddings=True)

    # ensure job matrix is up-to-date; simple approach: use preloaded job_mat
    if job_mat.shape[0] == 0:
        return jsonify({"error": "No job embeddings available"}), 500

    top5 = score_jobs(u_vec, job_mat, metas, city, state)
    return jsonify({"results": top5})

if __name__ == '__main__':
    app.run(debug=True, port=5500)


# // -----------------------------------------------------------------
# // FILE: frontend/src/App.jsx  (React + Tailwind)
# // Use with create-react-app or Vite. Include Tailwind per usual setup.

