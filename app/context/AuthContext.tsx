"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../actions/type';


export const  INITIAL_USER = {
  memeberId: "",
  username:"",
  email:"",
  isVerified:"",
  role:"",
  firstname:"",
  lastname:"",    
  profileImgeUrl:""
}

const INITIAL_STATE ={
  user:INITIAL_USER,
  token:"",
  isAuthenticated:false,
  login:()=>{},
  logout:()=>{}
}

// Define the type for the context state
interface AuthContextType {
  user: User ;
  token: string ;
  isAuthenticated: boolean;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

// Create the AuthContext with a default value of null
const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Load token and user data from local storage (if present)
  useEffect(() => {
    console.log('everytime you change route')
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    else {
      router.push('/sign-in'); // Automatically redirect to login page
    }
  }, [router]);

  // Function to log in the user
  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", authToken);
    router.push('/'); 
  };

  // Function to log out the user
  const logout = () => {
    setUser(INITIAL_USER);
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    router.push('/sign-in');
  };

  // Context value to be shared
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuthContext = ()=> useContext(AuthContext);
  