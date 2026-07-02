import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Check,
  Cloud,
  Code2,
  ExternalLink,
  Globe,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Play,
  Shield,
  Wrench,
  X,
} from "lucide-react";
import HeroSection from "@/components/ui/glassmorphism-trust-hero";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

// ─────────────────────────────────────────────────────────────
//  EDIT YOUR CONTENT HERE
//  All personal data lives in this block — scroll no further.
// ─────────────────────────────────────────────────────────────

const YOUTUBE_VIDEO_ID = "VgYV2V_EMEE";

const awardItems: FocusRailItem[] = [
  {
    id: 1,
    title: "Royal Academic Excellence Medal",
    description: "Awarded to the top-performing engineering student per university nationwide in Thailand.",
    meta: "21st December 2025",
    imageSrc: "/assets/ceremony/ceremony1.jpg",
  },
  {
    id: 2,
    title: "Award Ceremony",
    description: "Receiving the Royal Academic Excellence Medal at the annual university awards ceremony.",
    meta: "21st December 2025",
    imageSrc: "/assets/ceremony/ceremony2.jpg",
  },
  {
    id: 3,
    title: "Recognition",
    description: "Royal Academic Excellence Medal 2025 with certificate.",
    meta: "21st December 2025",
    imageSrc: "/assets/ceremony/ceremony3.jpg",
  },
];

const experiences: Experience[] = [
  {
    date: "May 2026 - Present",
    location: "Remote",
    title: "Freelance Web Developer",
    company: "Independent",
    subtitle: "Self-directed projects & client work",
    bullets: [
      "Designed and shipped a full production website end-to-end for a Singapore-based international consultancy.",
      "Designing database schemas and building full-stack features tailored to client requirements.",
    ],
    tags: ["React", "TypeScript", "E-commerce", "Freelance"],
    active: true,
    liveUrl: "https://www.rerdynamics.com",
    liveLabel: "rerdynamics.com",
  },
  {
    date: "June 2025 - March 2026",
    location: "Singapore",
    title: "Frontend Developer",
    company: "Hogarth Worldwide",
    subtitle: "Global creative production agency",
    bullets: [
      "Build and maintain locale-specific UI and content for multi-regional platforms.",
      "Adapt layouts for language expansion while preserving brand consistency.",
      "Specialise in Thai localisation including Thai word segmentation within global-scale systems.",
    ],
    tags: ["HTML", "CSS", "SVN"],
    active: false,
  },
  {
    date: "Oct 2023 - Nov 2023",
    location: "Thailand",
    title: "Software Engineer Intern",
    company: "Maori Softech",
    subtitle: "Software development consultancy",
    bullets: [
      "Supported senior engineers in software development and testing.",
      "Produced user manuals, gaining deep understanding of system flow and application architecture.",
    ],
    tags: ["PHP", "HTML", "CSS", "Documentation", "Testing"],
    active: false,
  },
];

const projects = [
  {
    title: "Thai Text Segmenter",
    date: "Nov 2025 – April 2026",
    label: "Capstone project",
    description:
      "Built a Thai Text segmentation pipeline from scratch — studied a 2020 dissertation, then adapted and extended the approach into a production full-stack app with CRF-based syllable and MTU segmentation and k-best word segmentation. Developed simultaneously while working full-time at Hogarth Worldwide as my final-year capstone project.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Python", "SQLite", "CRF"],
    github: "https://github.com/noonena/Thai-Text-Segmenter-System",
    live: null,
    demo: "https://www.youtube.com/watch?v=qYPyIiI_O9k",
  },
  {
    title: "FdF",
    date: "2023",
    label: "42 Bangkok",
    description:
      "3D wireframe landscape renderer built in C using the MiniLibX graphics library at 42 Bangkok. Reads a map of elevation points and renders them as a 3D isometric scene — implementing spatial point placement, line drawing between vertices, and scene projection from customisable viewpoints.",
    tags: ["C", "MiniLibX", "Graphics Programming", "Isometric Projection", "42BKK"],
    github: "https://github.com/noonena/FdF",
    live: null,
    demo: null,
    image: "https://raw.githubusercontent.com/noonena/FdF/main/img/fdf_gif.gif",
  },
];

