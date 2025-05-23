"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct named import for jwt-decode v4+

// Define the shape of User Context data
interface UserContextType {
  role: string;
  permissions: string[];
}

// Create UserContext with default empty values
const UserContext = createContext<UserContextType>({
  role: "",
  permissions: [],
});

// Custom hook to consume UserContext easily
export const useUserContext = () => useContext(UserContext);

// Provider component that decodes JWT from localStorage to set user role and permissions
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Run only on client side

    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode JWT token to extract role and permissions
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
