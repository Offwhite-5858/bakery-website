"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Cake } from "lucide-react";

const ADMIN_PASSWORD = "bakery2024";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin-auth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-chocolate-800 to-chocolate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400 rounded-2xl mb-4">
            <Cake size={32} className="text-chocolate-900" />
          </div>
          <h1
            className="text-2xl font-bold text-cream-50"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bakery Admin
          </h1>
          <p className="text-cream-300 text-sm mt-1">
            Manage your website content
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-chocolate-700 font-medium mb-2 text-sm"
            >
              Enter Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 focus:outline-none focus:border-chocolate-400 transition-colors text-sm"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-chocolate-600 text-white py-3 rounded-full font-semibold hover:bg-chocolate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-chocolate-400 text-xs mt-4">
            Default password: bakery2024
          </p>
        </form>
      </div>
    </div>
  );
}