const skillGroups = [
  { title: "Languages", icon: Code2, tags: ["Python", "C", "C++", "C#", "HTML", "CSS", "SQL"] },
  { title: "Frontend", icon: Code2, tags: ["React", "Vue.js", "Vite", "Tailwind CSS"] },
  { title: "Backend & Databases", icon: Wrench, tags: ["FastAPI", "Uvicorn", "SQLite", "Oracle SQL", "SQL*Plus"] },
  { title: "Cloud & Infrastructure", icon: Cloud, tags: ["AWS (studying)", "Linux / Debian", "Cisco Packet Tracer"] },
  { title: "Cybersecurity", icon: Shield, tags: ["Network Security", "Linux Hardening", "Wireshark", "API Security"] },
  { title: "Developer Tools", icon: Wrench, tags: ["Git", "GitHub", "SVN", "VSCode", "Jupyter", "Google Colab", "ClickUp"] },
];


function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

type Experience = {
  date: string;
  location: string;
  title: string;
  company: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  active: boolean;
  liveUrl?: string;
  liveLabel?: string;
};

type Project = typeof projects[number];

function ProjectCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const videoId = project.demo?.match(/v=([^&]+)/)?.[1] ?? null;

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white lg:grid lg:grid-cols-[1fr_1.4fr]">
      {/* media panel */}
      <div className="relative h-56 overflow-hidden lg:h-full">
        {videoId ? (
          playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play demo video"
              className="group/thumb absolute inset-0 w-full"
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={`${project.title} demo thumbnail`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover/thumb:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover/thumb:scale-110">
                  <Play className="h-5 w-5 translate-x-0.5 fill-zinc-900 text-zinc-900" />
                </div>
              </div>
            </button>
          )
        ) : project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900">
            <div className="dot-grid absolute inset-0 opacity-10" />
            <Code2 className="relative z-10 h-10 w-10 text-zinc-500" />
          </div>
        )}
      </div>

      {/* content panel */}
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">{project.label} · {project.date}</p>
        <h3 className="font-heading text-2xl font-semibold text-zinc-900 lg:text-3xl">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-zinc-600">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const lockRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  // Keep ref in sync so the wheel handler always sees the latest index
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  const navigate = (dir: 1 | -1) => {
    const next = activeIdx + dir;
    if (next < 0 || next >= experiences.length) return;
    setDirection(dir);
    setAnimating(false);
    requestAnimationFrame(() => {
      setActiveIdx(next);
      setAnimating(true);
    });
  };

  // Wheel handler attached to card only — so scrolling outside the card does normal page scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = activeIdxRef.current;
      const canNavigate = dir === 1 ? cur < experiences.length - 1 : cur > 0;
      if (!canNavigate) return; // let natural page scroll take over at boundary
      e.preventDefault();
      e.stopPropagation();
      if (lockRef.current) return;
      lockRef.current = true;
      const next = cur + dir;
      setDirection(dir);
      setAnimating(false);
      requestAnimationFrame(() => {
        setActiveIdx(next);
        activeIdxRef.current = next;
        setAnimating(true);
      });
      setTimeout(() => { lockRef.current = false; }, 700);
    };

    // Horizontal swipe: touch-action:pan-y on the element lets iOS handle vertical page
    // scroll natively, so JavaScript only sees horizontal swipes — no gesture conflicts.
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 40) return;
      const dir = diff > 0 ? 1 : -1;
      const cur = activeIdxRef.current;
      const canNavigate = dir === 1 ? cur < experiences.length - 1 : cur > 0;
      if (!canNavigate) return;
      if (lockRef.current) return;
      lockRef.current = true;
      const next = cur + dir;
      setDirection(dir);
      setAnimating(false);
      requestAnimationFrame(() => {
        setActiveIdx(next);
        activeIdxRef.current = next;
        setAnimating(true);
      });
      setTimeout(() => { lockRef.current = false; }, 700);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exp = experiences[activeIdx];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-100 py-24 scroll-mt-14 px-6 lg:px-12"
    >
      {/* header */}
      <div className="mb-10 w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">Experience</p>
        <h2 className="font-heading text-4xl font-semibold text-zinc-900 lg:text-5xl">Work history</h2>
      </div>

      {/* card — stable wrapper captures wheel; inner div handles animation */}
      <div ref={cardRef} className="w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl" style={{ touchAction: 'pan-y' }}>
      <div
        key={activeIdx}
        className="w-full rounded-3xl border border-zinc-200 bg-white p-8 xl:p-10 shadow-sm"
        style={{
          animation: animating
            ? `slideIn${direction > 0 ? "Down" : "Up"} 0.4s ease both`
            : undefined,
        }}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${exp.active ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"}`}>
            {exp.date}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">{exp.location}</span>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-zinc-900 xl:text-3xl">{exp.title}</h3>
        <p className={`mt-0.5 text-sm font-medium xl:text-base ${exp.active ? "text-zinc-700" : "text-zinc-500"}`}>{exp.company}</p>
        <p className="mb-5 mt-0.5 text-sm text-zinc-400 xl:text-base">{exp.subtitle}</p>
        <ul className="space-y-3">
          {exp.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-zinc-600 xl:text-base">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        {exp.liveUrl && (
          <div className="mt-5 border-t border-zinc-100 pt-4">
            <a
              href={exp.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 transition hover:border-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"
            >
              <Globe className="h-3.5 w-3.5" />
              View client site — {exp.liveLabel ?? exp.liveUrl}
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </div>
        )}
      </div>
      </div>{/* end stable cardRef wrapper */}

      {/* navigation */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          disabled={activeIdx === 0}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); setAnimating(true); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 bg-zinc-900" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"}`}
              aria-label={`Go to experience ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={activeIdx === experiences.length - 1}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xqevabyy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-10 text-center">
        <p className="font-heading text-lg font-semibold text-zinc-900">Message sent!</p>
        <p className="mt-1 text-sm text-zinc-500">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-zinc-600">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-zinc-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-zinc-600">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role or project..."
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition"
        />
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong — please email me directly at euniceleow46@gmail.com.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useReveal();

  // Lock body scroll when mobile menu is open so page doesn't scroll behind it
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sectionIds = ["about", "experience", "projects", "skills",  "awards", "contact"];
    const onScroll = () => {
      const current = window.scrollY;
      setShowBackToTop(current > 400);

      const offset = window.innerHeight * 0.35;
      let found = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) found = id;
      }
      setActiveSection(found);
      if (!found && window.location.hash) {
        history.replaceState(null, "", location.pathname);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation = useMemo(
    () =>
      [
        ["About", "about"],
        ["Experience", "experience"],
        ["Projects", "projects"],
        ["Skills", "skills"],
        ["Awards", "awards"],
        ["Contact", "contact"],
      ] as const,
    []
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const navH = document.querySelector("header")?.offsetHeight ?? 56;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="bg-zinc-950 text-zinc-900">


      {/* navbar */}
      <header className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-colors duration-200 ${mobileMenuOpen ? "bg-zinc-950" : "bg-zinc-950 md:bg-zinc-950/70"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-12">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="select-none font-heading text-sm font-semibold tracking-tight text-white"
          >
            EL
          </button>
          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`nav-link text-sm transition-colors hover:text-white ${activeSection === id ? "text-white font-medium" : "text-white/50"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="https://github.com/noonena" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-white/50 transition-colors hover:text-white">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/eunice-leow/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-white/50 transition-colors hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Hire me
            </button>
          </div>
          <button type="button" className="p-1 text-white md:hidden" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(o => !o)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* mobile menu — inside header so top-full always kisses the navbar bottom, no gap */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-full flex h-dvh flex-col bg-zinc-950 px-8 py-8">
            <nav className="flex flex-col">
              {navigation.map(([label, id], i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { scrollToSection(id); closeMobileMenu(); }}
                  className="group flex items-baseline gap-5 border-b border-white/5 py-5 text-left"
                >
                  <span className="w-6 font-mono text-xs text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-heading text-xl font-semibold text-white transition-colors group-hover:text-white/50">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-between pb-8">
              <div className="flex gap-5">
                <a href="https://github.com/noonena" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="text-white/30 transition-colors hover:text-white">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/eunice-leow/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="text-white/30 transition-colors hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                Hire me
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <div id="hero"><HeroSection /></div>

      {/* ── ABOUT ── */}
      <section id="about" className="flex min-h-screen items-center bg-white py-24 pt-32 scroll-mt-14 lg:py-32 lg:pt-32">
        <div className="mx-auto grid max-w-7xl 2xl:max-w-screen-2xl gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <div className="reveal-left space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">About Me</p>
              <h2 className="font-heading text-4xl font-semibold leading-tight text-zinc-900 lg:text-5xl">
                Top of my cohort.
                <br />
                Shipped in production.
                <br />
                <span className="text-zinc-400">Now going cloud.</span>
              </h2>
            </div>

            <p className="leading-relaxed text-zinc-600">
              Computer Engineering graduate from Bangkok —{" "}
              <strong className="text-zinc-900">top-ranked engineering student in Thailand</strong>, Royal Academic Excellence Medal 2025, GPA 3.95.
            </p>

            <p className="leading-relaxed text-zinc-600">
              In my third year I attended <strong className="text-zinc-900">42 Bangkok</strong> — the Bangkok campus of the global 42 Network — after university hours, building low-level C projects and collaborating with developers outside the classroom.
            </p>

            <p className="leading-relaxed text-zinc-600">
              In my final year I took on a contract role as Frontend Developer at{" "}
              <strong className="text-zinc-900">Hogarth Worldwide</strong> in Singapore — a global creative production agency — while simultaneously building my capstone project, the Thai Text Segmenter, from scratch.
              My university classified it as an internship. Hogarth hired me on a real contract.
            </p>

            <p className="leading-relaxed text-zinc-600">
              After graduating I went freelance — solo-shipped a client website.
              I&apos;m now building toward{" "}
              <strong className="text-zinc-900">Cloud & DevOps</strong> with intent — learning API security and cloud architecture before I build.
              Google Cybersecurity Professional certified; currently studying AWS Solutions Architect.
            </p>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                <GraduationCap className="h-4 w-4 text-zinc-600" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-zinc-900">Mahanakorn University of Technology</p>
                <p className="text-sm text-zinc-500">B.Eng. Computer Engineering · Bangkok, Thailand</p>
                <p className="mt-1 text-xs font-medium text-zinc-500">June 2022 – May 2026 · GPA 3.95 / 4.00</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-900">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-zinc-900">42 Bangkok (42BKK)</p>
                <p className="text-sm text-zinc-500">Peer-to-peer coding school · 42 Network</p>
                <p className="mt-1 text-xs font-medium text-zinc-500">2023 · After-hours self-directed study</p>
              </div>
            </div>
          </div>

          <div className="reveal-right space-y-4">
            {/* medal */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-zinc-900">Royal Academic Excellence Medal 2025</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    Awarded to one top-performing engineering student per university nationwide in Thailand.
                  </p>
                  <p className="mt-2 text-xs font-medium text-zinc-500">December 2025</p>
                </div>
              </div>
            </div>

            {/* certs */}
            {[
              {
                title: "Google Cybersecurity Professional",
                meta: "Coursera · June 2025",
                status: "Verified",
                statusColor: "bg-zinc-900 text-white",
                tags: ["Network Security", "Linux", "Python"],
                credential: "https://www.coursera.org/account/accomplishments/specialization/AXJ1M851PDT0",
              },
              {
                title: "AWS Solutions Architect",
                meta: "Amazon Web Services · Associate",
                status: "In Progress",
                statusColor: "bg-zinc-100 text-zinc-600",
                tags: ["Preparation 15%"],
                credential: null,
              },
              {
                title: "API Security",
                meta: "APIsec University",
                status: "In Progress",
                statusColor: "bg-zinc-100 text-zinc-600",
                tags: ["OWASP API Top 10", "API Penetration Testing"],
                credential: null,
              },
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-heading text-sm font-semibold text-zinc-900">{item.title}</p>
                      <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500">{item.meta}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {item.credential && (
                        <a
                          href={item.credential}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
                        >
                          <ArrowRight className="h-3 w-3" />
                          View credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* youtube */}
            <a
              href="https://www.youtube.com/@HonestlyLost"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-red-500">
                <Play className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-zinc-900">YouTube Creator</p>
                <p className="text-sm text-zinc-500">Filming & video editing · @HonestlyLost</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <ExperienceSection experiences={experiences} />

      {/* ── PROJECTS ── */}
      <section id="projects" className="flex min-h-screen flex-col justify-center bg-white py-24 scroll-mt-14 lg:py-32">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Projects</p>
            <h2 className="font-heading text-4xl font-semibold text-zinc-900 lg:text-5xl">Interesting Projects</h2>
          </div>

          <div className="space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="flex min-h-screen flex-col justify-center bg-zinc-100 py-24 scroll-mt-14 lg:py-32">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Skills</p>
            <h2 className="font-heading text-4xl font-semibold text-zinc-900 lg:text-5xl">Technical toolkit</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <div
                key={group.title}
                className="card-hover rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                    <group.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="font-heading text-sm font-semibold text-zinc-900">{group.title}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARD CEREMONY ── */}
      <section id="awards" className="h-screen scroll-mt-14">
        <FocusRail
          items={awardItems}
          autoPlay
          interval={2500}
          heading="Award Ceremony"
          subheading="Royal Academic Excellence Medal — presented to the top-performing engineering student per university nationwide in Thailand."
        />
      </section>

      {/* ── CREATIVE ── */}
      <section id="creative" className="flex min-h-screen items-center bg-zinc-50 py-24 scroll-mt-14 lg:py-32">
        <div className="mx-auto grid w-full max-w-7xl 2xl:max-w-screen-2xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <div className="reveal-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Creative</p>
            <h2 className="mb-5 font-heading text-4xl font-semibold leading-tight text-zinc-900 lg:text-5xl">Beyond the terminal.</h2>
            <p className="mb-4 text-lg leading-relaxed text-zinc-600">
              When I&apos;m not coding, I&apos;m travelling and filming. I run a travel YouTube channel — capturing places, moments and the stories in between.
            </p>
            <a
              href="https://www.youtube.com/@HonestlyLost"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch on YouTube
            </a>
          </div>

          <div className="reveal-right">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-zinc-900">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Latest YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="flex min-h-screen flex-col justify-center bg-white py-24 scroll-mt-14 lg:py-32">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-screen-2xl px-6 lg:px-12">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Contact</p>
            <h2 className="mb-10 font-heading text-4xl font-semibold leading-tight text-zinc-900 lg:text-5xl">Let&apos;s work together.</h2>

            <div className="mb-10 flex justify-center gap-4">
              {[
                { href: "https://www.linkedin.com/in/eunice-leow/", label: "LinkedIn", value: "linkedin.com/in/eunice-leow", icon: Linkedin },
                { href: "https://github.com/noonena", label: "GitHub", value: "github.com/noonena", icon: Github },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-44 rounded-2xl border border-zinc-200 p-6 transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-200">
                    <item.icon className="h-4 w-4 text-zinc-600" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">{item.label}</p>
                  <p className="mt-0.5 break-all text-xs text-zinc-500">{item.value}</p>
                </a>
              ))}
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-100 bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 sm:flex-row lg:px-12">
          <p className="text-sm text-zinc-400">© 2026 Eunice Leow. All rights reserved.</p>
          <p className="text-sm text-zinc-400">Designed & built with care.</p>
        </div>
      </footer>

      {/* back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`btt-hidden fixed bottom-7 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/25 text-white shadow-lg hover:bg-zinc-900/50 ${showBackToTop ? "btt-show" : ""}`}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}
