"use client";

import { ShoppingBag } from "lucide-react";
import { orderProduct } from "@/lib/whatsapp";

export default function OrderButton({ productName, className = "" }) {
  return (
    <button
      onClick={() => orderProduct(productName)}
      className={`flex items-center justify-center gap-2 bg-chocolate-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-chocolate-700 transition-all active:scale-95 ${className}`}
    >
      <ShoppingBag size={16} />
      Order Now
    </button>
  );
}