// Decorative sunrise + potted-plant illustration for the Home hero.
// Purely presentational; warm tones tuned to the peach hero gradient.
export function HeroArt() {
  return (
    <svg
      width="230"
      height="200"
      viewBox="0 0 230 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* soft sun */}
      <circle cx="150" cy="70" r="46" fill="#f7c98b" opacity="0.55" />
      <circle cx="150" cy="70" r="30" fill="#f4b46a" opacity="0.5" />

      {/* ground line */}
      <path d="M20 168 H210" stroke="#e6c9a6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* leaves */}
      <g stroke="#3f9b7c" strokeWidth="3" strokeLinecap="round" fill="#57b18f">
        <path d="M120 150 C112 120 120 96 138 84 C132 108 130 130 128 150 Z" />
        <path d="M120 150 C128 118 150 100 172 100 C158 122 142 140 128 152 Z" fill="#4aa584" />
        <path d="M120 150 C112 124 96 108 76 108 C90 128 104 142 120 152 Z" fill="#63b795" />
      </g>
      <path d="M120 152 V128" stroke="#2f7d64" strokeWidth="3" strokeLinecap="round" />

      {/* pot */}
      <path
        d="M96 150 H150 L142 190 A6 6 0 0 1 136 196 H110 A6 6 0 0 1 104 190 Z"
        fill="#e08a4e"
      />
      <path d="M92 150 H154 A4 4 0 0 1 158 154 V156 A4 4 0 0 1 154 160 H92 A4 4 0 0 1 88 156 V154 A4 4 0 0 1 92 150 Z" fill="#c9743c" />

      {/* small companion cup */}
      <path d="M60 176 H84 L80 194 A4 4 0 0 1 76 198 H68 A4 4 0 0 1 64 194 Z" fill="#d98c6a" />
    </svg>
  );
}
