"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

/** Masked line-by-line rise. Pass lines as an array. */
export function RevealLines({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={cn("block", className)}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Fade + rise on enter. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Rotated marker-script word that "writes" in — the LxL signature accent. */
export function Accent({ children, className, rotate = -12 }: { children: ReactNode; className?: string; rotate?: number }) {
  return (
    <motion.span
      aria-hidden
      className={cn("marker pointer-events-none absolute z-10 text-brand", className)}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.5 }}
    >
      {children}
    </motion.span>
  );
}

/** Text that rolls up to a duplicate on hover. */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("group/roll relative inline-flex overflow-hidden", className)}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/roll:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover/roll:translate-y-0">
        {children}
      </span>
    </span>
  );
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Pill button in the LxL style. */
export function Pill({ href, children, variant = "brand", ...rest }: { href: string; children: string; variant?: "brand" | "cream" | "ink" } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const styles = {
    brand: "bg-brand text-ink",
    cream: "bg-cream text-ink",
    ink: "bg-ink text-cream",
  }[variant];
  return (
    <Magnetic>
      <a href={href} {...rest} className={cn("display inline-flex h-14 items-center gap-3 rounded-full px-7 text-sm transition-[filter] hover:brightness-90", styles)}>
        <RollText>{children}</RollText>
        <span aria-hidden>↗</span>
      </a>
    </Magnetic>
  );
}

/** Scroll-scrubbed word opacity for big paragraphs. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
}
