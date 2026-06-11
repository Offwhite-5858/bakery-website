"use client";

// We need to get the WhatsApp number dynamically
// The default is used as fallback if the API hasn't loaded yet
let cachedWhatsapp = "+1234567890";

export function setWhatsappNumber(number) {
  cachedWhatsapp = number;
}

export function getWhatsappUrl(message) {
  return `https://wa.me/${cachedWhatsapp}?text=${encodeURIComponent(message)}`;
}

export function orderProduct(productName) {
  const message = `Hi! I'd like to order:\n🎂 ${productName}\n\nCan you help me with pricing and availability?`;
  window.open(getWhatsappUrl(message), "_blank");
}

export function orderCustomCake(formData) {
  const message = `Hi! I'd like a custom cake quote:\n\n🎉 Occasion: ${formData.occasion}\n👥 Guests: ${formData.guests}\n🍰 Flavor: ${formData.flavor}\n📅 Date: ${formData.date}\n💬 Notes: ${formData.notes || "None"}`;
  window.open(getWhatsappUrl(message), "_blank");
}

export function openWhatsApp(message = "Hi! I'd like to place an order.") {
  window.open(getWhatsappUrl(message), "_blank");
}