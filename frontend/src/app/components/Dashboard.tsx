"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CategoryModal from "../components/CategoryModal";
import Image from "next/image";
import { utils, writeFile } from "xlsx";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";

type SpeechRecognitionEvent = Event & {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  readonly error: string;
};

type SpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface Message {
  role: "user" | "bot";
  text: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! How can I assist you with government opportunities?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // If you don't plan to use it right now:
  const [, setSelectedCategory] = useState<string | null>(null);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  // Effect to load query history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("queryHistory");
    if (saved) {
      setQueryHistory(JSON.parse(saved));
    }
  }, []);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
  }, [queryHistory]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setQueryHistory((prev) => [...prev, input]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      const botMsg: Message = {
        role: "bot",
        text: data.table
          ? data.table
          : Array.isArray(data.answer)
          ? JSON.stringify(data.answer, null, 2)
          : String(data.answer ?? "No response from server"),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Fetch failed", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn"); // Don't remove queryHistory
    router.push("/");
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    // Line 129
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[event.resultIndex][0].transcript;
      console.log("Speech recognized:", speechResult);
      setInput(speechResult);
    };

    // Line 135
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech error", event.error);
      alert("Speech recognition error: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      handleSend();
    };

    recognition.start();
  };

  // Function to download table as Excel
  const downloadExcel = (tableHTML: string) => {
    // Parse the table HTML
    const table = document.createElement("div");
    table.innerHTML = tableHTML;
    const rows = table.querySelectorAll("table tr");

    // Prepare the data for Excel
    const data: any[] = [];
    rows.forEach((row: any) => {
      const cols = row.querySelectorAll("td, th");
      const rowData = Array.from(cols).map((col: any) => col.innerText);
      data.push(rowData);
    });

    // Create a worksheet from the data
    const ws = utils.aoa_to_sheet(data);

    // Create a new workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    // Download the Excel file
    writeFile(wb, "table.xlsx");
  };

  return (
    <div className="h-screen flex text-black bg-white">
      {/* Sidebar */}
      {/* <Sidebar
        queryHistory={queryHistory}
        onPromptClick={handlePromptClick}
        onLogout={logout}
      /> */}

      {/* Main Chat Area */}
      <main className="flex-1  flex flex-col p-4 overflow-hidden">
        <div className="flex-1 flex-col flex w-1/2 mx-auto overflow-y-auto  space-y-4" ref={chatRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`overflow-wrap  p-3 py-1.5 rounded-xl ${
                msg.role === "user"
                  ? "self-end inline-block  max-w-1/2  bg-gray-200"
                  : "self-start text-white   bg-[#0F284A] "
              }`}
            >
              {msg.text.startsWith("<table") ? (
                <div className="">
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                    className="overflow-x-auto border border-gray-600 rounded-lg shadow-lg"
                  />
                  <button
                    onClick={() => downloadExcel(msg.text)}
                    className="mt-4 inline-flex items-center gap-2 bg-transparent border-2 border-gray-300 text-white font-semibold py-2 px-5 rounded-full hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 ease-in-out"
                  >
                    Download Excel
                  </button>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handlePromptClick={handlePromptClick}
          isListening={isListening}
          startListening={startListening}
        />
      </main>

      {/* Listening Modal */}
      {isListening && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3F3B5A] text-white p-4 rounded-lg shadow-lg flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse w-10 h-10 rounded-full bg-yellow-500"></div>
            <span>Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
