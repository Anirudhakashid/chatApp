import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList() {
  const { chats, isUserLoading, getChats, setSelectedUser, selectedUser } =
    useChatStore();

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
    <div className="space-y-1">
      {chats.map((chat) => (
        <button
          key={chat._id}
          className="w-full text-left rounded-xl px-3 py-2 transition-colors hover:bg-white/5 active:bg-white/10"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={chat.profilePic || "/user.png"}
                alt={chat.fullName || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#0F1115]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-slate-200 font-medium truncate">
                {chat.fullName}
              </h4>
              <p className="text-xs text-white/50 truncate">Tap to chat</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ChatList;
