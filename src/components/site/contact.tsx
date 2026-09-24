"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { personal, stack } from "@/lib/data";
import { Accent, Magnetic, Pill, Reveal, RevealLines, RollText } from "./motion-kit";

export function Stack() {
  return (
    <section id="stack" className="pad relative bg-cream py-32 text-ink">
      <div className="relative mb-16">
        <p className="display mb-6 text-xs text-berry">(Toolbox)</p>
        <h2 className="display relative text-[clamp(3rem,9vw,9rem)]">
          <Accent className="-top-6 right-[10%] text-[clamp(2rem,4vw,4rem)]">my kit</Accent>
          <RevealLines lines={["The stack"]} />
        </h2>
      </div>
      <div className="grid gap-x-10 border-t border-ink/20 md:grid-cols-2">
        {stack.map((g, gi) => (
          <Reveal key={g.label} delay={(gi % 2) * 0.08} className="grid gap-4 border-b border-ink/20 py-7 sm:grid-cols-[9rem_1fr]">
            <h3 className="display pt-1.5 text-sm text-berry">{g.label}</h3>
            <div className="flex flex-wrap content-start items-start gap-2">
              {g.items.map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ rotate: -4, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="rounded-full bg-ink/[0.06] px-4 py-2 text-sm font-semibold transition-colors hover:bg-brand"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#clearwork", label: "ClearWork" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
];

function IstClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="display mb-5 text-[0.65rem] opacity-55">{title}</p>
      <div className="flex flex-col items-start gap-2.5 text-[0.95rem] font-semibold">{children}</div>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <footer id="contact" className="relative bg-ink">
      {/* CTA */}
      <div className="pad pb-28 pt-36">
        <p className="display mb-10 text-[0.7rem] text-cream/50">(Contact)</p>
        <h2 className="display text-[clamp(2.6rem,8.2vw,9rem)] !leading-[0.95]">
          <RevealLines
            lines={[
              <span key="a" className="font-light [font-variation-settings:'wdth'_110] text-cream/85">
                Have an idea?
              </span>,
              <span key="b">
                Let&apos;s talk<span className="text-brand">.</span>
              </span>,
            ]}
          />
        </h2>

        <Reveal className="mt-16 flex flex-col gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <button onClick={copy} data-cursor={copied ? "Copied!" : "Copy"} className="group text-left" aria-label={`Copy email ${personal.email}`}>
            <span className="relative text-[clamp(1.3rem,3.2vw,2.8rem)] font-semibold tracking-tight">
              {personal.email}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" />
            </span>
            <span className="mt-3 block text-sm text-cream/45" aria-live="polite">
              {copied ? "Copied to clipboard ✓" : "Click to copy"}
            </span>
          </button>
          <div className="flex flex-wrap gap-3">
            <Pill href={`mailto:${personal.email}`}>Email me</Pill>
            <Pill href={personal.resume} variant="cream" target="_blank" rel="noreferrer">
              Resume
            </Pill>
          </div>
        </Reveal>
      </div>

      {/* Footer panel */}
      <motion.div
        className="relative overflow-hidden rounded-t-[2.5rem] bg-brand text-ink"
        initial={{ y: 80 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pad grid grid-cols-2 gap-x-6 gap-y-12 pb-16 pt-16 md:grid-cols-4">
          <Col title="Navigate">
            {nav.map((l) => (
              <a key={l.href} href={l.href}>
                <RollText>{l.label}</RollText>
              </a>
            ))}
          </Col>
          <Col title="Elsewhere">
            {personal.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                <RollText>{`${s.label} ↗`}</RollText>
              </a>
            ))}
          </Col>
          <Col title="Contact">
            <a href={`mailto:${personal.email}`} className="break-all">
              <RollText>Email</RollText>
            </a>
            <a href={`tel:${personal.phone.replace(/-/g, "")}`}>
              <RollText>{personal.phone}</RollText>
            </a>
            <span className="opacity-70">{personal.location}</span>
          </Col>
          <Col title="Right now">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-ink/60" />
                <span className="relative size-2 rounded-full bg-ink" />
              </span>
              Open to opportunities
            </span>
            <span className="opacity-70">
              <IstClock /> in Pune
            </span>
            <span className="marker mt-2 -rotate-3 text-2xl text-cream">say hi!</span>
          </Col>
        </div>

        {/* Wordmark — SVG so it always fits the full width exactly */}
        <div className="pad pb-6 md:pb-10">
          <motion.svg
            viewBox="0 0 1000 118"
            className="block w-full"
            role="img"
            aria-label={personal.name}
            initial={{ y: "35%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <text x="0" y="112" textLength="1000" lengthAdjust="spacingAndGlyphs" className="display fill-ink" style={{ fontSize: 158 }}>
              MAHARSHI
            </text>
          </motion.svg>
        </div>

        <div className="pad flex flex-col gap-4 border-t border-ink/20 py-6 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span className="opacity-70">Engineered in Pune, India — built to scale, like everything I ship.</span>
          <Magnetic>
            <a href="#top" aria-label="Back to top" className="flex size-12 items-center justify-center rounded-full bg-ink text-lg text-cream transition-transform hover:-translate-y-1">
              ↑
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </footer>
  );
}
