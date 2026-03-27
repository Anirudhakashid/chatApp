import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatList() {
  const { onlineUsers } = useAuthStore();

  const { chats, isUserLoading, getChats, setSelectedUser } = useChatStore();

  useEffect(() => {
    getChats(true);
  }, [getChats]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

  if (chats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <button
            key={chat._id}
            className="w-full text-left rounded-2xl border border-white/[0.05] bg-[#101319] px-3.5 py-3 transition-all hover:border-white/[0.09] hover:bg-white/[0.04] active:scale-[0.99]"
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={chat.profilePic || "/user.png"}
                  alt={chat.fullName || "User"}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0F1115] ${
                    isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-slate-100 font-semibold truncate">
                  {chat.fullName}
                </h4>
                <p className="mt-0.5 text-xs text-white/45 truncate">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ChatList;
