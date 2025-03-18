"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { User } from "../actions/type";
import { toast } from "react-toastify";

const INITIAL_USER = {
  memeberId: "",
  username: "",
  email: "",
  isVerified: "",
  role: "",
  firstname: "",
  lastname: "",
  profileImgeUrl: "",
  isTempPassword: true,
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  token: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

interface AuthContextType {
  user: User;
  token: string;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();

  const isTokenExpired = (authToken: string) => {
    try {
      const decodedToken: JWTPayload = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Invalid token format", error);
      return true;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        if (isTokenExpired(storedToken)) {
          logout();
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } else {
        router.push("/sign-in");
      }
      setLoading(false); // Set loading to false after token check
    };

    initializeAuth();
  }, [router]);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userRole", userData.role);

    if (userData.isTempPassword) {
      router.push("/change-password");
    } else if (userData.role.toLowerCase() === "member") {
      toast.success("You are not authorize to access the admin panel.");
      return;
    } else {
      toast.success(`Welcome back!`);
      router.push("/");
    }
  };

  const logout = () => {
    setUser(INITIAL_USER);
    setToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    router.push("/sign-in");
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading spinner or fallback UI
  }

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
