"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

/**
 * SetPasswordPage component
 * Allows user to set a new password with validation and redirects to confirmation
 */
const SetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // State for password input and loading indicator
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Validates password according to rules:
   * - min 6 chars
   * - at least one uppercase letter
   * - at least one number
   * @param pwd Password string
   * @returns Error message or empty string if valid
   */
  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pwd)) return "Password must include at least one uppercase letter.";
    if (!/\d/.test(pwd)) return "Password must include at least one number.";
    return "";
  };

  /**
   * Handles form submission:
   * Validates password and navigates to confirmation page if valid
   */
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    const validationError = validatePassword(trimmed);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    router.push(`/set-password/confirm?email=${encodeURIComponent(email)}&password=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white justify-center items-center">
      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Main container */}
      <div className="max-w-md w-full px-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#000000]">Set Your Password</h1>

        {/* Password form */}
        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5A31F5]">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#5A31F5] text-white rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordPage;
