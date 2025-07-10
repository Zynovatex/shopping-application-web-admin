"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pwd)) return "Password must include at least one uppercase letter.";
    if (!/\d/.test(pwd)) return "Password must include at least one number.";
    return "";
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    const validationError = validatePassword(trimmed);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    router.push(
      `/set-password/confirm?email=${encodeURIComponent(email)}&password=${encodeURIComponent(trimmed)}`
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white justify-center items-center">
      <div className="max-w-md w-full px-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#000000]">Set Your Password</h1>

        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5A31F5]">
              New Password
            </label>
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
