"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import navigation from "@/data/navigation";
import { openWhatsApp } from "@/lib/whatsapp";
import { fetchAnnouncement, fetchContact } from "@/lib/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contact, setContact] = useState({ phone: "", whatsapp: "" });
  const [announcement, setAnnouncement] = useState({ active: false, text: "" });
  const [siteName] = useState("Sweet Delights Bakery");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadData() {
      const [contactData, announcementData] = await Promise.all([
        fetchContact(),
        fetchAnnouncement(),
      ]);
      if (contactData) setContact(contactData);
      if (announcementData) setAnnouncement(announcementData);
    }
    loadData();
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream-50/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      {announcement.active && announcement.text && (
        <div className="bg-rose-400 text-white text-center text-sm py-2 px-4 font-medium">
          {announcement.text}
        </div>
      )}

      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-chocolate-600 tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {siteName}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-chocolate-600 hover:text-chocolate-400 transition-colors text-sm font-medium tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-chocolate-600 hover:text-chocolate-400 transition-colors text-sm font-medium"
            >
              <Phone size={16} />
              <span>{contact.phone}</span>
            </a>
            <button
              onClick={() => openWhatsApp()}
              className="bg-chocolate-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-chocolate-700 transition-colors"
            >
              Order Now
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-chocolate-600 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream-50 border-t border-chocolate-100 px-4 py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className="block text-chocolate-600 hover:text-chocolate-400 transition-colors text-lg font-medium py-1"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-chocolate-100">
            <button
              onClick={() => {
                openWhatsApp();
                handleNavClick();
              }}
              className="w-full bg-chocolate-600 text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-chocolate-700 transition-colors"
            >
              Order on WhatsApp
            </button>
            <a
              href={`tel:${contact.phone}`}
              className="block text-center text-chocolate-500 text-sm mt-3 hover:text-chocolate-600 transition-colors"
            >
              Call {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}