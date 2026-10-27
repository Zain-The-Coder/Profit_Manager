"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pizza,
  User,
  Mail,
  Lock,
  BadgeCheck,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Muhammad Ali");
  const [email, setEmail] = useState("cashier@pizzashop.com");
  const [password, setPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");
  const [role, setRole] = useState("Cashier");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Static dummy navigation - no real logic
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 py-10">
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

        {/* Register Card */}
        <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100/80">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Create Account</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Register a new terminal worker or admin profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@business.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            {/* Role dropdown */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Staff Role <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 transition-colors duration-150 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15"
                >
                  <option value="Cashier">Cashier (Reception & POS Orders)</option>
                  <option value="Admin">Admin (Reports, Stock & Profits)</option>
                </select>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              icon={<BadgeCheck className="w-4 h-4" />}
              required
            />

            {/* Create Account Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-3 group shadow-md shadow-orange-500/20"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-4 p-2.5 rounded-xl bg-orange-50/70 border border-orange-100/80 text-center">
            <p className="text-[11px] text-orange-800">
              💡 <strong>Demo Mode:</strong> Clicking <strong>Create account</strong> will simulate registration and redirect to Login.
            </p>
          </div>

          {/* Back to Login Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
