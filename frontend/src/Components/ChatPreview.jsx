export default function ChatPreview() {
  return (
    <div
      className="
        w-[440px]
        min-h-[220px]
        rounded-2xl
        border border-white/10
        bg-white/5
        p-6
        opacity-70
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
        <div className="relative">
          <div className="h-11 w-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
        </div>
        <p className="text-base text-white font-medium">Anirudha</p>
      </div>

      {/* Messages */}
      <div className="space-y-3 text-sm">
        <div className="max-w-[80%] rounded-xl bg-white/10 px-4 py-2 text-white">
          Hey! This chat feels smooth 👋
        </div>

        <div className="ml-auto max-w-[80%] rounded-xl bg-blue-500/80 px-4 py-2 text-white">
          Yeah, real-time works great!
        </div>
      </div>

      {/* Typing */}
      <p className="mt-4 text-xs text-white/50">Anirudha is typing…</p>
    </div>
  );
}
