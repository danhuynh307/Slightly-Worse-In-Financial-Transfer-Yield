import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  BookOpen,
  Boxes,
  Sparkles,
  HandHeart,
  MessagesSquare,
  LibraryBig,
  Languages,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { initialsOf } from "../lib/avatar";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

// Nav mirrors the Swifty information architecture. Live pages: Home + People
// (the users directory). The rest render the restyled stub until built out.
const sections: NavSection[] = [
  { items: [{ to: "/", label: "Home", icon: Home, end: true }] },
  {
    title: "Discover",
    items: [
      { to: "/experts", label: "People", icon: Users },
      { to: "/knowledge", label: "Knowledge", icon: BookOpen },
      { to: "/acronyms", label: "Acronyms", icon: Boxes },
      { to: "/prompts", label: "Prompts", icon: Sparkles },
    ],
  },
  {
    title: "Community",
    items: [
      { to: "/praise", label: "Praise", icon: HandHeart },
      { to: "/qna", label: "Q&A", icon: MessagesSquare },
    ],
  },
  {
    title: "Tools",
    items: [
      { to: "/prompt-library", label: "Prompt Library", icon: LibraryBig },
      { to: "/acronym-translator", label: "Acronym Translator", icon: Languages },
    ],
  },
];

function NavRow({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-[0.9rem] font-medium transition-colors ${
          isActive
            ? "bg-brand-soft text-brand-ink"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`
      }
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.9} />
      {item.label}
    </NavLink>
  );
}

export function Sidebar() {
  const { me } = useCurrentUser();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white shadow-sm">
          S
        </div>
        <div className="min-w-0 leading-tight">
          <div className="text-[1.05rem] font-bold tracking-tight text-foreground">Swifty</div>
          <div className="truncate text-[0.7rem] text-muted-foreground">
            Slightly Worse in Financial Transfer Yield
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {sections.map((section, i) => (
          <div key={section.title ?? i} className="space-y-1">
            {section.title && (
              <div className="px-3 pb-1 pt-2 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <NavRow key={item.to} item={item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer: settings + identity */}
      <div className="border-t border-border p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-[0.9rem] font-medium transition-colors ${
              isActive
                ? "bg-brand-soft text-brand-ink"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`
          }
        >
          <Settings className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.9} />
          Settings
        </NavLink>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-secondary"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#c97b45] text-sm font-semibold text-white">
            {me ? initialsOf(me.name) : "…"}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-foreground">
              {me?.name ?? "Loading…"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {me?.title ?? " "}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
