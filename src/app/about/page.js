"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Users, Target } from "lucide-react";
import { fetchHero } from "@/lib/api";

export default function AboutPage() {
  const [about, setAbout] = useState({
    story_title: "How It All Started",
    story_text: "Sweet Delights Bakery started in a small home kitchen with one simple belief: everyone deserves cake that tastes as good as it looks.\n\nWhat began as baking birthday cakes for friends and family quickly grew into something bigger. Neighbors started asking, then friends of neighbors, then their coworkers.\n\nToday, we bake from our shop, serving our community with the same love and care that started it all.",
    founder_image_url: "",
    kitchen_image_url: "",
  });

  useEffect(() => {
    async function load() {
      const data = await fetchHero();
      if (data) {
        setAbout({
          story_title: data.story_title || "How It All Started",
          story_text: data.story_text || about.story_text,
          founder_image_url: data.founder_image_url || "",
          kitchen_image_url: data.kitchen_image_url || "",
        });
      }
    }
    load();
  }, []);

  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">About Us</span>
          <h1 className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Story
          </h1>
          <p className="text-chocolate-400 max-w-xl mx-auto">People buy from people. Here&apos;s the heart behind every bake.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200">
              {about.founder_image_url ? (
                <Image src={about.founder_image_url} alt="Founder" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-chocolate-300">Founder photo</div>
              )}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-chocolate-600 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {about.story_title}
              </h2>
              <div className="space-y-4 text-chocolate-500 leading-relaxed">
                {about.story_text.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Heart size={32} className="text-rose-400 mx-auto mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-2">Made With Love</h3>
              <p className="text-chocolate-400 text-sm">Every recipe is crafted with care, using techniques perfected over years of baking.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Users size={32} className="text-chocolate-500 mx-auto mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-2">Community First</h3>
              <p className="text-chocolate-400 text-sm">We&apos;re proud to be part of this neighborhood, serving generations of families.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Target size={32} className="text-gold-400 mx-auto mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-2">Quality Always</h3>
              <p className="text-chocolate-400 text-sm">We never compromise on ingredients. Real butter, fresh eggs, premium chocolate — always.</p>
            </div>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-cream-200">
            {about.kitchen_image_url ? (
              <Image src={about.kitchen_image_url} alt="Kitchen" fill className="object-cover" sizes="100vw" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-chocolate-300">Kitchen photo</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}