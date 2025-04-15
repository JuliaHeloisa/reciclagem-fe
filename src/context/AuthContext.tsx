// src/context/AuthContext.tsx
"use client";
export const dynamic = 'force-dynamic';

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";

export interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === "undefined") return;
      setIsClient(true);

      const token = localStorage.getItem("token");
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await api.post("/users/login", { email, password });
      const { accessToken } = response.data;
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      const user = await api.get("/users/me");
      localStorage.setItem("token", accessToken);
      setUser(user.data);
      router.push("/all-locations");
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
    setUser(null);
    router.push("/login");
  }

  if (!isClient || loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
}
