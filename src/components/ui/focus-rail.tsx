import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  heading?: string;
  subheading?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = { type: "spring", stiffness: 400, damping: 38, mass: 0.9 } as const;
const TAP_SPRING  = { type: "spring", stiffness: 450, damping: 22, mass: 1  } as const;

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  heading,
  subheading,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -8000) handleNext();
    else if (swipe > 8000) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-full w-full select-none flex-col overflow-hidden text-white outline-none",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Background ambience */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={activeItem.imageSrc} alt="" className="h-full w-full object-cover blur-2xl scale-110 saturate-125 brightness-75" />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Single centred block — pt-14 offsets the fixed navbar so justify-center lands in the true visible centre */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-12 pt-14">

        {/* Header */}
        {heading && (
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">Recognition</p>
            <h2 className="font-heading text-4xl font-semibold text-white drop-shadow-lg lg:text-5xl">{heading}</h2>
            {subheading && (
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 drop-shadow">{subheading}</p>
            )}
          </div>
        )}

        <motion.div
          className="relative flex h-[380px] w-screen max-w-7xl cursor-grab items-center justify-center active:cursor-grabbing lg:h-[460px] xl:h-[540px]"
          style={{ perspective: "1400px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist     = Math.abs(offset);
            const cardW = typeof window !== "undefined" && window.innerWidth >= 1280 ? 960
                        : window.innerWidth >= 1024 ? 820
                        : window.innerWidth >= 768  ? 680 : 520;
            const xOffset  = offset * (cardW * 0.88);
            const zOffset  = -dist * 150;
            const scale    = isCenter ? 1 : 0.82;
            const rotateY  = offset * -18;
            const opacity  = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.5);
            const blur     = isCenter ? 0 : dist * 5;
            const brightness = isCenter ? 1 : 0.45;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-video w-[380px] rounded-2xl border-t border-white/10 bg-neutral-900 shadow-2xl sm:w-[520px] md:w-[680px] lg:w-[820px] xl:w-[960px]",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={{ x: xOffset, z: zOffset, scale, rotateY, opacity, filter: `blur(${blur}px) brightness(${brightness})` }}
                transition={{ scale: TAP_SPRING, default: BASE_SPRING }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => { if (offset !== 0) setActive((p) => p + offset); }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full rounded-2xl object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {isCenter && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-2xl p-4"
                    >
                      {item.meta && (
                        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                          {item.meta}
                        </span>
                      )}
                      <h2 className="text-base font-bold text-white md:text-lg">{item.title}</h2>
                      {item.description && (
                        <p className="mt-1 text-xs text-white/65">{item.description}</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-amber-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
