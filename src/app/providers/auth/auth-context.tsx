import type { AuthSession, User } from "@/entities/user/model/types";
import { createContext } from "react";

export interface AuthContextData {
  setUserData(authSession: AuthSession): void;
  logout(): Promise<void>;
  user: User | null;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);
