"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

export default function ConfirmPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const passwordParam = searchParams.get("password") || "";

  const router = useRouter();

  const [password, setPassword] = useState(passwordParam);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlreadySet, setIsAlreadySet] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axiosClient.get(
          `/api/auth/check-password-status?email=${email}`
        );
        if (res.data === "SET") {
          setIsAlreadySet(true);
        }
      } catch (err) {
        console.error("Status check error", err);
      } finally {
        setStatusChecked(true);
      }
    };

    if (email) checkStatus();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axiosClient.post("/api/auth/set-password", {
        email,
        password,
      });
      toast.success("Password set successfully!");
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      toast.error("Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return <p className="text-center mt-20">Invalid or missing email link.</p>;
  }

  if (!statusChecked) {
    return null;
  }

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
