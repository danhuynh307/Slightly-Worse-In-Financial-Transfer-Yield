import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../components/UserCard";

// People directory — fully wired to the backend (GET /api/users) via TanStack
// Query. Pattern for every feature: page → hook (useQuery) → api module → client.
export function ExpertsPage() {
  const { data: users, isLoading, error } = useUsers();

  return (
    <div className="mx-auto max-w-[1440px]">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">People</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Everyone in the hub. (Next: filter by expertise tag.)
      </p>

      {isLoading && <p className="mt-6 text-muted-foreground">Loading people…</p>}

      {error && (
        <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          Couldn't reach the backend: {error.message}
          <br />
          Is Spring Boot running on port 8080?{" "}
          <code className="rounded bg-destructive/10 px-1">cd backend &amp;&amp; ./mvnw spring-boot:run</code>
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(users ?? []).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
