"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Minus,
  CheckCircle2,
  Search,
  Clock,
  Sparkles,
  ShoppingBag,
  Utensils,
  Flame,
  Check,
  ChevronDown,
  Pizza,
  Layers,
  Coffee,
  Tag,
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export default function ReceptionPage() {
  // Master catalog of products across multiple categories
  const fullCatalog = [
    // PIZZA CATEGORY
    {
      id: "p1",
      name: "Chicken Tikka Pizza",
      price: 1150,
      category: "Pizza",
      tag: "Best Seller",
      bgColor: "from-rose-400/20 to-orange-400/20",
      emoji: "🍕",
      desc: "Smoky chicken chunks, onion rings, mozzarella & tikka sauce.",
    },
    {
      id: "p2",
      name: "Fajita Feast Pizza",
      price: 1200,
      category: "Pizza",
      tag: "Chef Special",
      bgColor: "from-amber-400/20 to-rose-400/20",
      emoji: "🍕",
      desc: "Marinated fajita chicken, green bell peppers & jalapeños.",
    },
    {
      id: "p3",
      name: "Pepperoni Passion",
      price: 1250,
      category: "Pizza",
      tag: "Classic Italian",
      bgColor: "from-red-400/20 to-amber-400/20",
      emoji: "🍕",
      desc: "Loaded beef pepperoni slices over rich herb marinara cheese.",
    },
    {
      id: "p4",
      name: "Margherita Cheese",
      price: 950,
      category: "Pizza",
      tag: "Pure Mozzarella",
      bgColor: "from-yellow-400/20 to-orange-400/20",
      emoji: "🧀",
      desc: "Double mozzarella cheese blend, fresh basil & oregano dust.",
    },
    {
      id: "p5",
      name: "BBQ Supreme Pizza",
      price: 1280,
      category: "Pizza",
      tag: "Smoky & Sweet",
      bgColor: "from-orange-400/20 to-red-400/20",
      emoji: "🍖",
      desc: "Charcoal BBQ chicken shreds, sweet corn & BBQ drizzle.",
    },

    // BURGERS CATEGORY
    {
      id: "b1",
      name: "Classic Zinger Burger",
      price: 520,
      category: "Burgers",
      tag: "Crispy Crunch",
      bgColor: "from-amber-400/20 to-yellow-400/20",
      emoji: "🍔",
      desc: "Deep fried battered chicken fillet, iceberg lettuce & mayo.",
    },
    {
      id: "b2",
      name: "Double Smash Beef Burger",
      price: 750,
      category: "Burgers",
      tag: "Gourmet Beef",
      bgColor: "from-red-400/20 to-orange-400/20",
      emoji: "🍔",
      desc: "Two seared beef patties, American cheese slice & secret relish.",
    },
    {
      id: "b3",
      name: "Smoky BBQ Chicken Burger",
      price: 580,
      category: "Burgers",
      tag: "Smoky Glaze",
      bgColor: "from-orange-400/20 to-rose-400/20",
      emoji: "🍔",
      desc: "Flame grilled chicken breast basted in hickory smoked sauce.",
    },
    {
      id: "b4",
      name: "Mushroom Melt Burger",
      price: 680,
      category: "Burgers",
      tag: "Creamy Mushroom",
      bgColor: "from-amber-400/20 to-stone-400/20",
      emoji: "🍄",
      desc: "Beef patty with sautéed garlic button mushrooms & Swiss cheese.",
    },

    // FRIES CATEGORY
    {
      id: "f1",
      name: "Classic Fries",
      price: 280,
      category: "Fries",
      tag: "Crispy & Salted",
      bgColor: "from-amber-400/20 to-orange-400/20",
      emoji: "🍟",
      desc: "Golden potato straws lightly salted and freshly crisp.",
    },
    {
      id: "f2",
      name: "Masala Fries",
      price: 320,
      category: "Fries",
      tag: "Desi Spice",
      bgColor: "from-red-400/20 to-orange-400/20",
      emoji: "🌶️",
      desc: "Tossed in fiery chaat masala blend with lemon zest.",
    },
    {
      id: "f3",
      name: "Cheese Fries",
      price: 450,
      category: "Fries",
      tag: "Melted Cheddar",
      bgColor: "from-yellow-400/20 to-amber-400/20",
      emoji: "🧀",
      desc: "Smothered in creamy warm melted cheddar cheese sauce.",
    },
    {
      id: "f4",
      name: "Peri Peri Fries",
      price: 380,
      category: "Fries",
      tag: "Tangy Kick",
      bgColor: "from-orange-400/20 to-rose-400/20",
      emoji: "🔥",
      desc: "Shaken with authentic African bird eye peri peri dust.",
    },
    {
      id: "f5",
      name: "Curly Fries",
      price: 420,
      category: "Fries",
      tag: "Seasoned Spirals",
      bgColor: "from-amber-400/20 to-yellow-400/20",
      emoji: "🌀",
      desc: "Spiral cut potatoes seasoned with onion & garlic paprika powder.",
    },
    {
      id: "f6",
      name: "Loaded Fries",
      price: 590,
      category: "Fries",
      tag: "Chicken & Jalapeño",
      bgColor: "from-rose-400/20 to-red-400/20",
      emoji: "🥓",
      desc: "Topped with diced chicken chunks, jalapeños & signature dips.",
    },

    // BEVERAGES & DESSERTS
    {
      id: "d1",
      name: "Cold Soft Drink (500ml)",
      price: 120,
      category: "Drinks",
      tag: "Chilled",
      bgColor: "from-sky-400/20 to-blue-400/20",
      emoji: "🥤",
      desc: "Choice of chilled Cola, Lemon soda or Orange fizzy can.",
    },
    {
      id: "d2",
      name: "Mint Margarita Lemonade",
      price: 240,
      category: "Drinks",
      tag: "Refreshing",
      bgColor: "from-emerald-400/20 to-teal-400/20",
      emoji: "🍹",
      desc: "Fresh crushed mint leaves, lemon juice, black salt & soda.",
    },
    {
      id: "d3",
      name: "Choco Lava Cake",
      price: 380,
      category: "Drinks",
      tag: "Warm Dessert",
      bgColor: "from-amber-400/20 to-rose-400/20",
      emoji: "🍫",
      desc: "Decadent dark chocolate molten center sponge cake.",
    },
  ];

  // Extra Dip Options with prices
  const dipOptions = [
    { name: "No Extra Dip", price: 0 },
    { name: "Garlic Mayo Dip", price: 50 },
    { name: "Chipotle Spicy Dip", price: 60 },
    { name: "Melted Cheese Dip", price: 70 },
    { name: "Honey Mustard Dip", price: 50 },
    { name: "Smoky BBQ Dip", price: 50 },
    { name: "Extra Cheese Slice / Topping", price: 90 },
  ];

  const categories = ["All Items", "Pizza", "Burgers", "Fries", "Drinks"];

  // States
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");

  // Add Order Form States (3 inputs)
  const [selectedItemName, setSelectedItemName] = useState("Chicken Tikka Pizza");
  const [quantity, setQuantity] = useState(1);
  const [selectedDip, setSelectedDip] = useState("No Extra Dip");
  const [orderCounter, setOrderCounter] = useState(101);
  const [successBanner, setSuccessBanner] = useState("");

  // Orders list
  const [ordersList, setOrdersList] = useState([
    {
      orderNo: "#100",
      timestamp: "12:42 PM",
      category: "Pizza",
      item: "Chicken Tikka Pizza",
      quantity: 1,
      dip: "Garlic Mayo Dip",
      total: 1200,
      status: "Completed",
      variant: "success",
    },
    {
      orderNo: "#099",
      timestamp: "12:35 PM",
      category: "Burgers",
      item: "Classic Zinger Burger",
      quantity: 2,
      dip: "Chipotle Spicy Dip",
      total: 1100,
      status: "Completed",
      variant: "success",
    },
    {
      orderNo: "#098",
      timestamp: "12:18 PM",
      category: "Fries",
      item: "Loaded Fries",
      quantity: 1,
      dip: "No Extra Dip",
      total: 590,
      status: "Completed",
      variant: "success",
    },
    {
      orderNo: "#097",
      timestamp: "11:55 AM",
      category: "Fries",
      item: "Masala Fries",
      quantity: 2,
      dip: "Garlic Mayo Dip",
      total: 690,
      status: "Completed",
      variant: "success",
    },
  ]);

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return fullCatalog.filter((item) => {
      const matchesCategory =
        activeCategory === "All Items" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Helper to find selected product details
  const selectedProduct = useMemo(() => {
    return (
      fullCatalog.find(
        (p) => p.name.toLowerCase() === selectedItemName.toLowerCase()
      ) || fullCatalog[0]
    );
  }, [selectedItemName]);

  const unitPrice = selectedProduct?.price || 350;

  // Helper for dip price
  const dipPrice = useMemo(() => {
    const dip = dipOptions.find((d) => d.name === selectedDip);
    return dip ? dip.price : 0;
  }, [selectedDip]);

  // Live calculated total
  const calculatedTotal = unitPrice * Number(quantity || 1) + dipPrice;

  // Add Order handler
  const handleAddOrder = (e) => {
    if (e) e.preventDefault();

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newOrder = {
      orderNo: `#${orderCounter}`,
      timestamp: formattedTime,
      category: selectedProduct.category,
      item: selectedItemName,
      quantity: Number(quantity || 1),
      dip: selectedDip,
      total: calculatedTotal,
      status: "Completed",
      variant: "success",
    };

    setOrdersList([newOrder, ...ordersList]);
    setOrderCounter((prev) => prev + 1);

    // Show temporary confirmation toast
    setSuccessBanner(
      `Order #${orderCounter} (${selectedItemName} x${quantity}) added! Total: Rs. ${calculatedTotal}`
    );
    setTimeout(() => {
      setSuccessBanner("");
    }, 4500);
  };

  // Click on product card to auto-select into Add Order Box
  const handleCardClick = (product) => {
    setSelectedItemName(product.name);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Reception POS</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
              Multi-Category Terminal
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Order placement across Pizza, Burgers, Fries & Drinks with automated total calculation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="success" size="md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
            POS Live
          </Badge>
          <Badge variant="primary" size="md">
            Total Orders: {ordersList.length}
          </Badge>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: Catalog Grid (Left) + Add Order Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Product Catalog with Multi-Category Filtering */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Category Tabs & Quick Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* PRODUCT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((item) => {
              const isSelected =
                selectedItemName.toLowerCase() === item.name.toLowerCase();

              return (
                <Card
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`group overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-2 border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/10"
                      : "border-slate-100 hover:border-orange-200"
                  }`}
                >
                  <div>
                    {/* Placeholder Banner & Emoji */}
                    <div
                      className={`h-32 sm:h-34 w-full bg-gradient-to-br ${item.bgColor} flex flex-col items-center justify-center relative p-3 border-b border-slate-100 group-hover:scale-[1.01] transition-transform`}
                    >
                      <span className="text-4xl sm:text-5xl drop-shadow-sm select-none">
                        {item.emoji}
                      </span>
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 shadow-xs">
                        {item.tag}
                      </span>
                      <span className="absolute bottom-2 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/70 text-white">
                        {item.category}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-xs">
                          Active Selection
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Price & Selection Button */}
                  <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-slate-50">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Price
                      </span>
                      <span className="text-base font-extrabold text-slate-900">
                        Rs. {item.price}
                      </span>
                    </div>

                    <Button
                      variant={isSelected ? "primary" : "secondary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(item);
                      }}
                      className="h-9 px-3 gap-1.5 rounded-xl font-bold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isSelected ? "Selected" : "Select"}</span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 text-sm">
                No items found matching your filter or search query.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: "Add Order" Box (Category-grouped item selector, quantity, extra dip) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="border-orange-200/90 shadow-xl shadow-orange-500/5 sticky top-20 overflow-hidden">
            {/* Header */}
            <CardHeader className="p-4 pb-3 border-b border-orange-100 bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-extrabold text-slate-900 leading-tight">
                      Add Order
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      Multi-category order punch box
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-orange-100 text-orange-700">
                    #{orderCounter}
                  </span>
                </div>
              </div>
            </CardHeader>

            {/* Notification Toast */}
            {successBanner && (
              <div className="mx-4 mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{successBanner}</span>
              </div>
            )}

            {/* 3 Input Fields Form */}
            <form onSubmit={handleAddOrder} className="p-4 sm:p-5 space-y-4">
              {/* FIELD 1: Item Name (Grouped cleanly by Category) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    1. Item Name <span className="text-orange-600">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15 cursor-pointer"
                  >
                    <optgroup label="🍕 Pizzas">
                      {fullCatalog
                        .filter((p) => p.category === "Pizza")
                        .map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — Rs. {p.price}
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="🍔 Burgers">
                      {fullCatalog
                        .filter((p) => p.category === "Burgers")
                        .map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — Rs. {p.price}
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="🍟 Fries & Sides">
                      {fullCatalog
                        .filter((p) => p.category === "Fries")
                        .map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — Rs. {p.price}
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="🥤 Drinks & Desserts">
                      {fullCatalog
                        .filter((p) => p.category === "Drinks")
                        .map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — Rs. {p.price}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 px-0.5">
                  <span>Unit price: <strong>Rs. {unitPrice}</strong></span>
                  <span>Click any card on left to pick</span>
                </div>
              </div>

              {/* FIELD 2: Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  2. Quantity <span className="text-orange-600">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 active:scale-95 transition-all cursor-pointer font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full text-center bg-transparent text-base font-extrabold text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 active:scale-95 transition-all cursor-pointer font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 px-0.5">
                  Subtotal: Rs. {unitPrice} × {quantity} ={" "}
                  <strong>Rs. {unitPrice * quantity}</strong>
                </div>
              </div>

              {/* FIELD 3: Extra Dip / Add-on */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  3. Extra Dip / Add-on
                </label>
                <div className="relative">
                  <select
                    value={selectedDip}
                    onChange={(e) => setSelectedDip(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15 cursor-pointer"
                  >
                    {dipOptions.map((dip) => (
                      <option key={dip.name} value={dip.name}>
                        {dip.name} {dip.price > 0 ? `(+Rs. ${dip.price})` : "(Included)"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-[11px] text-slate-400 px-0.5 block">
                  Add-on cost: <strong>Rs. {dipPrice}</strong>
                </span>
              </div>

              {/* LIVE TOTAL CALCULATION BOX */}
              <div className="pt-3 pb-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/90 shadow-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] font-extrabold text-orange-800 uppercase tracking-wider block">
                      Automatic Total
                    </span>
                    <span className="text-xs text-slate-600 font-medium truncate block max-w-[190px]">
                      {quantity}x {selectedItemName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-orange-600 tracking-tight">
                      Rs. {calculatedTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 group text-base"
              >
                <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Add Order (Rs. {calculatedTotal})</span>
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* TODAY'S ORDERS TABLE WITH TIMESTAMPS & CATEGORY BADGES */}
      <Card className="mt-8">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Today&apos;s Orders List</span>
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of orders across all menu categories with exact timestamps
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              Total Logged: {ordersList.length} Orders
            </Badge>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Item Ordered</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Extra Dip / Add-on</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersList.map((order, idx) => (
              <TableRow
                key={`${order.orderNo}-${idx}`}
                className={idx === 0 ? "bg-orange-50/40" : ""}
              >
                <TableCell className="font-bold text-slate-900">
                  <span className="inline-flex items-center gap-1.5">
                    {order.orderNo}
                    {idx === 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500 text-white uppercase">
                        New
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {order.timestamp}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {order.category}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-slate-800">
                  {order.item}
                </TableCell>
                <TableCell className="font-semibold text-slate-700">
                  <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    {order.quantity}x
                  </span>
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {order.dip}
                </TableCell>
                <TableCell className="font-extrabold text-orange-600 text-sm">
                  Rs. {order.total}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={order.variant || "success"} size="sm">
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
