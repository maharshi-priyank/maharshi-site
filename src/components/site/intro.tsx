"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { personal } from "@/lib/data";
import { Arrow, RollText } from "./motion-kit";

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > 200 && y > last.current);
      setScrolled(y > 40);
      last.current = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`pad fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-[background-color,padding,backdrop-filter] duration-500 ${
          scrolled && !open ? "bg-ink/75 py-3.5 backdrop-blur-md" : "py-5"
        }`}
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <a href="#top" className="marker text-3xl text-cream" aria-label="Home">
          MV<span className={`transition-colors ${open ? "text-ink" : "text-brand"}`}>.</span>
        </a>
        <nav className="hidden gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="display text-xs text-cream">
              <RollText>{l.label}</RollText>
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="display -mr-2 p-2 text-xs text-cream lg:hidden" aria-expanded={open} aria-controls="mobile-menu">
          {open ? "Close" : "Menu"}
        </button>
        <a href={`mailto:${personal.email}`} className="group/arrow display hidden items-center gap-1.5 text-xs text-cream lg:flex">
          <RollText>Let&apos;s talk</RollText>
          <Arrow />
        </a>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="pad fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-brand text-ink"
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
                className="display text-[clamp(2.6rem,11vw,5rem)]"
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
