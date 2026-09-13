"use client";

import { useEffect, useRef } from "react";

export default function AmbientWaveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Sparse, refined count of ambient wave nodes (32 particles)
    const particleCount = 32;
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      glowColor: string;
      speedX: number;
      speedY: number;
      amplitude: number;
      phase: number;
      alpha: number;
    }> = [];

    const paletteDark = [
      { core: "rgba(220, 255, 250, ", glow: "rgba(0, 134, 136, " },   // Soft Teal
      { core: "rgba(0, 134, 136, ", glow: "rgba(6, 182, 212, " },    // Brand Teal
      { core: "rgba(56, 189, 248, ", glow: "rgba(14, 165, 233, " },  // Sky Blue
    ];

    const palette = paletteDark;

    for (let i = 0; i < particleCount; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const baseX = Math.random() * width;
      const baseY = Math.random() * height;
      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 1.6 + 1.1,
        color: pColor.core,
        glowColor: pColor.glow,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.20,
        amplitude: Math.random() * 22 + 10,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.15 + 0.15,
      });
    }

    let time = 0;
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      time += 0.012;
      scrollY += (targetScrollY - scrollY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Connective filaments
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = `rgba(0, 134, 136, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Glowing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle sinusoidal wave oscillation
        p.x = p.baseX + Math.sin(time * 0.7 + p.phase) * p.amplitude + Math.cos(time * 0.35 + p.phase) * (p.amplitude * 0.3);
        p.y = (p.baseY - (scrollY * 0.18) % height + height) % height + Math.cos(time * 0.5 + p.phase) * (p.amplitude * 0.4);

        // Slow base drift
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX < -20) p.baseX = width + 20;
        if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        const currentAlpha = p.alpha * (0.9 + Math.sin(time * 1.8 + p.phase) * 0.15);

        // Soft Ambient Glow
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.0);
        radGrad.addColorStop(0, `${p.glowColor}${currentAlpha * 0.6})`);
        radGrad.addColorStop(0.5, `${p.glowColor}${currentAlpha * 0.2})`);
        radGrad.addColorStop(1, `${p.glowColor}0)`);

        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * 3.0, 0, Math.PI * 2);
        ctx.fill();

        // Core micro-dot
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1.0, currentAlpha * 1.2)})`;
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] select-none opacity-85"
    />
  );
}
