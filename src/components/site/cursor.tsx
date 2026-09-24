"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Dot + trailing blob. Any element with data-cursor="Label" grows the blob and shows the label.
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor || null);
      setHover(!!t.closest("a, button"));
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 110 : hover ? 56 : 14;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-brand text-ink"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", mixBlendMode: label ? "normal" : "difference" }}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="display text-xs">
            {label}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-cream mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
