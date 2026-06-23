import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-black">

      {/* z-0 — background */}
      <img
        src="/assets/bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* z-5 — PORTFOLIO text, pinned from top per breakpoint */}
      <div
        className="absolute inset-x-0 z-[5] top-[16%]  md:top-[20%] lg:top-[12%] flex justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="font-heading font-black leading-none tracking-tighter text-white text-[clamp(3rem,21vw,18rem)] md:text-[clamp(2rem,14vw,11rem)]"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          PORTFOLIO
        </p>
      </div>

      {/* z-10 — photo, anchored to bottom
          Replace me.jpg with a transparent me.png and the white bg disappears;
          the drop-shadow will then trace your silhouette. */}
      <img
        src="/assets/me.jpg"
        alt="Eunice Leow"
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 w-auto object-contain object-bottom
                   h-[80vh] sm:h-[88vh] md:h-[100vh] lg:h-[108vh] xl:h-[112vh]"
        style={{
          filter: [
            "drop-shadow(0 0 12px rgba(255,255,255,0.95))",
            "drop-shadow(0 0 30px rgba(255,255,255,0.6))",
            "drop-shadow(0 0 60px rgba(255,255,255,0.25))",
          ].join(" "),
        }}
      />

      {/* z-30 — name + subtitle at the bottom */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center text-center sm:bottom-12 lg:bottom-14">
        <p
          className="font-heading font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          Eunice Leow
        </p>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 sm:text-[11px]">
          Computer Engineer
        </p>
      </div>

      {/* z-30 — scroll arrow: uses offsetTop (not href anchor) to match wheel-scroll behaviour */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        }}
        className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 text-white/30 transition-colors hover:text-white"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
