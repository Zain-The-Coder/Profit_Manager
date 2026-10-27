"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  UtensilsCrossed,
  LayoutDashboard,
  LogOut,
  Pizza,
  X,
  Store,
  Boxes,
  Users,
  Zap,
  TrendingUp,
} from "lucide-react";

export function Sidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const isReception = pathname === "/reception";
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-slate-200/80 shadow-sm transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-900 tracking-tight leading-none">
                Profit Manager
              </h1>
              <span className="text-[11px] font-medium text-orange-600 inline-flex items-center gap-1 mt-0.5">
                <Store className="w-3 h-3" /> Pizza & Fast Food
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-5 px-3 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Operations & POS
            </p>
          </div>

          {/* Reception Link */}
          <Link
            href="/reception"
            onClick={onClose}
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isReception
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                : "text-slate-600 hover:bg-orange-50/60 hover:text-orange-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <UtensilsCrossed
                className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                  isReception
                    ? "text-white"
                    : "text-slate-400 group-hover:text-orange-500"
                }`}
              />
              <span>Reception POS</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isReception
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-700"
              }`}
            >
              Counter
            </span>
          </Link>

          <div className="px-3 mt-5 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Business Calculations
            </p>
          </div>

          {/* Admin Dashboard (Overview) */}
          <Link
            href="/admin"
            onClick={onClose}
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isAdmin
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                : "text-slate-600 hover:bg-orange-50/60 hover:text-orange-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard
                className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                  isAdmin
                    ? "text-white"
                    : "text-slate-400 group-hover:text-orange-500"
                }`}
              />
              <span>Profit Dashboard</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isAdmin
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-700"
              }`}
            >
              P&L
            </span>
          </Link>

          {/* Submodules Quick Links under Admin */}
          <div className="pl-4 pr-1 py-1 space-y-1">
            <Link
              href="/admin?tab=stock"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 transition-colors"
            >
              <Boxes className="w-4 h-4 text-slate-400" />
              <span>Monthly Stock</span>
            </Link>

            <Link
              href="/admin?tab=salaries"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 transition-colors"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Staff Salaries</span>
            </Link>

            <Link
              href="/admin?tab=utilities"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 transition-colors"
            >
              <Zap className="w-4 h-4 text-slate-400" />
              <span>Utilities & Bills</span>
            </Link>
          </div>
        </div>

        {/* Business Balance Summary Card */}
        <div className="p-3 mx-3 mb-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500">
              Calculation Mode
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Active
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-800 mt-1">
            Pure P&L Ledger
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Earned − (Stock + Salary + Bills)
          </p>
        </div>

        {/* Logout Section */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
