// components/common/GlobalLoader.tsx

"use client";

import { useLoading } from "@/context/LoadingContext";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-t-[#5A31F5] rounded-full animate-spin" />
    </div>
  );
};

export default GlobalLoader;
