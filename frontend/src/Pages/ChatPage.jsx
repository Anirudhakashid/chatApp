import { useChatStore } from "../store/useChatStore";
import ChatList from "../Components/ChatList";
import ContactList from "../Components/ContactList";
import ChatContainer from "../Components/ChatContainer";
import { Search, Settings, MessageSquare, Users } from "lucide-react";
import ActiveTab from "../Components/ActiveTab";
import UserProfile from "../Components/UserProfile";
import NoConvo from "../Components/NoConvo";

const ChatInterface = () => {
  const { activeTab, selectedUser, setActiveTab, setSelectedUser } =
    useChatStore();

  const showMobileChat = Boolean(selectedUser);
  const showSettingsPanel = activeTab === "settings";

  const handleMobileNav = (tab) => {
    setSelectedUser(null);
    setActiveTab(tab);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#0A0A0B] text-gray-200 overflow-hidden">
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
      <main className="flex-1 flex flex-col h-full relative bg-[#0A0A0B] w-full min-h-0">
        <div className="hidden lg:flex flex-1 items-center justify-center min-h-0">
          {selectedUser ? <ChatContainer /> : <NoConvo />}
        </div>

        <div className="flex flex-1 min-h-0 lg:hidden">
          {showMobileChat ? (
            <ChatContainer />
          ) : (
            <section className="flex flex-1 flex-col min-h-0 bg-[#0A0A0B]">
              <div className="px-4 pt-5 pb-3 border-b border-white/[0.06] bg-[#11131a]">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://www.anirudhakashid.tech/chattioLogo.png"
                    className="w-11 h-8 rounded-xl shadow-[0_10px_24px_rgba(23,99,207,0.28)]"
                    alt="Chattio logo"
                  />
                  <div className="min-w-0">
                    <h1 className="text-white text-lg font-semibold tracking-tight">
                      Chattio
                    </h1>
                    <p className="text-xs text-white/45">
                      Stay close to your people
                    </p>
                  </div>
                </div>

                {!showSettingsPanel && (
                  <>
                    <div className="flex w-full items-center rounded-2xl bg-[#181B23] border border-white/[0.07] h-12 px-4 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
                      <Search className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder={
                          activeTab === "chats"
                            ? "Search recent chats"
                            : "Search contacts"
                        }
                        className="bg-transparent border-none text-sm text-white placeholder-gray-400 w-full focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <ActiveTab />
                  </>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 bg-[linear-gradient(180deg,rgba(14,16,21,0.9)_0%,rgba(10,10,11,1)_18%)]">
                {showSettingsPanel ? (
                  <div className="space-y-4">
                    <UserProfile variant="panel" />
                    <div className="rounded-2xl border border-white/[0.06] bg-[#101319] p-4">
                      <h2 className="text-sm font-semibold text-white">
                        Mobile tips
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Jump between chats and contacts using the bottom bar.
                        Open any conversation to switch into the full-screen
                        chat view.
                      </p>
                    </div>
                  </div>
                ) : activeTab === "chats" ? (
                  <ChatList />
                ) : (
                  <ContactList />
                )}
              </div>
            </section>
          )}
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`lg:hidden bg-[#11131a]/95 backdrop-blur-sm border-t border-white/[0.06] shrink-0 items-center justify-around px-2 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.35)] ${
            showMobileChat ? "hidden" : "flex"
          }`}
        >
          <button
            onClick={() => handleMobileNav("chats")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors ${
              activeTab === "chats"
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-medium">Chats</span>
          </button>
          <button
            onClick={() => handleMobileNav("contacts")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors ${
              activeTab === "contacts"
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium">Contacts</span>
          </button>
          <button
            onClick={() => handleMobileNav("settings")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors ${
              activeTab === "settings"
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default ChatInterface;
