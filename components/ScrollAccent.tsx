// ScrollAccent.tsx
// IntersectionObserver-based fade/drift-in wrapper for accent illustrations.
// No external deps. Resolves instantly to resting state under
// prefers-reduced-motion (handled in accents.module.css), so it can't
// silently look "broken" the way the CursorDot/v3 animation issues did.

"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAccentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollAccent({ children, className = "", delay = 0 }: ScrollAccentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "isVisible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
