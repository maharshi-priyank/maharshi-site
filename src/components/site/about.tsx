"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { capabilities, education, marquee, personal, stats } from "@/lib/data";
import { Accent, Reveal, RevealLines, ScrubText } from "./motion-kit";

export function Bands() {
  return (
    <div className="overflow-hidden border-y border-cream/10 py-6 text-cream/40">
      <Marquee className="[--duration:45s] [--gap:3rem] p-0">
        {marquee.map((t) => (
          <span key={t} className="display flex items-center gap-12 text-sm">
            {t}
            <span className="text-brand">✺</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function TiltPhoto() {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  return (
    <div className="relative mx-auto w-[min(78%,20rem)] md:w-full md:max-w-sm [perspective:1000px]">
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ rotate: 6, y: 60, opacity: 0 }}
        whileInView={{ rotate: -3, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="overflow-hidden rounded-[2rem] border-8 border-ink bg-ink shadow-[20px_20px_0_0_var(--color-brand)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={personal.photo} alt={`Portrait of ${personal.name}`} className="aspect-[3/4] w-full object-cover" />
      </motion.div>
      <Accent className="-bottom-10 -right-4 text-5xl text-berry" rotate={-8}>
        that&apos;s me!
      </Accent>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="pad relative bg-cream pb-20 pt-28 text-ink md:pb-28 md:pt-40">
      <div className="grid gap-16 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-10 lg:gap-16">
        <div>
          <p className="display mb-8 text-xs text-berry">(About)</p>
          <ScrubText
            text="I'm a software engineer who loves the hard parts — distributed systems, event pipelines and AI features that actually ship. I bridge backend, cloud, data and product to turn messy problems into calm, fast software."
            className="text-[clamp(1.45rem,3.4vw,3rem)] font-semibold leading-[1.18] tracking-tight"
          />
          <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink/70">
            <span>🎓 {education.degree}</span>
            <span>
              {education.school} · {education.period}
            </span>
          </Reveal>
        </div>
        <TiltPhoto />
      </div>

      <div className="mt-20 grid grid-cols-2 border-t border-ink/20 md:mt-28 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-b border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 sm:py-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
            <div className="display whitespace-nowrap text-[clamp(2.4rem,4.6vw,4.4rem)] text-brand">
              <NumberTicker value={s.value} className="text-brand" />
              {s.suffix}
            </div>
            <p className="mt-2 max-w-[18ch] text-xs font-medium text-ink/70 sm:mt-3 sm:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="pad relative py-24 md:py-32">
      <div className="relative mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display relative text-[clamp(3rem,9vw,9rem)]">
          <Accent className="-top-10 left-[45%] text-[clamp(2rem,4vw,4rem)]">the craft</Accent>
          <RevealLines lines={["What I", "do best"]} />
        </h2>
        <p className="max-w-sm text-cream/70">Six things I get paged for, and the tools I reach for when I do.</p>
      </div>

      <ul className="border-t border-cream/20">
        {capabilities.map((c, i) => {
          const active = open === i;
          return (
            <li key={c.title} className="border-b border-cream/20">
              <button
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                onClick={() => setOpen(active ? null : i)}
                aria-expanded={active}
                className="group relative flex w-full flex-col overflow-hidden py-5 text-left md:py-7"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-0 origin-bottom bg-brand"
                  initial={false}
                  animate={{ scaleY: active ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                />
                <span className="relative flex items-baseline gap-4 px-2 md:gap-6 md:px-6">
                  <span className={`display text-sm transition-colors duration-500 ${active ? "text-ink" : "text-brand"}`}>0{i + 1}</span>
                  <span className={`display text-[clamp(1.7rem,4.5vw,4rem)] transition-colors duration-500 ${active ? "text-ink" : ""}`}>{c.title}</span>
                </span>
                <motion.span
                  initial={false}
                  animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="relative block overflow-hidden px-2 md:pl-[5.5rem]"
                >
                  <span className="block max-w-2xl pt-3 text-base font-medium text-ink md:text-lg">{c.desc}</span>
                </motion.span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
