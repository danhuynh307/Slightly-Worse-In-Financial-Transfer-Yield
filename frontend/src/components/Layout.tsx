import { Outlet } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { UserSwitcher } from "./UserSwitcher";
import { useCurrentUser } from "../context/CurrentUserContext";
import { initialsOf } from "../lib/avatar";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// App shell: persistent sidebar + a slim top bar. Pages render into <Outlet />.
export function Layout() {
  const { me } = useCurrentUser();
  const firstName = me?.name?.split(" ")[0];

  return (
    <div className="flex min-h-screen bg-background text-left">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background px-8 py-4">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground">
              {greeting()}
              {firstName ? `, ${firstName}` : ""} <span className="align-middle">👋</span>
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Bell className="h-5 w-5" strokeWidth={1.9} />
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.62rem] font-semibold text-white">
                3
              </span>
            </button>

            <div className="relative flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-4 pr-2.5 shadow-sm transition-colors hover:bg-secondary">
              <div className="hidden text-right leading-tight sm:block">
                <div className="text-sm font-semibold text-foreground">
                  {me?.name ?? "Loading…"}
                </div>
                <div className="text-xs text-muted-foreground">{me?.title ?? " "}</div>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c97b45] text-sm font-semibold text-white">
                {me ? initialsOf(me.name) : "…"}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
              <UserSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
