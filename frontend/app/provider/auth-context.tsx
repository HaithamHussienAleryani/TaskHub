import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "~/types/user";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
  };
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);

    queryClient.clear();
  };

  const values = { user, isAuthenticated, isLoading, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
