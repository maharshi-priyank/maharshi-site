"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "motion/react";
import { experience, projects, venture } from "@/lib/data";
import { Accent, Pill, Reveal, RevealLines } from "./motion-kit";

const cardThemes = [
  "bg-ink text-cream",
  "bg-brand text-ink",
  "bg-berry text-cream",
  "bg-cream text-ink",
];

function ExpCard({ job, i, total, progress }: { job: (typeof experience)[number]; i: number; total: number; progress: MotionValue<number> }) {
  // Each card shrinks slightly as later cards stack over it.
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04]);
  return (
    <div className="mb-5 md:sticky md:mb-0 md:flex md:h-[88svh] md:items-start md:[top:var(--stack-top)]" style={{ "--stack-top": `calc(6rem + ${i * 1.75}rem)` } as React.CSSProperties}>
      <motion.article
        style={{ scale }}
        className={`${cardThemes[i % cardThemes.length]} w-full origin-top rounded-[1.5rem] p-6 max-md:!transform-none md:rounded-[2rem] md:p-12 md:shadow-[0_-10px_60px_rgb(0_0_0/0.25)]`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={job.logo} alt="" className="size-12 shrink-0 rounded-2xl bg-white object-contain p-2 md:size-14" />
            <div>
              <h3 className="display text-[clamp(1.4rem,3vw,2.6rem)]">{job.company}</h3>
              <p className="text-sm font-semibold opacity-75">{job.role}</p>
            </div>
          </div>
          <div className="display flex gap-3 text-[0.65rem] opacity-75 sm:block sm:text-right sm:text-xs">
            <p>{job.period}</p>
            <p className="sm:mt-1">{job.location}</p>
          </div>
        </div>
        {job.headline && <p className="marker mt-6 -rotate-2 text-[clamp(1.35rem,3vw,2.6rem)] md:mt-8">{job.headline}</p>}
        <ul className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4">
          {job.points.map((p) => (
            <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed opacity-90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {job.tech.map((t) => (
            <span key={t} className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="experience" className="pad relative bg-sky pb-16 pt-24 text-ink md:pb-24 md:pt-32">
      <div className="relative mb-12">
        <p className="display mb-6 text-xs text-berry">(Experience)</p>
        <h2 className="display relative text-[clamp(3rem,9vw,9rem)]">
          <Accent className="-top-8 right-[8%] text-[clamp(2rem,4vw,4rem)]">4+ years</Accent>
          <RevealLines lines={["Where I've", "built things"]} />
        </h2>
      </div>
      <div ref={ref}>
        {experience.map((job, i) => (
          <ExpCard key={job.period} job={job} i={i} total={experience.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

export function Work() {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  // Tilt with horizontal pointer velocity.
  const rotate = useSpring(useTransform(useVelocity(x), [-2000, 2000], [-12, 12], { clamp: true }), { stiffness: 200, damping: 20 });

  return (
    <section
      id="work"
      className="pad relative py-24 md:py-32"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="relative mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display relative text-[clamp(3rem,9vw,9rem)]">
          <Accent className="-top-8 left-[38%] text-[clamp(2rem,4vw,4rem)]">freelance</Accent>
          <RevealLines lines={["Selected", "work"]} />
        </h2>
        <p className="max-w-sm text-cream/70">Brand sites and products I&apos;ve designed and shipped end-to-end for clients. Each one opens the live site.</p>
      </div>

      <ul className="border-t border-cream/20 pointer-coarse:md:grid pointer-coarse:md:grid-cols-2 pointer-coarse:md:gap-x-8" onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.title} className="border-b border-cream/20">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              onPointerEnter={() => setActive(i)}
              className="group grid gap-4 py-8 pointer-fine:md:grid-cols-[1fr_auto] pointer-fine:md:items-center pointer-fine:md:py-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.title} website`} className="aspect-[16/10] w-full rounded-2xl object-cover object-top pointer-fine:md:hidden" />
              <div className="flex min-w-0 items-baseline gap-4 transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] md:gap-5 pointer-fine:md:group-hover:translate-x-6">
                <span className="display text-sm text-brand">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="display text-[clamp(2rem,6.5vw,6.5rem)] transition-colors duration-300 pointer-coarse:md:text-[clamp(1.6rem,3.6vw,2.6rem)] pointer-fine:md:group-hover:text-brand">{p.title}</h3>
                  <p className="mt-3 max-w-xl text-sm text-cream/60 pointer-fine:md:hidden">{p.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pointer-fine:md:flex-col pointer-fine:md:items-end">
                <span className="display text-xs text-cream/60">
                  {p.kind} · {p.year}
                </span>
                <span className="flex flex-wrap gap-2 pointer-fine:md:justify-end">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-cream/25 px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (desktop) */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-30 hidden pointer-fine:md:block" style={{ x, y, rotate, translateX: "-50%", translateY: "-50%" }}>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="frame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="h-[17rem] w-[26rem] overflow-hidden rounded-3xl p-3 shadow-2xl"
              style={{ background: projects[active].color }}
            >
              <div className="relative size-full overflow-hidden rounded-2xl">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active}
                    src={projects[active].image}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-top"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-30%" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

const wins = [
  { big: "₹1 Cr", small: "revenue uplift in 5 days from Pre-Search Page Ads at Swiggy Instamart" },
  { big: "1500+", small: "APIs secured with server-level payload checksum validation" },
  { big: "−50%", small: "unauthorized access attempts after OTP rate limiting" },
  { big: "−50/mo", small: "fewer incidents with a logging, metrics & alerting mechanism" },
  { big: "2%", small: "of total product revenue from the Naukri integration" },
  { big: "85%", small: "extraction accuracy — 3rd place, Gen AI Hackathon" },
];

export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  return (
    <section ref={ref} className="relative h-[320svh] bg-brand text-ink">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="pad relative mb-10">
          <h2 className="display relative text-[clamp(2.6rem,7vw,7rem)]">
            <Accent className="-top-8 left-[30%] text-[clamp(1.8rem,3.5vw,3.5rem)] text-cream">receipts</Accent>
            Impact, in numbers
          </h2>
        </div>
        <motion.div style={{ x }} className="pad flex w-max gap-6">
          {wins.map((w, i) => (
            <div
              key={w.big}
              className={`flex h-[min(52svh,26rem)] w-[min(78vw,26rem)] shrink-0 flex-col justify-between rounded-[1.75rem] p-6 sm:p-8 ${i % 2 ? "bg-ink text-cream" : "bg-cream text-ink"}`}
              style={{ rotate: `${i % 2 ? 2 : -2}deg` }}
            >
              <span className="display text-xs opacity-60">0{i + 1} / 0{wins.length}</span>
              <div>
                <p className="display whitespace-nowrap text-[clamp(2.3rem,4.6vw,4.4rem)] text-brand">{w.big}</p>
                <p className="mt-3 text-base font-semibold leading-snug sm:mt-4 sm:text-lg">{w.small}</p>
              </div>
            </div>
          ))}
          <Reveal className="flex w-[min(80vw,26rem)] items-center">
            <p className="marker -rotate-6 text-5xl">…and counting.</p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

const floaters = [
  { title: "Invoice paid", sub: "₹45,000 · via UPI", dot: "bg-emerald-400", pos: "left-3 top-[18%] xl:-left-10", speed: -60 },
  { title: "Proposal opened", sub: "Priya viewed · just now", dot: "bg-sky", pos: "right-3 top-[8%] xl:-right-12", speed: -120 },
  { title: "Contract signed", sub: "OTP verified · IT Act 2000", dot: "bg-brand", pos: "right-3 bottom-[10%] xl:-right-8", speed: -30 },
];

function Floater({ f, progress }: { f: (typeof floaters)[number]; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, f.speed]);
  return (
    <motion.div style={{ y }} className={`absolute z-10 hidden rounded-2xl border border-cream/10 bg-ink/90 px-4 py-3 shadow-2xl backdrop-blur md:block ${f.pos}`}>
      <p className="flex items-center gap-2 text-sm font-bold">
        <span className={`size-2 rounded-full ${f.dot}`} />
        {f.title}
      </p>
      <p className="mt-0.5 text-xs text-cream/55">{f.sub}</p>
    </motion.div>
  );
}

/** Founder spotlight — scroll-driven product reveal, deliberately unlike the client-work list. */
export function Venture() {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const { scrollYProgress: pass } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const rotateX = useTransform(enter, [0, 1], [28, 0]);
  const scale = useTransform(enter, [0, 1], [0.84, 1]);
  const glow = useTransform(enter, [0, 1], [0, 1]);

  return (
    <section id="clearwork" className="pad relative overflow-hidden pb-16 pt-24 md:pb-20 md:pt-36">
      <div className="grid gap-10 xl:grid-cols-[1.3fr_1fr] xl:items-end xl:gap-12">
        <div>
          <p className="mb-10 flex items-center gap-3">
            <span className="display text-[0.7rem] text-cream/50">(Now building)</span>
            <span className="display rounded-full border border-brand/40 px-3 py-1 text-[0.6rem] text-brand">Founder · SaaS</span>
          </p>
          <h2 className="display text-[clamp(2.6rem,8.2vw,9rem)] !leading-[0.95]">
            <RevealLines
              lines={[
                <span key="a" className="font-light [font-variation-settings:'wdth'_110] text-cream/85">
                  Founder of
                </span>,
                <span key="b">
                  {venture.name}
                  <span className="text-brand">.</span>
                </span>,
              ]}
            />
          </h2>
        </div>
        <Reveal className="md:grid md:grid-cols-2 md:items-end md:gap-10 xl:block xl:pb-4">
          <p className="marker -rotate-2 text-2xl text-brand">{venture.tagline}</p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">{venture.pitch}</p>
          <div className="mt-8 flex items-start gap-6 sm:gap-8 md:col-start-2 md:row-start-1 md:row-span-2 md:mt-0 xl:mt-8">
            {venture.facts.map((f) => (
              <div key={f.label}>
                <p className="display text-3xl">{f.value}</p>
                <p className="mt-1 text-xs text-cream/50">{f.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Product reveal */}
      <div ref={frame} className="relative mx-auto mt-16 max-w-6xl [perspective:1600px] md:mt-24">
        <motion.div aria-hidden style={{ opacity: glow }} className="absolute -inset-x-10 -bottom-16 top-1/3 -z-10 rounded-full bg-brand/25 blur-[100px]" />
        <motion.a
          href={venture.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open app"
          style={{ rotateX, scale }}
          className="block origin-bottom overflow-hidden rounded-2xl border border-cream/15 bg-[#1b1614] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)] md:rounded-3xl"
        >
          <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="mx-auto flex items-center gap-2 rounded-full bg-cream/[0.06] px-4 py-1 text-xs text-cream/60">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {venture.domain}
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={venture.image} alt="ClearWork dashboard — revenue, pipeline, overdue invoices and lead pipeline" className="block w-full" />
        </motion.a>
        {floaters.map((f) => (
          <Floater key={f.title} f={f} progress={pass} />
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl md:mt-20 gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
        {venture.features.map((f, i) => (
          <div key={f.title} className="bg-ink">
            <Reveal delay={i * 0.06} className="h-full p-7">
              <p className="display text-xs text-brand">0{i + 1}</p>
              <h3 className="mt-6 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{f.desc}</p>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Pill href={venture.href} target="_blank" rel="noreferrer">
          Visit getclearwork.in
        </Pill>
      </div>
    </section>
  );
}
