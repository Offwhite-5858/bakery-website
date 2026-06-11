"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import FadeIn from "@/components/ui/FadeIn";
import { fetchTestimonials } from "@/lib/api";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const total = testimonials.length;

  useEffect(() => {
    async function load() {
      const data = await fetchTestimonials();
      if (data) setTestimonials(data);
    }
    load();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || total === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % total);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-chocolate-800">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold-400 font-medium text-sm tracking-widest uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold text-cream-50 mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              What Our Customers Say
            </h2>
            <p className="text-cream-200 max-w-xl mx-auto">
              Don&apos;t just take our word for it — hear from the people who taste the difference.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <div className="bg-chocolate-700/50 backdrop-blur-sm border border-chocolate-600 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <Quote size={40} className="text-gold-400/30 mx-auto mb-4" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-cream-100 text-lg md:text-xl leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current]?.text}&rdquo;
                </p>
                <div className="flex justify-center mb-4">
                  <StarRating rating={testimonials[current]?.rating || 5} size={18} />
                </div>
                <p className="text-cream-50 font-semibold">{testimonials[current]?.name}</p>
                <p className="text-cream-300 text-sm">{testimonials[current]?.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={goPrev} className="p-2 text-cream-300 hover:text-cream-50 transition-colors" aria-label="Previous review">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === current ? "bg-gold-400 w-6" : "bg-chocolate-500 hover:bg-chocolate-400"}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            <button onClick={goNext} className="p-2 text-cream-300 hover:text-cream-50 transition-colors" aria-label="Next review">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}