// Current-user ("me") API for fake auth. Backend resolves it from X-User-Id.
import { api } from "./client";
import type { User } from "../types";

export const meApi = {
  get: () => api.get<User>("/api/me"),
};
