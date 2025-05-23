"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

/**
 * ConfirmPasswordPage component
 * Handles confirmation and setting of a new password
 */
export default function ConfirmPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const passwordParam = searchParams.get("password") || "";

  const router = useRouter();

  // States for password inputs and loading/status flags
  const [password, setPassword] = useState(passwordParam);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlreadySet, setIsAlreadySet] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if password is already set on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/auth/check-password-status?email=${email}`
        );
        if (res.data === "SET") setIsAlreadySet(true);
      } catch (err) {
        toast.error("Something went wrong while verifying status.");
      }
    };

    if (email) checkStatus();
  }, [email]);

  /**
   * Handles form submission to set the password
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/auth/set-password", {
        email,
        password,
      });
      toast.success("Password set successfully!");

      // Redirect to admin page after delay
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      toast.error("Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  // Handle invalid or missing email param
  if (!email) {
    return <p className="text-center mt-20">Invalid or missing email link.</p>;
  }

  // Show message if password is already set
  if (isAlreadySet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-10 shadow-lg rounded-xl bg-white">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Password Already Set
          </h1>
          <p className="text-gray-600">
            You cannot change the password again. Please contact the admin if
            needed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Toast notification container */}
      <Toaster position="top-right" />

      {/* Password confirmation form container */}
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-[#000]">
          Confirm Your Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#5A31F5]">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 border border-gray-300 rounded-xl p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5A31F5]">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 border border-gray-300 rounded-xl p-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#5A31F5] text-white rounded-xl font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
