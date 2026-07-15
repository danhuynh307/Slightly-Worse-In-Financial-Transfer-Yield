// Initials for avatar fallbacks: "Sarah Malik" -> "SM", "Dan" -> "DA".
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic avatar tint from a name, for people without a chosen color.
const PALETTE = [
  "bg-emerald-500 text-white",
  "bg-sky-600 text-white",
  "bg-violet-500 text-white",
  "bg-rose-400 text-white",
  "bg-amber-500 text-white",
  "bg-teal-600 text-white",
];

export function avatarTint(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
