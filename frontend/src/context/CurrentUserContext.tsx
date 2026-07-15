import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserId, setUserId } from "../lib/session";
import { meApi } from "../api/me";
import type { User } from "../types";

interface CurrentUserContextValue {
  me: User | undefined;
  loading: boolean;
  userId: number | null;
  switchUser: (id: number) => void;
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [userId, setUserIdState] = useState<number | null>(getUserId());

  // Keyed by userId so switching identities refetches "me".
  const { data: me, isLoading } = useQuery({
    queryKey: ["me", userId],
    queryFn: meApi.get,
  });

  function switchUser(id: number) {
    setUserId(id); // persist + update the header the API client sends
    setUserIdState(id);
    // Anything that depends on "who am I" should refresh.
    queryClient.invalidateQueries({ queryKey: ["me"] });
  }

  return (
    <CurrentUserContext.Provider value={{ me, loading: isLoading, userId, switchUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) throw new Error("useCurrentUser must be used within CurrentUserProvider");
  return ctx;
}
