import TestimonialCarousel from "../Components/TestimonialCarousel";
import ChatPreview from "../Components/ChatPreview";

function LeftPanel() {
  return (
    <aside className="relative hidden lg:flex lg:w-1/3 xl:w-1/3 bg-layout-side overflow-hidden">
      {/* bg-glow-effect */}
      <div className="absolute inset-0">
        <div className="absolute left-16 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex h-full flex-col p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">Chattio</span>
        </div>

        {/* Chat preview */}
        <div className="flex flex-1 items-center justify-start pl-6">
          <ChatPreview />
        </div>

        {/* Testimonials (bottom) */}
        <div className="max-w-md">
          <TestimonialCarousel />
        </div>
      </div>
    </aside>
  );
}

export default LeftPanel;
