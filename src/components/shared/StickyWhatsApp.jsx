"use client";

import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export default function StickyWhatsApp() {
  return (
    <button
      onClick={() => openWhatsApp("Hi! I'd like to place an order.")}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 active:scale-95"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
    </button>
  );
}