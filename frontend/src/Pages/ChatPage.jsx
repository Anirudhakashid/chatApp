import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatList from "../Components/ChatList";
import ContactList from "../Components/ContactList";
import ChatContainer from "../Components/ChatContainer";
import { Search, Settings, MessageSquare, Users } from "lucide-react";
import ActiveTab from "../Components/ActiveTab";
import UserProfile from "../Components/UserProfile";
import NoConvo from "../Components/NoConvo";

const ChatInterface = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="flex h-screen w-full bg-[#0A0A0B] text-gray-200 overflow-hidden">
      {/* Sidebar for Desktop only */}
      <aside className="hidden lg:flex w-80 bg-[#0F1115] flex-col border-r border-white/[0.06] shrink-0 h-full">
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-center mb-6">
            <img
              src="https://www.anirudhakashid.tech/chattioLogo.png"
              className=" w-13 h-8 rounded-lg"
              alt="Chattio logo"
            />
            <h1 className="text-white text-xl font-semibold tracking-tight">
              Chattio
            </h1>
          </div>

          <div className="flex w-full items-center rounded-lg bg-[#181A20] border border-white/[0.06] h-10 px-3 mb-4 focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none text-sm text-white placeholder-gray-400 w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Active tabs buttons */}
          <ActiveTab />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-0.5">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* UserProfile */}
        <UserProfile />
      </aside>

      {/* Main Chat Area - Right side */}
      <main className="flex-1 flex flex-col h-full relative bg-[#0A0A0B] w-full">
        <div className="flex-1 flex items-center justify-center">
          {selectedUser ? <ChatContainer /> : <NoConvo />}
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex bg-[#0F1115] border-t border-white/[0.06] h-16 shrink-0 items-center justify-around px-2">
          <button className="flex flex-col items-center justify-center gap-1 flex-1 text-blue-600">
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-medium">Chats</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400 hover:text-white transition-colors">
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium">Contacts</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default ChatInterface;
