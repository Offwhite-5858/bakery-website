"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { fetchContact } from "@/lib/api";
import siteConfig from "@/data/siteConfig";

export default function CTASection() {
  const [whatsapp, setWhatsapp] = useState(siteConfig.contact.whatsapp);

  useEffect(() => {
    async function load() {
      const data = await fetchContact();
      if (data?.whatsapp) setWhatsapp(data.whatsapp);
    }
    load();
  }, []);

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-chocolate-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>
      <div className="container-custom relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-cream-50/10 backdrop-blur-sm border border-cream-50/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-cream-100 text-sm font-medium">Now Taking Orders</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready To Place Your Order?
          </h2>
          <p className="text-cream-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether it&apos;s a birthday cake, weekend pastries, or a special celebration — we&apos;re here to make it delicious.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWhatsApp("Hi! I'm ready to place an order.")}
            className="group bg-gold-400 text-chocolate-900 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gold-300 transition-all inline-flex items-center gap-2 shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40"
          >
            Chat With Us On WhatsApp
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-cream-300 text-sm mt-6">🕐 Order before 3 PM for next-day pickup</p>
        </FadeIn>
      </div>
    </section>
  );
}