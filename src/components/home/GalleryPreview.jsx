"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { fetchGallery } from "@/lib/api";

export default function GalleryPreview() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchGallery();
      if (data) setImages(data.slice(0, 6));
    }
    load();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">Our Work</span>
            <h2 className="text-3xl md:text-5xl font-bold text-chocolate-600 mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Fresh From The Oven
            </h2>
            <p className="text-chocolate-400 max-w-xl mx-auto">
              Every creation is made with love. Here&apos;s a peek at what we&apos;ve been baking.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <FadeIn key={image.id} delay={index * 0.1}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-200 cursor-pointer">
                <Image
                  src={image.image_url || "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80"}
                  alt={image.alt || "Bakery item"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-chocolate-900/0 group-hover:bg-chocolate-900/30 transition-all duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {image.category}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-10">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-chocolate-600 hover:text-chocolate-400 font-medium transition-colors group">
              View Full Gallery
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}