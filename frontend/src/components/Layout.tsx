import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { UserSwitcher } from "./UserSwitcher";

// App shell: persistent sidebar + top bar. Pages render into <Outlet />.
export function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-left">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-8 py-4">
          <input
            type="search"
            placeholder="Search people, acronyms, prompts…"
            className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-400"
          />
          <div className="ml-auto">
            <UserSwitcher />
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
