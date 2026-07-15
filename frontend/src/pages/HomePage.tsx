import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../components/UserCard";
import { useCurrentUser } from "../context/CurrentUserContext";

// 🏠 Home dashboard. Greets the current (fake-auth) user and shows real data.
export function HomePage() {
  const { data: users, isLoading, error } = useUsers();
  const { me } = useCurrentUser();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">
        Welcome{me ? `, ${me.name}` : ""} 👋
      </h1>
      <p className="mb-6 text-slate-500">
        Everything you need to get up to speed, in one place.
      </p>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Popular Experts</h2>
        {isLoading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-sm text-red-600">Backend offline: {error.message}</p>}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(users ?? []).slice(0, 3).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
