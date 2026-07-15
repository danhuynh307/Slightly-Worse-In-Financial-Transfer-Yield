import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { RightRail } from "../components/RightRail";
import { ExpertCard } from "../components/ExpertCard";
import { HeroArt } from "../components/HeroArt";
import {
  STATS,
  QUICK_ACTIONS,
  EXPERTS,
  ACTIVITY,
  ACTIVITY_TABS,
} from "../data/dashboard";

// 🏠 Home — the Swifty "ask anything" landing dashboard.
export function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <Hero />
          <StatsRow />
          <ExpertsSection />
          <RecentActivity />
        </div>
        <RightRail />
      </div>
    </div>
  );
}

function Hero() {
  const [q, setQ] = useState("");
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#f0e4d4] bg-gradient-to-br from-[#fbe9d6] via-[#fcf1e6] to-[#fdf7f0] px-8 py-10 shadow-sm">
      <div className="pointer-events-none absolute -right-6 bottom-0 hidden opacity-90 sm:block">
        <HeroArt />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#2a2622] md:text-[2.1rem]">
          What are you trying to accomplish today?
        </h2>
        <p className="mt-2 text-sm text-[#7a6f63]">
          Ask Swifty anything — find people, knowledge, docs, or answers.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex items-center gap-2 rounded-2xl border border-[#efe2d1] bg-white/95 p-2 pl-4 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15"
        >
          <Sparkles className="h-5 w-5 flex-shrink-0 text-brand-ink" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask Swifty anything…"
            className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Ask Swifty"
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-hover"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center gap-1.5 rounded-full border border-[#efe2d1] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#4a433b] transition-colors hover:border-brand/40 hover:text-brand-ink"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                {a.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl ${s.tint}`}>
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <div className="text-lg font-bold leading-none text-foreground">{s.value}</div>
              <div className="mt-1 truncate text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExpertsSection() {
  const scroller = useRef<HTMLDivElement>(null);
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Experts you can trust</h3>
        <Link
          to="/experts"
          className="flex items-center gap-1 text-xs font-medium text-brand-ink hover:underline"
        >
          View all experts <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="relative">
        <div ref={scroller} className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
          {EXPERTS.map((e) => (
            <ExpertCard key={e.name} expert={e} />
          ))}
        </div>
        <button
          aria-label="Scroll experts"
          onClick={() => scroller.current?.scrollBy({ left: 300, behavior: "smooth" })}
          className="absolute -right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:text-foreground sm:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function RecentActivity() {
  const [tab, setTab] = useState<(typeof ACTIVITY_TABS)[number]>("All");
  const rows = tab === "All" ? ACTIVITY : ACTIVITY.filter((a) => a.filter === tab);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">Recent activity</h3>

      <div className="mt-3 flex gap-5 border-b border-border">
        {ACTIVITY_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-2 text-sm font-medium transition-colors ${
              tab === t
                ? "border-brand text-brand-ink"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-1 divide-y divide-border">
        {rows.map((a, i) => {
          const Icon = a.icon;
          return (
            <li key={i} className="flex items-center gap-3 py-3.5">
              <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg ${a.tint}`}>
                <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{a.who}</span> {a.action}
                </p>
                <p className="truncate text-sm text-muted-foreground">{a.detail}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">{a.time}</span>
            </li>
          );
        })}
        {rows.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">Nothing here yet.</li>
        )}
      </ul>

      <div className="mt-1 border-t border-border pt-3 text-center">
        <button className="inline-flex items-center gap-1 text-sm font-medium text-brand-ink hover:underline">
          View all activity <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
