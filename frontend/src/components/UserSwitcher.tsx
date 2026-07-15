import { useUsers } from "../hooks/useUsers";
import { useCurrentUser } from "../context/CurrentUserContext";

// Fake-auth identity picker. Rendered as a transparent <select> that fills its
// positioned parent, so the whole user chip acts as the "act as…" dropdown
// while keeping the polished visual chrome around it.
export function UserSwitcher({ className = "" }: { className?: string }) {
  const { data: users } = useUsers();
  const { me, switchUser } = useCurrentUser();

  return (
    <select
      aria-label="Switch acting user"
      title="Switch acting user"
      className={`absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 ${className}`}
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
  );
}
