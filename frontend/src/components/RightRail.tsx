import { useState } from "react";
import { ArrowRight, ChevronDown, Languages, FileText } from "lucide-react";
import { PRAISE, TRENDING, POPULAR_ACRONYMS, SAVED_PROMPTS } from "../data/dashboard";

function CardHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[0.95rem] font-semibold text-foreground">{title}</h3>
      {action && (
        <button className="flex items-center gap-1 text-xs font-medium text-brand-ink hover:underline">
          {action} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function PraiseFeed() {
  const [idx, setIdx] = useState(0);
  const p = PRAISE[idx];
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <CardHeader title="Praise Feed" action="View all" />
      <div className="rounded-xl bg-secondary/60 p-4">
        <div className="flex gap-3">
          <span
            className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-xs font-semibold ${p.avatar}`}
          >
            {p.initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {p.from} praised {p.to}!
            </p>
            <p className="mt-1 text-sm text-muted-foreground">“{p.message}”</p>
            <p className="mt-2 text-xs text-muted-foreground/80">{p.time}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {PRAISE.map((_, i) => (
          <button
            key={i}
            aria-label={`Praise ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-brand" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TrendingQA() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <CardHeader title="Trending Q&A" action="View all" />
      <ul className="space-y-4">
        {TRENDING.map((t) => (
          <li key={t.question} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <p className="text-sm font-medium leading-snug text-foreground">{t.question}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[0.68rem] font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {t.answers} answers
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AcronymTranslator() {
  const [value, setValue] = useState("");
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[0.95rem] font-semibold text-foreground">Acronym Translator</h3>
        <Languages className="h-4 w-4 text-brand-ink" />
      </div>

      <button className="mb-2 flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
        English <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter acronym (e.g., FSD)"
          className="min-w-0 flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <button
          aria-label="Translate"
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-hover"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-muted-foreground">Popular:</span>
        {POPULAR_ACRONYMS.map((a) => (
          <button
            key={a}
            onClick={() => setValue(a)}
            className="rounded-md bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {a}
          </button>
        ))}
      </div>
    </section>
  );
}

function SavedPrompts() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <CardHeader title="Saved Prompts" action="View all" />
      <ul className="space-y-1">
        {SAVED_PROMPTS.map((prompt) => (
          <li key={prompt}>
            <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary">
              <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" strokeWidth={1.8} />
              <span className="truncate">{prompt}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RightRail() {
  return (
    <aside className="space-y-5">
      <PraiseFeed />
      <TrendingQA />
      <AcronymTranslator />
      <SavedPrompts />
    </aside>
  );
}
