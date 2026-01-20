import { useChatStore } from "../store/useChatStore";

function ActiveTab() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="flex border-b border-white/[0.06] mb-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === "chats"
            ? "text-white border-blue-600"
            : "text-gray-400 hover:text-white border-transparent"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === "contacts"
            ? "text-white border-blue-600"
            : "text-gray-400 hover:text-white border-transparent"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTab;
