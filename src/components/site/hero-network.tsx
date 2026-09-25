"use client";
import { useEffect, useRef, type RefObject } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; born: number };
type Packet = { a: number; b: number; t: number; speed: number; toHub: boolean };
export type NetStats = { nodes: number; edges: number; fps: number };

const CREAM = "252,242,189";
const BRAND = "255,81,33";
const LINK = 150; // max node↔node edge length (px)
const HUB_LINK = 280; // max node↔hub edge length (px)
const MAX_NODES = 140;

/**
 * Faint distributed-system graph: drifting nodes, proximity edges, orange request packets.
 * The element in `hubRef` (the headline's full stop) acts as a hub — nearby nodes link to it and
 * it pulses when a packet arrives. Clicking adds a node. Reports live stats via `onStats`.
 */
export function HeroNetwork({ hubRef, onStats }: { hubRef: RefObject<HTMLElement | null>; onStats?: (s: NetStats) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const statsCb = useRef(onStats);
  useEffect(() => {
    statsCb.current = onStats;
  }, [onStats]);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes: Node[] = [];
    const packets: Packet[] = [];
    const edges: number[] = []; // flat [a,b,a,b…], rebuilt each frame
    const mouse = { x: -1e4, y: -1e4 };
    let w = 0, h = 0, base = 0, visible = true, raf = 0, last = performance.now();
    let spawnAcc = 0, frames = 0, fpsT = last, fps = 60;

    const make = (x: number, y: number, born = -1e4): Node => ({
      x, y, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: 0.9 + Math.random() * 1.3, born,
    });

    const resize = () => {
      const r = cvs.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cvs.width = Math.round(w * dpr); cvs.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const extra = Math.max(0, nodes.length - base);
      base = Math.min(90, Math.max(28, Math.round((w * h) / 19000)));
      while (nodes.length < base + extra) nodes.push(make(Math.random() * w, Math.random() * h));
      nodes.length = Math.min(nodes.length, base + extra);
    };

    const hub = () => {
      const el = hubRef.current;
      if (!el) return null;
      const a = el.getBoundingClientRect(), c = cvs.getBoundingClientRect();
      return { x: a.left + a.width / 2 - c.left, y: a.top + a.height * 0.62 - c.top };
    };

    const pulseHub = () =>
      hubRef.current?.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.45)", filter: "brightness(1.25)" }, { transform: "scale(1)" }],
        { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" },
      );

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50); last = now;
      const H = hub();
      ctx.clearRect(0, 0, w, h);

      // move
      for (const n of nodes) {
        n.x += n.vx * dt * 0.06; n.y += n.vy * dt * 0.06;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 1) { const f = (1 - Math.sqrt(d2) / 150) * 0.9; const d = Math.sqrt(d2); n.x += (dx / d) * f; n.y += (dy / d) * f; }
      }

      // edges
      edges.length = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          const mx = (a.x + b.x) / 2 - mouse.x, my = (a.y + b.y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 220);
          ctx.strokeStyle = `rgba(${CREAM},${(1 - d / LINK) * (0.11 + near * 0.35)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          edges.push(i, j);
        }
        if (H) {
          const dx = a.x - H.x, dy = a.y - H.y, d = Math.hypot(dx, dy);
          if (d < HUB_LINK) {
            ctx.strokeStyle = `rgba(${BRAND},${(1 - d / HUB_LINK) * 0.28})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(H.x, H.y); ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const age = now - n.born;
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        ctx.fillStyle = `rgba(${CREAM},${0.35 + Math.max(0, 1 - md / 180) * 0.6})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        if (age < 1400) { // "joined the cluster" ring
          const p = age / 1400;
          ctx.strokeStyle = `rgba(${BRAND},${1 - p})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, 4 + p * 38, 0, Math.PI * 2); ctx.stroke();
        }
      }

      // packets
      spawnAcc += dt;
      while (spawnAcc > 110 && edges.length) {
        spawnAcc -= 110;
        const toHub = !!H && Math.random() < 0.3;
        if (toHub) {
          const k = (Math.random() * nodes.length) | 0;
          if (Math.hypot(nodes[k].x - H!.x, nodes[k].y - H!.y) < HUB_LINK) packets.push({ a: k, b: -1, t: 0, speed: 0.0011 + Math.random() * 0.0008, toHub: true });
        } else {
          const e = ((Math.random() * edges.length) / 2) | 0;
          const flip = Math.random() < 0.5;
          packets.push({ a: edges[e * 2 + (flip ? 1 : 0)], b: edges[e * 2 + (flip ? 0 : 1)], t: 0, speed: 0.0012 + Math.random() * 0.001, toHub: false });
        }
      }
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        const A = nodes[p.a], B = p.toHub ? H : nodes[p.b];
        if (!A || !B) { packets.splice(k, 1); continue; }
        p.t += p.speed * dt;
        if (p.t >= 1) { packets.splice(k, 1); if (p.toHub) pulseHub(); continue; }
        const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - (-2 * p.t + 2) ** 2 / 2;
        const x = A.x + (B.x - A.x) * e, y = A.y + (B.y - A.y) * e;
        ctx.fillStyle = `rgba(${BRAND},0.18)`; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgb(${BRAND})`; ctx.beginPath(); ctx.arc(x, y, 1.7, 0, Math.PI * 2); ctx.fill();
      }

      // stats
      frames++;
      if (now - fpsT > 500) {
        fps = Math.round((frames * 1000) / (now - fpsT)); frames = 0; fpsT = now;
        statsCb.current?.({ nodes: nodes.length, edges: edges.length / 2, fps });
      }
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    const toLocal = (e: MouseEvent) => {
      const c = cvs.getBoundingClientRect();
      return { x: e.clientX - c.left, y: e.clientY - c.top, inside: e.clientY >= c.top && e.clientY <= c.bottom };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = toLocal(e); mouse.x = p.inside ? p.x : -1e4; mouse.y = p.inside ? p.y : -1e4;
    };
    const onClick = (e: MouseEvent) => {
      const p = toLocal(e);
      if (!p.inside || (e.target as HTMLElement).closest("a,button")) return;
      if (nodes.length >= MAX_NODES) nodes.splice(base, 1); // recycle the oldest added node
      nodes.push(make(p.x, p.y, performance.now()));
      if (reduce) frame(performance.now());
    };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(cvs);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(cvs);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("click", onClick);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      removeEventListener("pointermove", onMove); removeEventListener("click", onClick);
    };
  }, [hubRef]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}
