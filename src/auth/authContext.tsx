import { createContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  AuthResponse,
  AuthUser,
} from "../types/authTypes";
import type { NavigateFunction } from "react-router";
import axios from "axios";
import type { FormData } from "../types/formTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
const API_BASE_URL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get<AuthUser>(`${API_BASE_URL}/users/me`);
      if (response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al comprobar el estado de autenticación:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (userData: FormData, navigate: NavigateFunction) => {
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/users/login`,
        userData
      );
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
        navigate("/");
        return response.data.message;
      }
      setLoading(false);
      return response.data.message;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en el inicio de sesión:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.detail || "Error al iniciar sesión"
        );
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Ha ocurrido un error inesperado");
      }
    }
  };

  const signup = async (userData: FormData, navigate: NavigateFunction) => {
    setLoading(true);
    try {
      
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/users`,
        userData
      );
      if (response.status === 200 && response.data.user) {
        setLoading(false);
        navigate("/");
        return response.data.message;
      }
      setLoading(false);
      return response.data.message;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en el inicio de sesión:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.detail || "Error al iniciar sesión"
        );
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Ha ocurrido un error inesperado");
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/users/logout`);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
