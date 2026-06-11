"use client";

import { useState } from "react";
import { Cake, Users, Palette, Calendar, MessageSquare, Send } from "lucide-react";
import { orderCustomCake } from "@/lib/whatsapp";

const occasions = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Corporate Event",
  "Other",
];

const flavors = [
  "Chocolate",
  "Vanilla",
  "Red Velvet",
  "Lemon",
  "Strawberry",
  "Carrot",
  "Marble",
  "Not Sure Yet",
];

export default function CustomCakePage() {
  const [formData, setFormData] = useState({
    occasion: "",
    guests: "",
    flavor: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    orderCustomCake(formData);
  };

  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">
            Special Orders
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Order a Custom Cake
          </h1>
          <p className="text-chocolate-400 max-w-2xl mx-auto">
            Tell us what you&apos;re celebrating and we&apos;ll create a cake
            that&apos;s as special as the occasion. Fill out the form below and
            we&apos;ll chat on WhatsApp to finalize the details.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl p-5 text-center border border-chocolate-100">
              <Cake size={28} className="text-chocolate-500 mx-auto mb-2" />
              <h3 className="font-semibold text-chocolate-700 text-sm">
                Custom Design
              </h3>
              <p className="text-chocolate-400 text-xs mt-1">
                Share your vision
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border border-chocolate-100">
              <Users size={28} className="text-chocolate-500 mx-auto mb-2" />
              <h3 className="font-semibold text-chocolate-700 text-sm">
                Any Size
              </h3>
              <p className="text-chocolate-400 text-xs mt-1">
                From 6 to 200 guests
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border border-chocolate-100">
              <Palette size={28} className="text-chocolate-500 mx-auto mb-2" />
              <h3 className="font-semibold text-chocolate-700 text-sm">
                Your Flavors
              </h3>
              <p className="text-chocolate-400 text-xs mt-1">
                Multiple options available
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-10 border border-chocolate-100 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Occasion */}
              <div>
                <label
                  htmlFor="occasion"
                  className="block text-chocolate-700 font-medium mb-2 text-sm"
                >
                  What&apos;s the occasion?
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 bg-cream-50 focus:outline-none focus:border-chocolate-400 transition-colors text-sm"
                >
                  <option value="">Select occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label
                  htmlFor="guests"
                  className="block text-chocolate-700 font-medium mb-2 text-sm"
                >
                  Number of guests
                </label>
                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400"
                  />
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="e.g. 25"
                    min="1"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 bg-cream-50 focus:outline-none focus:border-chocolate-400 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Preferred Flavor */}
              <div>
                <label
                  htmlFor="flavor"
                  className="block text-chocolate-700 font-medium mb-2 text-sm"
                >
                  Preferred flavor
                </label>
                <select
                  id="flavor"
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 bg-cream-50 focus:outline-none focus:border-chocolate-400 transition-colors text-sm"
                >
                  <option value="">Select flavor</option>
                  {flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-chocolate-700 font-medium mb-2 text-sm"
                >
                  Event date
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400"
                  />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 bg-cream-50 focus:outline-none focus:border-chocolate-400 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-6">
              <label
                htmlFor="notes"
                className="block text-chocolate-700 font-medium mb-2 text-sm"
              >
                Design ideas or special requests
              </label>
              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-3 top-4 text-chocolate-400"
                />
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your dream cake — colors, theme, any allergies, etc."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-chocolate-200 text-chocolate-700 bg-cream-50 focus:outline-none focus:border-chocolate-400 transition-colors text-sm resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 bg-chocolate-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-chocolate-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Send size={20} />
              Get Your Quote on WhatsApp
            </button>

            <p className="text-center text-chocolate-400 text-xs mt-4">
              After submitting, you&apos;ll be redirected to WhatsApp where
              we&apos;ll discuss pricing and finalize your order.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}