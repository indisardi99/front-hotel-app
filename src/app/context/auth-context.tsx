"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

type Role = "user" | "admin" | "employee";
type AuthProvider = "google" | "email";

type User = {
  id: string;
  email: string;
  role?: Role;
  phone?: number;
  adress?: string;
  name?: string;
  image?: string;
  status?: string;
  authProvider?: AuthProvider;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  isLoading: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  isUser: () => boolean;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  updateUser: (updatedUser: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isLoading: true,
  login: (_user: User, _accessToken: string) => {},
  logout: () => {},
  isUser: () => false,
  isAdmin: () => false,
  isEmployee: () => false,
  updateUser: (_updatedUser: User) => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedUser = getCookie("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedAccessToken = getCookie("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
      }

      const storedAddress = getCookie("address");

      setIsLoading(false);
    };

    loadAuthState();
  }, []);

  const login = (user: User, accessToken: string) => {
    setCookie("accessToken", accessToken);
    setAccessToken(accessToken);
    setCookie("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("user");
    deleteCookie("address");
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("cartItems");
  };

  const isUser = () => user?.role === "user";
  const isAdmin = () => user?.role === "admin";
  const isEmployee = () => user?.role === "employee";

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setCookie("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isUser,
        isAdmin,
        isEmployee,
        accessToken,
        isLoading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
