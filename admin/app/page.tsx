"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "./globals.css";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { token, allowedModules } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("allowedModules", JSON.stringify(allowedModules));

      router.push("/admin");
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src="/loginIllustrater.png"
            alt="Login Illustration"
            className="w-[500px] h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-[#000000]">LogIn</h1>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-[#5A31F5]">
                  Email Address
                </label>
                <div className="relative h-14">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="h-full w-full p-3 border border-gray-300 rounded-xl text-sm"
                  />
                  {email && isValidEmail(email) && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="black" />
                        <path
                          d="M9.5 13.7l-2.2-2.2-.9.9 3.1 3.1 6.1-6.1-.9-.9z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-[#5A31F5]">
                  Password
                </label>
                <div className="relative h-14">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="h-full w-full p-3 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <Link href="/auth/register" className="text-[#5A31F5] hover:underline">
                  Sign Up Now
                </Link>
                <Link href="/auth/forgot-password" className="text-[#5A31F5] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-[#5A31F5] text-white rounded-xl text-sm font-semibold"
              >
                Login
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
