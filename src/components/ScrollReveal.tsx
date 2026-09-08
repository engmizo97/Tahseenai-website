"use client";

import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 45,
  duration = 1100,
  className = "",
  as: Component = "div",
  threshold = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use IntersectionObserver with negative bottom margin to trigger
    // smoothly as elements scroll into the viewport from the bottom
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0px, 0)" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
