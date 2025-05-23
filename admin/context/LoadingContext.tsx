"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the loading context state and updater
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

// Create the LoadingContext with undefined initial value
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Hook to consume LoadingContext in components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// LoadingProvider wraps the app or components to provide loading state
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Export the context itself (optional, for advanced use)
export { LoadingContext };
