"use client";

import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  style?: CSSProperties;
  className?: string;
}

/**
 * Lightweight scroll-triggered fade-in component.
 * Uses IntersectionObserver — no layout shift.
 */
export default function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  style,
  className,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const translateMap: Record<string, string> = {
    up: "translateY(22px)",
    left: "translateX(-22px)",
    right: "translateX(22px)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translateMap[direction],
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
