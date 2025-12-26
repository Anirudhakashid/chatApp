import { useState, useEffect } from "react";
import { testimonials } from "../data/testimonials.js";
import { motion, AnimatePresence } from "motion/react";

const INTERVAL = 5000;

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <div className="relative h-full w-full bg-layout-surface border border-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] rounded-xl p-10 flex gap-3 flex-col justify-end overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[100px] flex flex-col justify-start gap-2 "
        >
          {/* Title */}

          <h3 className="text-sm uppercase tracking-wide text-text-muted text-blue-500 font-semibold">
            {active.title}
          </h3>

          {/* Quote */}
          <blockquote className="max-w-md text-lg leading-relaxed text-text-primary">
            "{active.quote}"
          </blockquote>
        </motion.div>
      </AnimatePresence>

      {/* Animated Indicators */}
      <div className="mt-6 flex gap-2 relative z-10">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 rounded-full cursor-pointer border-0 outline-none ${
              index === activeIndex ? "bg-primary" : "bg-base-content/30"
            }`}
            animate={{
              width: index === activeIndex ? 28 : 8,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            onClick={() => setActiveIndex(index)}
            style={{ minWidth: "8px" }}
          />
        ))}
      </div>
    </div>
  );
}
