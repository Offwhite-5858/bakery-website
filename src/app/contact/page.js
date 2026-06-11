"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { fetchContact, fetchHours } from "@/lib/api";

export default function ContactPage() {
  const [contact, setContact] = useState({
    whatsapp: "", phone: "", email: "", address: "",
  });
  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function load() {
      const [contactData, hoursData] = await Promise.all([fetchContact(), fetchHours()]);
      if (contactData) setContact(contactData);
      if (hoursData) setHours(hoursData);
    }
    load();
  }, []);

  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">Contact</span>
          <h1 className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Get In Touch
          </h1>
          <p className="text-chocolate-400 max-w-xl mx-auto">
            We&apos;d love to hear from you. Reach out and we&apos;ll respond as quickly as we can.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 rounded-2xl p-6 border border-green-200 hover:bg-green-100 transition-colors group">
              <MessageCircle size={32} className="text-green-500 mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-1">WhatsApp</h3>
              <p className="text-chocolate-400 text-sm mb-2">Fastest way to order</p>
              <span className="text-green-600 font-medium text-sm group-hover:underline">Chat with us →</span>
            </a>

            <a href={`tel:${contact.phone}`} className="bg-cream-100 rounded-2xl p-6 border border-cream-200 hover:bg-cream-200 transition-colors group">
              <Phone size={32} className="text-chocolate-500 mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-1">Phone</h3>
              <p className="text-chocolate-400 text-sm mb-2">Call us directly</p>
              <span className="text-chocolate-600 font-medium text-sm group-hover:underline">{contact.phone}</span>
            </a>

            <a href={`mailto:${contact.email}`} className="bg-cream-100 rounded-2xl p-6 border border-cream-200 hover:bg-cream-200 transition-colors group">
              <Mail size={32} className="text-chocolate-500 mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-1">Email</h3>
              <p className="text-chocolate-400 text-sm mb-2">Send us a message</p>
              <span className="text-chocolate-600 font-medium text-sm group-hover:underline">{contact.email}</span>
            </a>

            <div className="bg-cream-100 rounded-2xl p-6 border border-cream-200">
              <MapPin size={32} className="text-chocolate-500 mb-3" />
              <h3 className="font-semibold text-chocolate-700 mb-1">Location</h3>
              <p className="text-chocolate-400 text-sm">{contact.address}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-chocolate-100">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={24} className="text-chocolate-500" />
              <h2 className="text-xl font-bold text-chocolate-600">Opening Hours</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {hours.map((h) => (
                <div key={h.id}>
                  <p className="font-medium text-chocolate-700 capitalize">{h.day}</p>
                  <p className="text-chocolate-400">{h.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}