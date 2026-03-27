import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessageLoading from "./MessageLoading";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const messagesEndRef = useRef(null);

  // fetches old messages and starts listening for live ones.
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <div className="flex-1 overflow-y-auto px-3 pt-3 md:px-6 lg:px-6 2xl:px-8 pb-4">
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
                  } max-w-[88%] sm:max-w-[75%] px-3 py-2 sm:px-4`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="shared"
                      className="rounded-lg h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setFullScreenImage(msg.image)}
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
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Area */}
      <MessageInput />

      {/* Fullscreen Image Modal */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            onClick={() => setFullScreenImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullScreenImage}
            alt="Full screen"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
