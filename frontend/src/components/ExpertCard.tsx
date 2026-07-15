import { Clock } from "lucide-react";
import type { Expert } from "../data/dashboard";

// A single "expert you can trust" card: identity, expertise tags, three headline
// stats, and a typical reply time. Used on Home and the People directory.
export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div className="flex w-[16.5rem] flex-shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-sm font-semibold ${expert.avatar}`}
        >
          {expert.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">{expert.name}</div>
          <div className="truncate text-xs text-muted-foreground">{expert.role}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {expert.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 border-t border-border pt-3 text-center">
        <Stat value={expert.docs} label="Docs authored" />
        <Stat value={expert.answers} label="Helpful answers" />
        <Stat value={expert.kudos} label="Kudos received" />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" strokeWidth={2} />
        Usually replies in {expert.replyIn}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="px-0.5">
      <div className="text-base font-bold text-foreground">{value}</div>
      <div className="mt-0.5 text-[0.62rem] leading-tight text-muted-foreground">{label}</div>
    </div>
  );
}
