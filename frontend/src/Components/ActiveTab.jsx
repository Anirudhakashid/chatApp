import { useChatStore } from "../store/useChatStore";

function ActiveTab() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-[#0E1117] p-1 border border-white/[0.06] mb-1">
      <button
        onClick={() => setActiveTab("chats")}
        className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          activeTab === "chats"
            ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(23,99,207,0.28)]"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          activeTab === "contacts"
            ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(23,99,207,0.28)]"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTab;
