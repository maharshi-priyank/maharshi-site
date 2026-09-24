"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { personal } from "@/lib/data";
import { RevealLines, RollText } from "./motion-kit";

export const INTRO_DELAY = 1.9;
const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#clearwork", label: "ClearWork" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const start = performance.now();
    let id = requestAnimationFrame(function tick(t) {
      const p = Math.min((t - start) / 1500, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 200);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-between bg-brand p-6 text-ink md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="marker -rotate-6 text-4xl md:text-6xl">Maharshi</span>
          <span className="display text-[clamp(5rem,18vw,16rem)] tabular-nums">{n}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > 200 && y > last.current);
      last.current = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="pad fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 mix-blend-difference"
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <a href="#top" className="marker text-3xl text-cream" aria-label="Home">
          MV<span className="text-brand">.</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="display text-xs text-cream">
              <RollText>{l.label}</RollText>
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="display text-xs text-cream md:hidden" aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
        <a href={`mailto:${personal.email}`} className="display hidden text-xs text-cream md:block">
          <RollText>Let&apos;s talk ↗</RollText>
        </a>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pad fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-brand text-ink"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display text-6xl"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const d = INTRO_DELAY;

  return (
    <section id="top" ref={ref} className="pad relative flex min-h-svh flex-col justify-between pb-10 pt-32">
      {/* One quiet light source, bottom-right */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60vw_50vw_at_85%_110%,rgb(255_81_33/0.16),transparent_70%)]" />

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: d + 0.2, duration: 0.8 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={personal.photo} alt="" className="size-9 rounded-full object-cover object-[50%_25%] ring-1 ring-cream/20" />
        <span className="text-sm text-cream/70">
          {personal.name} <span className="text-cream/35">— Software Engineer</span>
        </span>
      </motion.div>

      <motion.div style={{ y, opacity: fade }} className="my-16">
        <h1 className="display text-[clamp(2.6rem,8.2vw,9rem)] !leading-[0.95]">
          <RevealLines
            delay={d}
            lines={[
              <span key="a" className="font-light [font-variation-settings:'wdth'_110] text-cream/85">
                Building systems
              </span>,
              <span key="b">
                that scale<span className="text-brand">.</span>
              </span>,
            ]}
          />
        </h1>
        <motion.p
          className="marker mt-6 -rotate-3 text-[clamp(1.4rem,2.4vw,2.2rem)] text-brand"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: d + 1, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        >
          — Maharshi
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-8 border-t border-cream/15 pt-6 text-sm md:grid-cols-3 md:items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.1, duration: 1 }}
      >
        <p className="max-w-xs leading-relaxed text-cream/60">
          Distributed systems, AI-powered products and data platforms — 4+ years at GoDaddy, Swiggy &amp; PeopleStrong.
        </p>
        <p className="flex items-center gap-2 text-cream/60 md:justify-center">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative size-2 rounded-full bg-emerald-400" />
          </span>
          SDE 2 @ {personal.company} · <Clock />
        </p>
        <div className="flex gap-8 md:justify-end">
          <a href="#work" className="display text-xs">
            <RollText>Selected work ↓</RollText>
          </a>
          <a href={personal.resume} target="_blank" rel="noreferrer" className="display text-xs text-brand">
            <RollText>Resume ↗</RollText>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
