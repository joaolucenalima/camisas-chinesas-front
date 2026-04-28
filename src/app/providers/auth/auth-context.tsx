import type { User, UserLogin } from "@/entities/user/model/types";
import { createContext } from "react";

export interface AuthContextData {
  login(input: UserLogin): Promise<void>;
  register(input: UserLogin): Promise<void>;
  logout(): Promise<void>;
  user: User | null;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);
