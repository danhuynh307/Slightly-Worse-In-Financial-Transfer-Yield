// Tiny fetch wrapper. Every feature's API module goes through this so we have one
// place for the base URL, the fake-auth header, and error handling.

import { getUserId } from "../lib/session";

// Empty by default → relative URLs served through the Vite proxy (see vite.config).
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const userId = getUserId();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(userId != null ? { "X-User-Id": String(userId) } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} on ${path}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
