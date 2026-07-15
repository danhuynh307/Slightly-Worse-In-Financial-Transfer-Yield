import { Sparkles } from "lucide-react";

// Placeholder for pages a teammate will build out. Shows a consistent
// "claim me" canvas in the Swifty theme in the meantime.
export function StubPage({
  title,
  owner,
  description,
}: {
  title: string;
  owner?: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-[1440px]">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-ink">
          <Sparkles className="h-6 w-6" />
        </span>
        <p className="mt-4 font-medium text-foreground">
          This page is coming soon{owner ? ` — ${owner} owns it` : ""}.
        </p>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Follow the pattern in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">pages/ExpertsPage.tsx</code>{" "}
          to wire it to the backend.
        </p>
      </div>
    </div>
  );
}
