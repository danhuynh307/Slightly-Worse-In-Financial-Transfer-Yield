// Fake-auth session: which user we're acting as. Persisted so a refresh keeps
// you "logged in". The API client reads this to send the X-User-Id header.
const KEY = "swifthub.userId";

let currentUserId: number | null = (() => {
  const raw = localStorage.getItem(KEY);
  return raw ? Number(raw) : null;
})();

export function getUserId(): number | null {
  return currentUserId;
}

export function setUserId(id: number): void {
  currentUserId = id;
  localStorage.setItem(KEY, String(id));
}
