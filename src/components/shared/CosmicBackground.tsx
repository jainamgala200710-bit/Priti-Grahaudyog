"use client";

import { useEffect, useRef } from "react";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = 70;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }> = [];

    // Colors matching saffron, orange, warm cream/gold, and soft white
    const colors = [
      "rgba(255, 107, 0, ",  // saffron
      "rgba(234, 88, 12, ",  // orange
      "rgba(254, 215, 170, ", // light cream-gold
      "rgba(255, 255, 255, ", // white
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        speedY: -(Math.random() * 0.35 + 0.08), // upwards movement (antigravity)
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.8 + 0.2,
        fadeSpeed: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0.1, Math.min(1, p.opacity)) + ")";
        ctx.fill();

        // Move particle
        p.y += p.speedY;
        p.x += p.speedX;

        // Fade effect
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.95 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset if offscreen (wrap around vertically)
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.2;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
