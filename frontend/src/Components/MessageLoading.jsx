function MessagesLoadingSkeleton() {
  const widths = ["w-32", "w-44", "w-40", "w-52", "w-36", "w-48"];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-6 2xl:px-8 pb-4">
      <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`chat ${
              index % 2 === 0 ? "chat-start" : "chat-end"
            } animate-pulse`}
          >
            <div
              className={`chat-bubble bg-slate-800 text-white ${widths[index % widths.length]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default MessagesLoadingSkeleton;
