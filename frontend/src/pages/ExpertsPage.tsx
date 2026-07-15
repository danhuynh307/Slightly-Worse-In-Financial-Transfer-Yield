import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../components/UserCard";

// ⭐ REFERENCE PAGE — fully wired to the backend (GET /api/users) via TanStack Query.
// Pattern for every feature: page → hook (useQuery) → api module → client → backend.
export function ExpertsPage() {
  const { data: users, isLoading, error } = useUsers();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Expert Navigator</h1>
      <p className="mb-6 text-slate-500">
        Everyone in the hub. (Next: filter by expertise tag.)
      </p>

      {isLoading && <p className="text-slate-500">Loading experts…</p>}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn't reach the backend: {error.message}
          <br />
          Is Spring Boot running on port 8080?{" "}
          <code className="rounded bg-red-100 px-1">cd backend &amp;&amp; ./mvnw spring-boot:run</code>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(users ?? []).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
