"use client";

import { useLoading } from "@/context/LoadingContext";

/**
 * GlobalLoader component
 * Displays a fullscreen loading spinner overlay based on loading state from LoadingContext
 */
const GlobalLoader = () => {
  // Get loading state from LoadingContext
  const { isLoading } = useLoading();

  // Do not render anything if not loading
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm
                 flex items-center justify-center"
      aria-label="Loading"
    >
      {/* Loading spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-[#5A31F5] rounded-full animate-spin" />
    </div>
  );
};

export default GlobalLoader;
