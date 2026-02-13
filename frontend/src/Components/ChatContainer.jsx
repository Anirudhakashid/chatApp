import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessageLoading from "./MessageLoading";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />

      {messages.length === 0 && !isMessagesLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        </div>
      ) : isMessagesLoading ? (
        <MessageLoading />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-6 2xl:px-8 pb-4">
          <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === authUser._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-900 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  {msg.createdAt && (
                    <p
                      className={`text-[12px] text-white/60 ${
                        msg.senderId === authUser._id
                          ? "text-end"
                          : "text-start"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
