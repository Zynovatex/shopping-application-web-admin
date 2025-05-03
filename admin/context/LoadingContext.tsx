"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the context
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

// Create context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Exported hook to use in any component
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Context Provider component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// ✅ Export the context itself
export { LoadingContext };
