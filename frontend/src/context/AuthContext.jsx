import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/services/apiAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: user, isPending } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "me"],
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const value = {
    user: user ?? null,
    isAuthenticated: !!user,
    isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
