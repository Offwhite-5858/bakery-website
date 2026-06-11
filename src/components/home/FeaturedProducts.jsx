"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import { fetchProducts } from "@/lib/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      if (data) {
        const featured = data.filter((p) => p.featured).slice(0, 6);
        setProducts(featured);
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">
              Our Bestsellers
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-chocolate-600 mt-3 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Most Loved Treats
            </h2>
            <p className="text-chocolate-400 max-w-xl mx-auto">
              The ones our customers keep coming back for. Freshly baked every single day.
            </p>
          </div>
        </FadeIn>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-chocolate-400">
            Loading products...
          </div>
        )}

        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-chocolate-600 hover:text-chocolate-400 font-medium transition-colors group"
            >
              View Full Menu
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}