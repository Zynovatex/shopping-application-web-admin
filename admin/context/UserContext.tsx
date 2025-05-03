"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Named import for v4+

interface UserContextType {
  role: string;
  permissions: string[];
}

const UserContext = createContext<UserContextType>({
  role: "",
  permissions: [],
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      try {
        const decoded = jwtDecode<{ authorities: string[]; permissions: string[] }>(token);
        const roleFromToken = decoded?.authorities?.[0] || "";
        const permsFromToken = decoded?.permissions || [];

        setRole(roleFromToken);
        setPermissions(permsFromToken);
      } catch (err) {
        console.error("Token decoding error:", err);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, permissions }}>
      {children}
    </UserContext.Provider>
  );
};
