"use client";

import { Leaf, Palette, Truck, Clock, Award } from "lucide-react";
import features from "@/data/features";
import FadeIn from "@/components/ui/FadeIn";

const iconMap = {
  Leaf: Leaf,
  Palette: Palette,
  Truck: Truck,
  Clock: Clock,
  Award: Award,
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-chocolate-600 mt-3 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Baked With Love & Care
            </h2>
            <p className="text-chocolate-500 max-w-xl mx-auto">
              Every order is crafted with attention to detail, quality
              ingredients, and a passion for perfection.
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div key={feature.id} className="group text-center p-6 rounded-2xl hover:bg-cream-200 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cream-200 text-chocolate-600 rounded-2xl mb-5 group-hover:bg-chocolate-600 group-hover:text-cream-50 transition-all">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="text-lg font-semibold text-chocolate-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-chocolate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}