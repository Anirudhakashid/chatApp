import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoConvo from "./NoConvo";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setSelectedUser]);

  if (!selectedUser) {
    return <NoConvo />;
  }

  return (
    <header className="max-h-[84px] px-4 py-3 sm:px-6 flex-1 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0A0B] shrink-0">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src={selectedUser.profilePic || "./user.png"}
            alt={selectedUser.fullName || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-white truncate">
            {selectedUser.fullName}
          </span>
          <span
            className={`text-[10px] ${isOnline ? "text-green-500" : "text-white/50"}`}
          >
            {isOnline ? "Active now" : "Offline"}
          </span>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
      >
        <XIcon />
      </button>
    </header>
  );
}

export default ChatHeader;
