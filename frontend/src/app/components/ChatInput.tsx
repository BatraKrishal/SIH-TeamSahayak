"use client";
import { useState } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handlePromptClick: (prompt: string) => void;
  isListening: boolean;
  startListening: () => void;
}

const ChatInput = ({
  input,
  setInput,
  handleSend,
  handlePromptClick,
  isListening,
  startListening,
}: ChatInputProps) => {
  const examplePrompts = [
    "I know Python, find me an internship",
    "Internship for CS",
    "मुझे पायथन आती है, इंटर्नशिप ढूंढो।",
  ];

  return (
    <div className="border mb-5 border-black/30 mx-auto shadow-xl h-30 w-1/2 rounded-4xl p-4">
      {/* <div className="mb-2 text-sm text-gray-400">Example Prompts:</div>
      <div className="flex gap-2 flex-wrap mb-4">
        {examplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            className="bg-[#35304D] text-white px-3 py-1 rounded"
          >
            {prompt}
          </button>
        ))}
      </div> */}

      <div className="flex gap-2 ">
        <input
          type="text"
          placeholder="ASK SAHAYAK"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full p-3 rounded-md outline-none "
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="flex items-center justify-center gap-2 px-5 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 hover:from-blue-500 hover:to-indigo-500 active:scale-95"
        >
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Mic button with pulse */}
        <div className="relative">
          {isListening && (
            <div className="absolute inset-0 animate-ping w-12 h-12 rounded-full bg-blue-500 opacity-30 z-0"></div>
          )}

          <button
            onClick={startListening}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4A456A] hover:ring-2 hover:ring-blue-400 hover:bg-[#635FC7] transition shadow-md relative z-10"
            title="Speak"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.25v2.25m0-2.25a5.25 5.25 0 0 1-5.25-5.25M12 18.25a5.25 5.25 0 0 0 5.25-5.25M9 10.5a3 3 0 1 0 6 0v-4.5a3 3 0 1 0-6 0v4.5zM19.5 10.5v.75a7.5 7.5 0 0 1-15 0v-.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
