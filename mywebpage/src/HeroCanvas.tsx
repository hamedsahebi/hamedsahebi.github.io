import { useEffect, useRef } from "react";

// Interactive data-flow network: particles travel from sources through the
// pipeline stages into the AI node, then out to decisions. Cursor proximity
// energizes nodes and pushes particles aside; click/tap sends a burst.

const STAGES = [
  { name: "Sources", count: 4 },
  { name: "Integrate", count: 2 },
  { name: "Store", count: 3 },
  { name: "Serve", count: 2 },
  { name: "AI", count: 1 },
  { name: "Decisions", count: 3 },
];
const AI_STAGE = 4;
const MAX_PARTICLES = 260;

const COLORS = {
  edge: "rgba(95,184,204,0.14)",
  edgeHot: "rgba(240,168,58,0.18)",
  data: [95, 184, 204],
  insight: [240, 168, 58],
  node: "#dde6ee",
  label: "#7f90a1",
};

type Node = { stage: number; x: number; y: number; energy: number; out: number[] };
type Edge = { from: number; to: number };
type Particle = { edge: number; t: number; speed: number };

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, labelY = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // On wide screens the canvas sits behind the hero text, so the network
      // occupies the right half only.
      const wide = w >= 1024;
      const padX = Math.max(28, w * 0.06);
      const left = wide ? w * 0.5 : padX;
      const top = wide ? h * 0.18 : h * 0.1;
      const bottom = wide ? h * 0.8 : h * 0.82;
      labelY = Math.min(h - 8, bottom + 44);
      nodes = [];
      STAGES.forEach((s, si) => {
        const x = left + (si / (STAGES.length - 1)) * (w - padX - left);
        for (let k = 0; k < s.count; k++) {
          const y = s.count === 1 ? (top + bottom) / 2 : top + (k / (s.count - 1)) * (bottom - top);
          nodes.push({ stage: si, x, y, energy: 0, out: [] });
        }
      });
      edges = [];
      nodes.forEach((a, ai) => {
        nodes.forEach((b, bi) => {
          if (b.stage === a.stage + 1) {
            a.out.push(edges.length);
            edges.push({ from: ai, to: bi });
          }
        });
      });
      particles = [];
      if (reduced) {
        for (let i = 0; i < 140; i++) particles.push(newParticle(Math.floor(Math.random() * edges.length), Math.random()));
      }
    }

    function newParticle(edge: number, t = 0): Particle {
      return { edge, t, speed: 0.006 + Math.random() * 0.008 };
    }

    function spawnFromSources(n: number) {
      const sources = nodes.map((nd, i) => (nd.stage === 0 ? i : -1)).filter((i) => i >= 0);
      for (let i = 0; i < n && particles.length < MAX_PARTICLES; i++) {
        const src = nodes[sources[Math.floor(Math.random() * sources.length)]];
        particles.push(newParticle(src.out[Math.floor(Math.random() * src.out.length)]));
      }
    }

    // Cubic bezier with horizontal tangents between two nodes.
    function point(e: Edge, t: number) {
      const a = nodes[e.from], b = nodes[e.to];
      const dx = (b.x - a.x) * 0.5;
      const u = 1 - t;
      const x = u * u * u * a.x + 3 * u * u * t * (a.x + dx) + 3 * u * t * t * (b.x - dx) + t * t * t * b.x;
      const y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
      return { x, y };
    }

    function repel(p: { x: number; y: number }) {
      if (!mouse.active) return p;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const r = 90;
      if (d2 > r * r || d2 === 0) return p;
      const d = Math.sqrt(d2);
      const f = ((r - d) / r) * 22;
      return { x: p.x + (dx / d) * f, y: p.y + (dy / d) * f };
    }

    function step() {
      // steady trickle, more when the cursor is inside
      spawnFromSources(mouse.active ? 3 : 1);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.t += p.speed;
        if (p.t >= 1) {
          const target = nodes[edges[p.edge].to];
          target.energy = Math.min(1, target.energy + (target.stage === AI_STAGE ? 0.08 : 0.25));
          if (target.out.length) {
            p.edge = target.out[Math.floor(Math.random() * target.out.length)];
            p.t = 0;
          } else {
            particles.splice(i, 1);
          }
        }
      }
      for (const n of nodes) {
        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < 110) n.energy = Math.min(1, n.energy + (1 - d / 110) * 0.08);
        }
        n.energy *= 0.94;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // edges
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.from], b = nodes[e.to];
        const dx = (b.x - a.x) * 0.5;
        ctx.strokeStyle = a.stage >= AI_STAGE ? COLORS.edgeHot : COLORS.edge;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(a.x + dx, a.y, b.x - dx, b.y, b.x, b.y);
        ctx.stroke();
      }

      // particles with short trails
      ctx.lineCap = "round";
      for (const p of particles) {
        const e = edges[p.edge];
        const head = repel(point(e, p.t));
        const tail = repel(point(e, Math.max(0, p.t - 0.06)));
        const [r, g, b] = nodes[e.from].stage >= AI_STAGE ? COLORS.insight : COLORS.data;
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0.95)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const isAI = n.stage === AI_STAGE;
        const base = isAI ? 13 : 4.5;
        const glow = base + n.energy * (isAI ? 26 : 14);
        const [r, g, b] = isAI || n.stage > AI_STAGE ? COLORS.insight : COLORS.data;
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow * 2);
        halo.addColorStop(0, `rgba(${r},${g},${b},${0.25 + n.energy * 0.45})`);
        halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isAI ? `rgb(${r},${g},${b})` : COLORS.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, base, 0, Math.PI * 2);
        ctx.fill();
        if (isAI) {
          ctx.fillStyle = "#0c141d";
          ctx.font = "600 11px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("AI", n.x, n.y + 0.5);
        }
      }

      // stage labels
      ctx.fillStyle = COLORS.label;
      ctx.font = `${w < 480 ? 9 : 11}px 'IBM Plex Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      STAGES.forEach((s, si) => {
        const n = nodes.find((nd) => nd.stage === si)!;
        ctx.fillText(s.name.toUpperCase(), n.x, labelY);
      });
    }

    function loop() {
      if (visible && !document.hidden) { step(); draw(); }
      raf = requestAnimationFrame(loop);
    }

    function toLocal(ev: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ev.clientX - rect.left;
      mouse.y = ev.clientY - rect.top;
    }
    const onMove = (ev: PointerEvent) => { toLocal(ev); mouse.active = true; };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };
    const onDown = (ev: PointerEvent) => {
      toLocal(ev);
      spawnFromSources(40);
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 160) n.energy = 1;
      }
      if (reduced) draw();
    };

    layout();
    const ro = new ResizeObserver(() => { layout(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    if (reduced) {
      draw();
    } else {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      // warm up so the first frame is already full of flow
      for (let i = 0; i < 160; i++) step();
      raf = requestAnimationFrame(loop);
    }
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full cursor-crosshair touch-pan-y"
      role="img"
      aria-label="Animated data pipeline: data flows from sources through integration, storage and APIs into an AI layer, then out to decisions"
    />
  );
}
