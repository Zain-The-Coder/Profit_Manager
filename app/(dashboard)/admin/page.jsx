"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Plus,
  Flame,
  Wallet,
  Building,
  Zap,
  Droplets,
  Boxes,
  Wrench,
  Trash2,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3,
  HelpCircle,
  FileText,
  BadgePercent,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedMonth, setSelectedMonth] = useState("October 2026");

  // 1. BUSINESS REVENUE / EARNED (Sales)
  const [grossSales, setGrossSales] = useState(545000);

  // 2. STAFF SALARIES DATA (Purpose: Take all staff salaries, calculate total)
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Tariq Mahmood", role: "Head Chef", salary: 40000 },
    { id: 2, name: "Muhammad Hamza", role: "Pizza Maker", salary: 35000 },
    { id: 3, name: "Bilal Qureshi", role: "Fry Specialist & Cook", salary: 28000 },
    { id: 4, name: "Zubair Ahmed", role: "Cashier & Reception", salary: 25000 },
    { id: 5, name: "Usman Ali", role: "Kitchen Helper & Dispatch", salary: 22000 },
  ]);

  // Form state for adding staff
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");
  const [newStaffSalary, setNewStaffSalary] = useState("");

  // 3. MONTHLY STOCK PURCHASES (What was ordered, how much, cost)
  const [stockList, setStockList] = useState([
    {
      id: 1,
      month: "October 2026",
      date: "2026-10-04",
      item: "Mozzarella & Cheddar Cheese (Block)",
      quantity: "35 kg",
      cost: 48000,
      vendor: "Dairy Valley Supplies",
    },
    {
      id: 2,
      month: "October 2026",
      date: "2026-10-08",
      item: "Chicken Boneless Breast Fillet",
      quantity: "85 kg",
      cost: 59500,
      vendor: "Al-Madina Poultry",
    },
    {
      id: 3,
      month: "October 2026",
      date: "2026-10-12",
      item: "Cooking Fry Oil (16L Tins)",
      quantity: "6 Tins",
      cost: 36000,
      vendor: "Kisan Edible Oils",
    },
    {
      id: 4,
      month: "October 2026",
      date: "2026-10-15",
      item: "Imported Potato Frozen French Fries",
      quantity: "8 Cartons (80 kg)",
      cost: 26000,
      vendor: "Cold Chain Distributors",
    },
    {
      id: 5,
      month: "October 2026",
      date: "2026-10-18",
      item: "Pizza Dough Flour (Fine Grade 50kg)",
      quantity: "4 Bags (200 kg)",
      cost: 16500,
      vendor: "Chakwal Flour Mills",
    },
  ]);

  // Form state for adding stock purchase
  const [newStockItem, setNewStockItem] = useState("");
  const [newStockQty, setNewStockQty] = useState("");
  const [newStockCost, setNewStockCost] = useState("");
  const [newStockDate, setNewStockDate] = useState("2026-10-28");
  const [newStockVendor, setNewStockVendor] = useState("");

  // 4. UTILITIES AND MAINTENANCE (Electricity, Gas, Water, LPG cylinder, Maintenance optional)
  const [utilities, setUtilities] = useState({
    electricityBill: 34500,
    gasBill: 8200,
    waterBill: 4500,
    lpgCylinderBill: 13500,
    shopMaintenance: 5500, // Optional
  });

  // CALCULATIONS ENGINE
  // Total Staff Salaries
  const totalSalaries = useMemo(() => {
    return staffList.reduce((acc, curr) => acc + Number(curr.salary || 0), 0);
  }, [staffList]);

  // Total Stock Cost
  const totalStock = useMemo(() => {
    return stockList.reduce((acc, curr) => acc + Number(curr.cost || 0), 0);
  }, [stockList]);

  // Total Utilities & Maintenance
  const totalUtilities = useMemo(() => {
    return (
      Number(utilities.electricityBill || 0) +
      Number(utilities.gasBill || 0) +
      Number(utilities.waterBill || 0) +
      Number(utilities.lpgCylinderBill || 0) +
      Number(utilities.shopMaintenance || 0)
    );
  }, [utilities]);

  // Total Business Expenses
  const totalExpenses = totalStock + totalSalaries + totalUtilities;

  // NET PROFIT / LOSS
  const netResult = grossSales - totalExpenses;
  const isProfit = netResult >= 0;
  const profitMargin = grossSales > 0 ? ((netResult / grossSales) * 100).toFixed(1) : 0;

  // Handlers for Staff
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaffName || !newStaffSalary) return;

    const newMember = {
      id: Date.now(),
      name: newStaffName,
      role: newStaffRole || "Kitchen / Service Crew",
      salary: Number(newStaffSalary),
    };
    setStaffList([...staffList, newMember]);
    setNewStaffName("");
    setNewStaffRole("");
    setNewStaffSalary("");
  };

  const handleDeleteStaff = (id) => {
    setStaffList(staffList.filter((s) => s.id !== id));
  };

  // Handlers for Stock
  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStockItem || !newStockCost) return;

    const newStock = {
      id: Date.now(),
      month: selectedMonth,
      date: newStockDate,
      item: newStockItem,
      quantity: newStockQty || "1 Lot",
      cost: Number(newStockCost),
      vendor: newStockVendor || "Local Market Vendor",
    };
    setStockList([newStock, ...stockList]);
    setNewStockItem("");
    setNewStockQty("");
    setNewStockCost("");
    setNewStockVendor("");
  };

  const handleDeleteStock = (id) => {
    setStockList(stockList.filter((s) => s.id !== id));
  };

  // Chart Data: Expense Comparison Breakdown
  const chartData = [
    {
      category: "Gross Earned",
      amount: grossSales,
      fill: "#f97316",
    },
    {
      category: "Stock Cost",
      amount: totalStock,
      fill: "#ef4444",
    },
    {
      category: "Salaries",
      amount: totalSalaries,
      fill: "#f59e0b",
    },
    {
      category: "Utilities & Bills",
      amount: totalUtilities,
      fill: "#8b5cf6",
    },
    {
      category: isProfit ? "Net Profit" : "Net Loss",
      amount: Math.abs(netResult),
      fill: isProfit ? "#10b981" : "#dc2626",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Business Calculations & Profit Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time financial balance: Track Gross Revenue, Monthly Stock, Staff Payroll & Utility Bills.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold text-slate-600">Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="October 2026">October 2026 (Current)</option>
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
          </select>
        </div>
      </div>

      {/* MASTER PROFIT / LOSS BANNER */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border-2 transition-all shadow-md ${
          isProfit
            ? "bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/40 border-emerald-500/40"
            : "bg-gradient-to-br from-rose-500/10 via-white to-rose-50/40 border-rose-500/40"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={isProfit ? "success" : "danger"} size="md">
                {isProfit ? (
                  <TrendingUp className="w-4 h-4 mr-1 text-emerald-700" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1 text-rose-700" />
                )}
                {isProfit ? "NET PROFIT (SURPLUS)" : "NET LOSS (DEFICIT)"}
              </Badge>
              <span className="text-xs font-semibold text-slate-500">
                Period: <strong>{selectedMonth}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isProfit ? "+" : "−"}Rs. {Math.abs(netResult).toLocaleString()}
            </h2>

            <p className="text-xs text-slate-600">
              Calculation: Gross Earned (<strong>Rs. {grossSales.toLocaleString()}</strong>) −
              Total Expenses (<strong>Rs. {totalExpenses.toLocaleString()}</strong>)
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 self-start lg:self-auto">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Profit Margin
              </span>
              <span
                className={`text-lg font-black ${
                  isProfit ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {profitMargin}%
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Total Outflow
              </span>
              <span className="text-lg font-black text-slate-800">
                Rs. {totalExpenses.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Earned (Sales)
              </span>
              <span className="text-lg font-black text-orange-600">
                Rs. {grossSales.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 CORE FINANCIAL SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Sales */}
        <Card
          onClick={() => setActiveTab("overview")}
          className={`p-4 cursor-pointer hover:shadow-md transition-all ${
            activeTab === "overview" ? "border-orange-500 ring-2 ring-orange-500/15" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Total Earned
            </span>
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            Rs. {grossSales.toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Customer billings & POS takings</p>
        </Card>

        {/* Card 2: Stock Cost */}
        <Card
          onClick={() => setActiveTab("stock")}
          className={`p-4 cursor-pointer hover:shadow-md transition-all ${
            activeTab === "stock" ? "border-red-500 ring-2 ring-red-500/15" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Stock Cost (−)
            </span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-rose-600 mt-2">
            Rs. {totalStock.toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {stockList.length} Stock purchase orders
          </p>
        </Card>

        {/* Card 3: Staff Salaries */}
        <Card
          onClick={() => setActiveTab("salaries")}
          className={`p-4 cursor-pointer hover:shadow-md transition-all ${
            activeTab === "salaries" ? "border-amber-500 ring-2 ring-amber-500/15" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Staff Salaries (−)
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-amber-700 mt-2">
            Rs. {totalSalaries.toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {staffList.length} Staff members on payroll
          </p>
        </Card>

        {/* Card 4: Utilities & Maintenance */}
        <Card
          onClick={() => setActiveTab("utilities")}
          className={`p-4 cursor-pointer hover:shadow-md transition-all ${
            activeTab === "utilities" ? "border-purple-500 ring-2 ring-purple-500/15" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Utilities & Bills (−)
            </span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-purple-700 mt-2">
            Rs. {totalUtilities.toLocaleString()}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Electricity, Gas, Water & Cylinders
          </p>
        </Card>
      </div>

      {/* NAVIGATION TABS FOR SECTIONS */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          📊 Profit & Loss Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stock")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "stock"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          📦 Monthly Stock Purchases (Rs. {totalStock.toLocaleString()})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("salaries")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "salaries"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          👥 Staff Salaries (Rs. {totalSalaries.toLocaleString()})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("utilities")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "utilities"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          ⚡ Utilities & Maintenance (Rs. {totalUtilities.toLocaleString()})
        </button>
      </div>

      {/* =========================================================================
          TAB 1: PROFIT & LOSS OVERVIEW
          ========================================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Visual Financial Comparison Chart */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  <span>Business Revenue vs Outflows Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Comparison of Gross Sales against major expense buckets for {selectedMonth}
                </CardDescription>
              </div>
              <Badge variant="primary" size="md">
                Profit Margin: {profitMargin}%
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="category"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `Rs. ${val / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value) => [`Rs. ${Number(value).toLocaleString()}`, "Amount"]}
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        color: "#fff",
                        border: "none",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Gross Sales Adjuster (to simulate what-if scenarios) */}
          <Card className="p-4 sm:p-5 bg-gradient-to-r from-orange-50/40 to-white border-orange-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Update / Adjust Monthly Gross Sales
                </h4>
                <p className="text-xs text-slate-500">
                  Enter total sales collected from the counter and takeaway orders for {selectedMonth}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700">Rs.</span>
                <input
                  type="number"
                  value={grossSales}
                  onChange={(e) => setGrossSales(Number(e.target.value) || 0)}
                  className="w-40 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {}}
                  className="font-bold whitespace-nowrap"
                >
                  Recalculate
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MONTHLY STOCK SECTION (Manually entered every month)
          ========================================================================= */}
      {activeTab === "stock" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Add Stock Form */}
            <div className="lg:col-span-5">
              <Card className="border-orange-200 shadow-md">
                <CardHeader className="p-4 pb-3 border-b border-slate-100 bg-orange-50/50">
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-orange-500" />
                    <span>Enter Monthly Stock Order</span>
                  </CardTitle>
                  <CardDescription>
                    Record what raw materials were ordered, quantities, and cost for {selectedMonth}.
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleAddStock} className="p-4 sm:p-5 space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Stock Item / Material Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mozzarella Cheese, Chicken, Cooking Oil"
                      value={newStockItem}
                      onChange={(e) => setNewStockItem(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Quantity Ordered
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 50 kg, 6 Tins"
                        value={newStockQty}
                        onChange={(e) => setNewStockQty(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Purchase Cost (Rs.) <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 45000"
                        value={newStockCost}
                        onChange={(e) => setNewStockCost(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        value={newStockDate}
                        onChange={(e) => setNewStockDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Supplier / Vendor
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wholesale Market"
                        value={newStockVendor}
                        onChange={(e) => setNewStockVendor(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full font-bold shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Stock Entry</span>
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right: Stock Purchases Table */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader className="flex items-center justify-between p-4 border-b border-slate-100">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Stock Inward Log ({selectedMonth})
                    </CardTitle>
                    <CardDescription>
                      {stockList.length} total raw material purchases recorded
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Stock Expense
                    </span>
                    <span className="text-lg font-black text-rose-600">
                      Rs. {totalStock.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Material / Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Cost (Rs.)</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                          {item.date}
                        </TableCell>
                        <TableCell className="font-bold text-slate-900 text-sm">
                          {item.item}
                        </TableCell>
                        <TableCell className="text-xs font-semibold text-slate-700">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100">
                            {item.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {item.vendor}
                        </TableCell>
                        <TableCell className="font-extrabold text-rose-600">
                          Rs. {item.cost.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteStock(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete stock entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: STAFF SALARIES SECTION (Take all staff salaries, calculate total)
          ========================================================================= */}
      {activeTab === "salaries" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Add Staff Form */}
            <div className="lg:col-span-5">
              <Card className="border-orange-200 shadow-md">
                <CardHeader className="p-4 pb-3 border-b border-slate-100 bg-amber-50/50">
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <span>Add Staff Member & Salary</span>
                  </CardTitle>
                  <CardDescription>
                    Enter employee details to include in monthly staff payroll calculations.
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleAddStaff} className="p-4 sm:p-5 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Staff Member Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mahmood"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Assigned Shop Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Head Chef, Fry Cook, Cashier"
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Monthly Salary (Rs.) <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 30000"
                      value={newStaffSalary}
                      onChange={(e) => setNewStaffSalary(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full font-bold shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Payroll</span>
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right: Staff Salaries Table & Total */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader className="flex items-center justify-between p-4 border-b border-slate-100">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Staff Payroll Roster
                    </CardTitle>
                    <CardDescription>
                      {staffList.length} employees on active shop payroll
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Staff Salaries
                    </span>
                    <span className="text-lg font-black text-amber-700">
                      Rs. {totalSalaries.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Name</TableHead>
                      <TableHead>Designation / Role</TableHead>
                      <TableHead>Monthly Salary</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffList.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                              {staff.name.charAt(0)}
                            </div>
                            <span>{staff.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold text-slate-600">
                          {staff.role}
                        </TableCell>
                        <TableCell className="font-extrabold text-slate-900 text-sm">
                          Rs. {staff.salary.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove staff member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Footer total highlight */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Grand Total Staff Payroll ({staffList.length} staff):
                  </span>
                  <span className="text-base font-black text-amber-700">
                    Rs. {totalSalaries.toLocaleString()}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: UTILITIES AND MAINTENANCE SECTION
          Electricity, Gas, Water, LPG cylinder gas, Shop maintenance (optional)
          ========================================================================= */}
      {activeTab === "utilities" && (
        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 border-b border-slate-100 bg-purple-50/40">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>Utilities & Shop Maintenance Ledger</span>
                </CardTitle>
                <CardDescription>
                  Enter monthly operational bills: Electricity, Sui Gas, Water, LPG Cylinders, and Shop Maintenance.
                </CardDescription>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Total Utility Expenses
                </span>
                <span className="text-xl font-black text-purple-700">
                  Rs. {totalUtilities.toLocaleString()}
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Electricity Bill */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      1. Electricity Bill (K-Electric / WAPDA)
                    </span>
                    <Badge variant="warning" size="sm">
                      Utility
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={utilities.electricityBill}
                      onChange={(e) =>
                        setUtilities({
                          ...utilities,
                          electricityBill: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Monthly power consumption bill
                  </span>
                </div>

                {/* 2. Gas Bill (Sui Gas) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-red-500" />
                      2. Sui Gas Bill (Pipeline)
                    </span>
                    <Badge variant="danger" size="sm">
                      Utility
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={utilities.gasBill}
                      onChange={(e) =>
                        setUtilities({
                          ...utilities,
                          gasBill: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Oven & stove pipeline meter charges
                  </span>
                </div>

                {/* 3. Water Bill */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-sky-500" />
                      3. Water Bill / Tankers
                    </span>
                    <Badge variant="info" size="sm">
                      Utility
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={utilities.waterBill}
                      onChange={(e) =>
                        setUtilities({
                          ...utilities,
                          waterBill: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    WASA line + commercial water tankers
                  </span>
                </div>

                {/* 4. LPG Cylinder Gas Bill */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-600" />
                      4. LPG Cylinder Gas Bill
                    </span>
                    <Badge variant="primary" size="sm">
                      Fuel
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={utilities.lpgCylinderBill}
                      onChange={(e) =>
                        setUtilities({
                          ...utilities,
                          lpgCylinderBill: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Commercial cylinder refills for deep fryers
                  </span>
                </div>

                {/* 5. Shop Maintenance (Optional) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-slate-500" />
                      5. Shop Maintenance <span className="text-slate-400 font-normal">(Optional)</span>
                    </span>
                    <Badge variant="neutral" size="sm">
                      Optional
                    </Badge>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={utilities.shopMaintenance}
                      onChange={(e) =>
                        setUtilities({
                          ...utilities,
                          shopMaintenance: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Fryer servicing, AC repair, plumbing fixes
                  </span>
                </div>
              </div>

              {/* Total Calculation Card */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-purple-900">
                    Total Utilities & Maintenance Sum
                  </h4>
                  <p className="text-xs text-purple-700">
                    Electricity (Rs. {utilities.electricityBill}) + Gas (Rs. {utilities.gasBill}) + Water (Rs. {utilities.waterBill}) + LPG (Rs. {utilities.lpgCylinderBill}) + Maintenance (Rs. {utilities.shopMaintenance})
                  </p>
                </div>
                <span className="text-2xl font-black text-purple-800">
                  Rs. {totalUtilities.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">
          Loading business calculations...
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
