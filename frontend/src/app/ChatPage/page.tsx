"use client";

import React, { useState } from "react";
import { X, Menu, MessageCircle } from "lucide-react";
import Dashboard from "../components/Dashboard";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    degree: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: "",
    interests: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const resp = await fetch("http://localhost:5500/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: form.skills,
          interests: form.interests,
          branch: form.branch,
          degree: form.degree,
          city: form.city,
          state: form.state,
        }),
      });

      const j = await resp.json();
      if (!resp.ok) throw new Error(j.error || "Server error");

      setResults(j.results || []);
      setHistory([
        { query: { ...form }, results: j.results || [] },
        ...history,
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Glass Background Overlay when Chat Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-30 transition-opacity"
          onClick={() => setIsOpen(false)} // close on outside click
        />
      )}

      {/* Chatbot Button (hidden when open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#0F284A] text-white shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Sliding Dashboard */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button inside dashboard */}
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <Dashboard />
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-[#0F284A]  border-r p-4 hidden md:block">
        <h2 className="text-lg text-white bg-[#0F284A] font-semibold mb-4 rounded-lg">
          Previous Responses
        </h2>
        {history.length === 0 ? (
          <p className="text-white text-sm">No responses yet</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="p-2 border rounded hover:bg-[#14325c]">
                <p className="text-sm text-white truncate">
                  Skills: {h.query.skills || "-"}
                </p>
                <p className="text-xs text-white">
                  {h.query.city}, {h.query.state}
                </p>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Sidebar (Mobile Drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-opacity-40 z-40 md:hidden">
          <div className="w-64 bg-white h-full p-4 shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg text-white bg-[#0F284A] font-semibold mb-4 rounded-lg">
              Previous Responses
            </h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No responses yet</p>
            ) : (
              <ul className="space-y-2">
                {history.map((h, i) => (
                  <li key={i} className="p-2 border rounded hover:bg-gray-50">
                    <p className="text-sm text-gray-700 truncate">
                      Skills: {h.query.skills || "-"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {h.query.city}, {h.query.state}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mt-4  font-bold mb-6 text-[#0F284A] text-3xl  text-center">
          Find Your Internship
        </h1>

        {/* Form */}
        {/* Form */}
        <form
          onSubmit={submit}
          className="w-full max-w-2xl mx-auto bg-[#0F284A] p-8 md:p-10 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-4">
            Enter Your Details
          </h2>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              name="branch"
              value={form.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="cgpa"
              value={form.cgpa}
              onChange={handleChange}
              placeholder="CGPA"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />

          <input
            name="interests"
            value={form.interests}
            onChange={handleChange}
            placeholder="Interests (comma separated)"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Recommendations"}
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  degree: "",
                  branch: "",
                  year: "",
                  cgpa: "",
                  skills: "",
                  interests: "",
                  city: "",
                  state: "",
                })
              }
              className="px-6 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-xl shadow hover:bg-gray-100 transition duration-300"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="mt-6">
          {error && <div className="text-red-600">{error}</div>}
          {results.length > 0 && (
            <div>
              <h2 className="text-4xl font-black mb-3  text-[#0F284A]">Top Internship Picks</h2>
              <div className="space-y-4">
                {results.map((r) => (
                  <a
                    key={r.id}
                    href={r.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-black">{r.title}</h3>
                        <p className="text-sm text-black">
                          {[r.city, r.state].filter(Boolean).join(", ")}
                        </p>
                      </div>
                      {/* <div className="text-sm text-black">
                        Score: {r.score}
                      </div> */}
                    </div>
                    {/* {r.why && (
                      <p className="mt-2 text-sm text-black">Why: {r.why}</p>
                    )} */}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
