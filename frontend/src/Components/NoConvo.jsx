import { MessageSquare, Plus } from "lucide-react";

function NoConvo() {
  return (
    <div>
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#0A0A0B]">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Large Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-3xl bg-slate-100 dark:bg-[#1f2933]/30 flex items-center justify-center">
              <MessageSquare
                className="w-16 h-16 text-slate-300 dark:text-[#1f2933]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-[#E5E7EB]">
              Start a conversation
            </h2>
            <p className="text-slate-500 dark:text-[#9CA3AF] text-base leading-relaxed">
              Choose a Contact from the sidebar to start chatting or to view
              your message history.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button className="px-5 py-2.5 bg-[#1763cf] text-white rounded-lg font-medium text-sm hover:brightness-110 transition-all flex items-center gap-2 active:scale-95">
              <Plus className="w-5 h-5" />
              New Message
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NoConvo;
