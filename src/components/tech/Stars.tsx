import React, { useRef, useEffect } from "react";

interface StarsProps {
  className?: string;
}

const Stars = ({ className }: StarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resize();

    const stars = new Array(200).fill(null).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random(),
      d: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let raf = 0;

    function render() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const s of stars) {
        s.alpha += s.d;
        if (s.alpha <= 0) {
          s.alpha = 0;
          s.d = Math.abs(s.d);
        } else if (s.alpha >= 1) {
          s.alpha = 1;
          s.d = -Math.abs(s.d);
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x * rect.width, s.y * rect.height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full -z-20 pointer-events-none " +
        (className ?? "")
      }
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  );
};

export default Stars;
