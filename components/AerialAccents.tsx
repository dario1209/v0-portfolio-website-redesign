// AerialAccents.tsx
// Thin single-stroke line-art icons used as scattered accent illustrations.
// Mirrors the restrained "spice, not structure" treatment from the design
// system: one color (currentColor, set via CSS), low opacity, small scale.

export function SilkHand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M60 10 C 55 40, 65 70, 60 100" strokeLinecap="round" />
      <path
        d="M50 100 C 45 110, 45 130, 55 140 C 60 145, 68 143, 70 136"
        strokeLinecap="round"
      />
      <path d="M70 100 C 75 108, 76 118, 70 124" strokeLinecap="round" />
      <ellipse cx="60" cy="112" rx="4" ry="6" />
    </svg>
  );
}

export function LyraRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="38" />
      <line x1="50" y1="4" x2="50" y2="18" strokeLinecap="round" />
      <line x1="50" y1="82" x2="50" y2="96" strokeLinecap="round" />
    </svg>
  );
}

export function Flame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M30 5 C 15 25, 12 45, 20 58 C 15 50, 18 40, 24 36 C 22 48, 30 58, 38 52 C 44 47, 44 38, 38 28 C 44 34, 46 46, 40 55 C 48 48, 50 32, 30 5 Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
