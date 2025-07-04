import type { NavigateFunction } from "react-router";
import type { FormData } from "./formTypes";

export interface AuthUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  birth_date: Moment | null;
  email: string | null;
  password?: string;
  profile_picture: string;
  flats: [];
  role: "admin" | "user";
  createdAt: Moment | null;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: FormData, navigate: NavigateFunction) => Promise<string>;
  signup: (userData: FormData, navigate: NavigateFunction) => Promise<string>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
}
