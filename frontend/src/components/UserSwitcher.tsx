import { useUsers } from "../hooks/useUsers";
import { useCurrentUser } from "../context/CurrentUserContext";

// Fake-auth identity picker. Swaps the X-User-Id sent on every request.
export function UserSwitcher() {
  const { data: users } = useUsers();
  const { me, switchUser } = useCurrentUser();

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="hidden sm:inline">Acting as</span>
      <select
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 outline-none focus:border-indigo-400"
        value={me?.id ?? ""}
        onChange={(e) => switchUser(Number(e.target.value))}
      >
        {!me && <option value="">Loading…</option>}
        {users?.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </label>
  );
}
