import type { User } from "../types";
import { initialsOf, avatarTint } from "../lib/avatar";

// Presentational card for a single person. No data fetching here on purpose.
export function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        {user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div
            className={`grid h-12 w-12 place-items-center rounded-full text-sm font-semibold ${avatarTint(user.name)}`}
          >
            {initialsOf(user.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-foreground">{user.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {user.title} · {user.team}
          </p>
        </div>
      </div>
      {user.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{user.bio}</p>}
    </div>
  );
}
