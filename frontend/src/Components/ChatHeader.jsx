import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoConvo from "./NoConvo";
import { XIcon } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

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
    <header className="max-h-[84px] px-6 flex-1 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0A0B] shrink-0">
      <div className="flex items-center space-x-3">
        <div className="h-9 w-9 rounded-full overflow-hidden">
          <img
            src={selectedUser.profilePic || "./user.png"}
            alt={selectedUser.fullName || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">
            {selectedUser.fullName}
          </span>
          <span className="text-[10px] text-green-500">Active now</span>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon />
      </button>
    </header>
  );
}

export default ChatHeader;
