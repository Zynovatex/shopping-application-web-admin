"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<{ authorities: string[] }>(token);
      const roleFromToken = decoded?.authorities?.[0] || "";
      setRole(roleFromToken);

      // Fetch allowedModules from backend
      fetch("http://localhost:8080/api/admin/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error("Failed response status:", res.status);
            return;
          }

          const text = await res.text();
          if (!text) {
            console.warn("Empty response from /api/admin/me");
            return;
          }

          let data;
          try {
            data = JSON.parse(text);
          } catch (parseErr) {
            console.error("JSON parse error:", parseErr);
            return;
          }

          if (data.allowedModules) {
            setPermissions(data.allowedModules);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user permissions", err);
        });
    } catch (err) {
      console.error("JWT decode error", err);
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, permissions }}>
      {children}
    </UserContext.Provider>
  );
};
