"use client";
import CategoryModal from "../components/CategoryModal";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface SidebarProps {
  queryHistory: string[];
  onPromptClick: (query: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ queryHistory, onPromptClick, onLogout }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="h-screen">
      {/* Sidebar */}
      <div
        className="group  bg-[#0F284A]/95 backdrop-blur-sm text-white h-full 
                   transition-all duration-300 w-20 hover:w-64 flex flex-col absolute"
      >
        {/* Top section with Hamburger (MUI) */}
        <div className="flex items-center py-4 px-7">
          <MenuIcon className="text-white" />
        </div>
        <div className="flex items-center py-4 px-7">
          <button className="flex items-center gap-2 w-full   py-2  rounded-lg  transition">
                <EditOutlinedIcon className="w-5 h-5" />
                <span className="truncate">New Chat</span>
              </button>
        </div>

        {/* Menu items */}
        <div className="flex-1 px-2 overflow-hidden">
          <ul className="mt-4 space-y-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* New Chat */}
            <li>
              
            </li>

            {/* Recommendation */}
            {/* <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              >
                ✨ Get Recommendation
              </button>
            </li> */}

            {/* Modal */}
            <CategoryModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSelect={(category) => {
                setSelectedCategory(category);
                console.log("Selected Category:", category);
              }}
            />

            {/* History */}
            <li className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <p className="text-xs font-semibold  text-white/80 pl-6 px-3 mb-2 flex items-center gap-1">
                 Recent
              </p>
              {queryHistory.length > 0 ? (
                queryHistory.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => onPromptClick(query)}
                    className="w-full text-left  hover:bg-white/10 pl-6 px-3 py-2 rounded-full truncate transition"
                    title={query}
                  >
                    {query}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-xs px-2">No history yet</p>
              )}
            </li>
          </ul>
        </div>

        {/* Bottom Logout
        <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 py-2 px-3 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div> */}

        {/* Bottom Settings (MUI) */}
        <div className="flex items-center py-4 px-7 pb-15 ">
          <SettingsIcon className="text-white " />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



