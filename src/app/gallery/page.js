"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { fetchGallery } from "@/lib/api";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchGallery();
      if (data) setImages(data);
    }
    load();
  }, []);

  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">Gallery</span>
          <h1 className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Creations
          </h1>
          <p className="text-chocolate-400 max-w-xl mx-auto">
            A collection of our favorite bakes. Every photo is a real creation made in our kitchen.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-cream-200 cursor-pointer"
            >
              <Image
                src={image.image_url || "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80"}
                alt={image.alt || "Gallery image"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-chocolate-900/0 group-hover:bg-chocolate-900/40 transition-all duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 bg-chocolate-900/90 flex items-center justify-center p-4">
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white p-2 hover:text-cream-200 transition-colors" aria-label="Close">
            <X size={32} />
          </button>
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.alt || "Gallery image"}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              unoptimized
            />
          </div>
          <p className="absolute bottom-4 text-white text-center font-medium">
            {selectedImage.category} — {selectedImage.alt}
          </p>
        </div>
      )}
    </main>
  );
}