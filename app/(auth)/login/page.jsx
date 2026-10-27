"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pizza, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("manager@pizzashop.com");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Static dummy navigation - no real authentication
    router.push("/reception");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-slate-100 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 mb-3">
            <Pizza className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Profit Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pizza & Fast Food POS & Profit Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100/80">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sign in to access reception desk or admin reports
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@business.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-orange-600 hover:text-orange-700 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-600 border-slate-300 focus:ring-orange-500 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-600">Remember me</span>
              </label>

              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Demo Mode
              </span>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 group shadow-md shadow-orange-500/20"
            >
              <span>Login to Dashboard</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-4 p-2.5 rounded-xl bg-orange-50/70 border border-orange-100/80 text-center">
            <p className="text-[11px] text-orange-800">
              💡 <strong>Demo Quick Access:</strong> Click <strong>Login</strong> directly to open the Reception POS.
            </p>
          </div>

          {/* Register Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
