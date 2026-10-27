"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Calendar, Bell, ChevronDown, UserCircle2 } from "lucide-react";

export function Topbar({ onMenuClick = () => {} }) {
  const pathname = usePathname();

  const getPageInfo = () => {
    if (pathname?.startsWith("/admin")) {
      return {
        title: "Admin Dashboard",
        subtitle: "Overview of sales, expenses, stock & profit metrics",
      };
    }
    return {
      title: "Reception POS",
      subtitle: "Order punch desk & customer counter",
    };
  };

  const { title, subtitle } = getPageInfo();

  // Static formatted date for clean SSR consistency or client display
  const formattedDate = "Tuesday, Oct 28, 2026";

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Hamburger button (mobile) + Page Titles */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="hidden sm:block text-xs text-slate-500 font-normal">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Date badge + Notifications + User Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Date display */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-orange-500" />
          <span>{formattedDate}</span>
        </div>

        {/* Quick notification icon (demo only) */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User profile */}
        <div className="flex items-center gap-2.5 pl-1 py-1 pr-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs sm:text-sm border border-orange-200 shadow-xs">
              DU
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-none">
              Demo User
            </p>
            <span className="text-[10px] text-slate-500 font-medium">
              Shift Manager
            </span>
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
