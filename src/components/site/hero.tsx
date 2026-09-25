"use client";
import { Fragment, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { personal } from "@/lib/data";
import { HeroNetwork } from "./hero-network";
import { INTRO_DELAY } from "./intro";
import { Arrow, RevealLines, RollText } from "./motion-kit";

// Variable-font axes each line morphs between (resting → under the cursor).
const AXES = {
  light: { from: [250, 112], to: [720, 112] },
  heavy: { from: [800, 125], to: [260, 102] },
} as const;
type Mode = keyof typeof AXES;
const fvs = (wght: number, wdth: number) => `"wght" ${Math.round(wght)}, "wdth" ${wdth.toFixed(1)}`;

function Letters({ text, mode }: { text: string; mode: Mode }) {
  const [w, d] = AXES[mode].from;
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <span className="whitespace-nowrap">
            {[...word].map((c, i) => (
              <span key={i} data-prox={mode} className="transition-[font-variation-settings] duration-300 ease-out" style={{ fontVariationSettings: fvs(w, d) }}>
                {c}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  );
}

/** Letters thicken/thin near the pointer; an idle wave sweeps through when the pointer rests or on touch. */
function useProximityType(h1: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = h1.current!;
    const letters = [...root.querySelectorAll<HTMLElement>("[data-prox]")];
    const fine = matchMedia("(pointer: fine)").matches;
    let px = -1e4, py = -1e4, lastMove = -1e5, raf = 0, visible = true, started = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX; py = e.clientY; lastMove = performance.now();
    };
    const tick = (now: number) => {
      const box = root.getBoundingClientRect();
      const rad = Math.max(150, innerWidth * 0.15);
      const idle = !fine || now - lastMove > 2600;
      const period = 5600;
      const wx = box.left - rad + ((now % period) / period) * (box.width + rad * 2);
      const rects = letters.map((el) => el.getBoundingClientRect()); // read all, then write
      letters.forEach((el, i) => {
        const r = rects[i], cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dist = idle ? Math.abs(cx - wx) * 1.15 : Math.hypot(cx - px, cy - py);
        const t = Math.max(0, 1 - dist / rad), k = t * t * (3 - 2 * t);
        const { from, to } = AXES[el.dataset.prox as Mode];
        const v = fvs(from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k);
        if (el.style.fontVariationSettings !== v) el.style.fontVariationSettings = v;
      });
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && started) raf = requestAnimationFrame(tick);
    });
    // Wait for the intro reveal to finish before letters start moving.
    const start = setTimeout(() => { started = true; raf = requestAnimationFrame(tick); }, (INTRO_DELAY + 1.4) * 1000);
    io.observe(root);
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearTimeout(start); cancelAnimationFrame(raf); io.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, [h1]);
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t} IST</span>;
}

const ROLES = ["Software Engineer", "Backend Developer", "Distributed Systems", "AI Integrations", "Full-stack Builder"];

/** Terminal prompt that types and deletes each role in turn. */
function TypedRole({ delay }: { delay: number }) {
  const [text, setText] = useState(ROLES[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0, i = ROLES[0].length, deleting = true, id = 0;
    const step = () => {
      if (deleting) {
        if (--i === 0) { deleting = false; role = (role + 1) % ROLES.length; }
      } else if (++i === ROLES[role].length) deleting = true;
      setText(ROLES[role].slice(0, i));
      const hold = deleting && i === ROLES[role].length; // fully typed: pause before erasing
      id = window.setTimeout(step, hold ? 2200 : deleting ? 38 : 70 + Math.random() * 50);
    };
    id = window.setTimeout(step, delay * 1000 + 2600);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <p className="font-mono text-[clamp(1rem,1.7vw,1.5rem)] text-cream/85" aria-label="Software Engineer">
      <span className="mr-3 text-brand">&gt;</span>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-[blink_1.05s_steps(1)_infinite] bg-brand" />
    </p>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const hub = useRef<HTMLSpanElement>(null);
  useProximityType(h1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const netScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]); // the system literally scales as you leave
  const netFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const d = INTRO_DELAY;

  return (
    <section id="top" ref={ref} className="pad relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-28 select-none md:pb-10">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ scale: netScale, opacity: netFade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 0.3, duration: 2 }}
      >
        <HeroNetwork hubRef={hub} />
      </motion.div>
      {/* keep the type legible and melt into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_30%_55%,rgb(39_32_29/0.75),transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-ink" />

      <motion.div
        className="flex items-center justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: d + 0.2, duration: 0.8 }}
      >
        <span className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={personal.photo} alt="" className="size-9 rounded-full object-cover object-[50%_25%] ring-1 ring-cream/20" />
          <span className="text-sm text-cream/70">
            {personal.name}
          </span>
        </span>
        <span className="hidden items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-cream/50 sm:flex">
          {personal.location} · <Clock />
        </span>
      </motion.div>

      <motion.div style={{ y, opacity: fade }} className="my-14">
        <motion.p
          className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-cream/50 md:mb-8 md:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.1, duration: 0.8 }}
        >
          <span className="text-brand">{"//"}</span> software engineer @ {personal.company.toLowerCase()}
        </motion.p>
        <h1 ref={h1} aria-label="Building systems that scale." className="display text-[clamp(2.5rem,7.8vw,8.6rem)] !leading-[0.98]">
          <RevealLines
            delay={d}
            lines={[
              <span key="a" aria-hidden className="text-cream/85">
                <Letters text="Building systems" mode="light" />
              </span>,
              <span key="b" aria-hidden>
                <Letters text="That scale" mode="heavy" />
                <span ref={hub} className="inline-block origin-center text-brand">
                  .
                </span>
              </span>,
            ]}
          />
        </h1>
        <motion.div className="mt-8 md:mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.9, duration: 0.8 }}>
          <TypedRole delay={d} />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-6 border-t border-cream/15 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.1, duration: 1 }}
      >
        <p className="max-w-xs leading-relaxed text-cream/60">
          Distributed systems, AI-powered products and data platforms — 4+ years at GoDaddy, Swiggy &amp; PeopleStrong.
        </p>
        <p className="font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.1em] text-cream/45">
          {["Go", "Java", "TypeScript", "Kafka", "AWS", "Next.js"].map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="mx-2 text-brand/70">·</span>}
              {t}
            </span>
          ))}
        </p>
        <div className="flex gap-8 sm:col-span-2 lg:col-span-1 lg:justify-end">
          <a href="#work" className="group/arrow display flex items-center gap-1.5 text-xs">
            <RollText>Selected work</RollText>
            <Arrow dir="down" />
          </a>
          <a href={personal.resume} target="_blank" rel="noreferrer" className="group/arrow display flex items-center gap-1.5 text-xs text-brand">
            <RollText>Resume</RollText>
            <Arrow />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
