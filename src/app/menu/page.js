"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/menu/ProductCard";
import { fetchProducts } from "@/lib/api";

const categories = [
  { id: "all", name: "All" },
  { id: "cakes", name: "Cakes" },
  { id: "cupcakes", name: "Cupcakes" },
  { id: "pastries", name: "Pastries" },
  { id: "bread", name: "Bread" },
  { id: "savory", name: "Savory" },
  { id: "special-orders", name: "Special Orders" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      if (data) setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">
            Our Menu
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Everything We Bake
          </h1>
          <p className="text-chocolate-400 max-w-xl mx-auto">
            From daily pastries to custom celebration cakes — everything is
            made fresh with premium ingredients.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-chocolate-600 text-white"
                  : "bg-white text-chocolate-600 border border-chocolate-200 hover:border-chocolate-400"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-chocolate-400">Loading menu...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-chocolate-400 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}