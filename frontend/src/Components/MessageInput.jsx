import React from "react";
import { Send, PlusCircle, Smile } from "lucide-react";

function MessageInput() {
  return (
    <>
      {/* <div className="bg-[#0F1115] border-t border-white/[0.06] p-3 md:p-5 lg:p-5 2xl:p-6 pb-4 md:pb-6 lg:pb-6 shrink-0">
        <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="bg-[#0A0A0B] border border-white/[0.06] rounded-lg flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="bg-transparent border-none text-white placeholder-gray-400 w-full focus:ring-0 focus:outline-none px-4 py-3 lg:px-4 lg:py-3.5 text-sm lg:text-base resize-none min-h-[48px] lg:min-h-[52px]"
              placeholder="Message Sarah Chen"
              rows={1}
            />
            <div className="flex items-center justify-between px-2 pb-2 lg:px-2.5 lg:pb-2.5">
              <div className="flex items-center gap-1 lg:gap-1.5">
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                  <PlusCircle className="w-5 h-5 lg:w-5 lg:h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                  <Smile className="w-5 h-5 lg:w-5 lg:h-5" />
                </button>
              </div>
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 lg:p-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
      "MessageInput component is under development" ;
    </>
  );
}

export default MessageInput;
