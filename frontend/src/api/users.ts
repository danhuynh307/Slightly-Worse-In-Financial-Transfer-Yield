// Users feature API. Copy this file's shape for each new feature
// (expertise.ts, praise.ts, prompts.ts, acronyms.ts).

import { api } from "./client";
import type { User } from "../types";

export const usersApi = {
  getAll: () => api.get<User[]>("/api/users"),
  getById: (id: number) => api.get<User>(`/api/users/${id}`),
  create: (user: Omit<User, "id">) => api.post<User>("/api/users", user),
};
