"use client";

import { useState } from "react";
import Image from "next/image";
import OrderButton from "@/components/ui/OrderButton";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = product.image_url || "";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-chocolate-100/50 w-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-100">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-cream-100 animate-pulse flex items-center justify-center z-10" />
        )}

        {/* Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🧁</span>
          </div>
        )}

        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-gold-400 text-chocolate-900 text-xs font-semibold px-3 py-1 rounded-full z-20">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-5">
        <h3
          className="text-lg font-semibold text-chocolate-700 mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {product.name}
        </h3>
        <p className="text-chocolate-400 text-sm mb-4 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-chocolate-600 font-semibold text-sm">
            {product.price}
          </span>
          <OrderButton productName={product.name} />
        </div>
      </div>
    </div>
  );
}