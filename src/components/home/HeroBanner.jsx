"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";
import { fetchHero } from "@/lib/api";
import Link from "next/link";

export default function HeroBanner() {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState({
    headline: "Freshly Baked Cakes, Pastries & Treats Made With Love",
    subheadline: "Custom cakes, daily pastries, and desserts for birthdays, weddings, and special moments.",
    hero_image_url: "",
  });

  useEffect(() => {
    async function load() {
      const data = await fetchHero();
      if (data) setHero(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-chocolate-900">
      {/* Background Image - only show when loaded */}
      {!loading && hero.hero_image_url && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${hero.hero_image_url}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-chocolate-900/80 via-chocolate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-transparent" />
        </div>
      )}

      {/* Fallback gradient when no image */}
      {(!hero.hero_image_url || loading) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-chocolate-800 to-chocolate-900" />
      )}

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-cream-50/20 backdrop-blur-sm border border-cream-50/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-cream-100 text-sm font-medium">Open for Orders</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {hero.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-lg md:text-xl text-cream-200 mb-10 leading-relaxed max-w-xl"
          >
            {hero.subheadline}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => openWhatsApp("Hi! I'd like to place an order.")}
              className="group bg-gold-400 text-chocolate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40"
            >
              Order on WhatsApp
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/menu"
              className="border-2 border-cream-50 text-cream-50 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream-50 hover:text-chocolate-900 transition-all text-center"
            >
              View Menu
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-6 mt-12 text-cream-200 text-sm"
          >
            <div className="flex items-center gap-2"><span className="text-gold-400">★</span><span>4.9 Rating</span></div>
            <div className="flex items-center gap-2"><span className="text-gold-400">🎂</span><span>Custom Orders</span></div>
            <div className="flex items-center gap-2"><span className="text-gold-400">🚚</span><span>Local Delivery</span></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cream-50/40 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 bg-cream-50/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}