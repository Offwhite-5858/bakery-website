import { supabase } from "@/lib/supabase";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("display_order");
  if (error) console.error("Products error:", error);
  return data || [];
}

export async function fetchHero() {
  const { data, error } = await supabase
    .from("hero_settings")
    .select("*")
    .single();
  if (error) console.error("Hero error:", error);
  return data || {
    headline: "Freshly Baked Cakes, Pastries & Treats Made With Love",
    subheadline: "Custom cakes, daily pastries, and desserts for birthdays, weddings, and special moments.",
    hero_image_url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&q=80",
  };
}

export async function fetchAnnouncement() {
  const { data, error } = await supabase
    .from("announcement")
    .select("*")
    .single();
  if (error) console.error("Announcement error:", error);
  return data || { active: false, text: "" };
}

export async function fetchHours() {
  const { data, error } = await supabase
    .from("opening_hours")
    .select("*")
    .order("id");
  if (error) console.error("Hours error:", error);
  return data || [];
}

export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order");
  if (error) console.error("Testimonials error:", error);
  return data || [];
}

export async function fetchContact() {
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .single();
  if (error) console.error("Contact error:", error);
  return data || {
    whatsapp: "+1234567890",
    phone: "+1234567890",
    email: "hello@sweetdelightsbakery.com",
    address: "123 Bakery Street, Sweetville, CA 90210",
    instagram_url: "",
    facebook_url: "",
  };
}

export async function fetchGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("display_order");
  if (error) console.error("Gallery error:", error);
  return data || [];
}

export async function saveProducts(products) {
  for (const product of products) {
    const { error } = await supabase.from("products").upsert(product);
    if (error) console.error("Save product error:", error);
  }
}

export async function saveHero(hero) {
  const { error } = await supabase.from("hero_settings").update(hero).eq("id", 1);
  if (error) console.error("Save hero error:", error);
}

export async function saveAnnouncement(announcement) {
  const { error } = await supabase.from("announcement").update(announcement).eq("id", 1);
  if (error) console.error("Save announcement error:", error);
}

export async function saveHours(hours) {
  for (const hour of hours) {
    const { error } = await supabase
      .from("opening_hours")
      .update({ hours: hour.hours })
      .eq("id", hour.id);
    if (error) console.error("Save hours error:", error);
  }
}

export async function saveTestimonials(testimonials) {
  for (const testimonial of testimonials) {
    const { error } = await supabase.from("testimonials").upsert(testimonial);
    if (error) console.error("Save testimonial error:", error);
  }
}

export async function saveContact(contact) {
  const { error } = await supabase.from("contact_info").update(contact).eq("id", 1);
  if (error) console.error("Save contact error:", error);
}

export async function saveGallery(images) {
  for (const image of images) {
    const { error } = await supabase.from("gallery").upsert(image);
    if (error) console.error("Save gallery error:", error);
  }
}

export async function deleteGalleryImage(id) {
  if (id) {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) console.error("Delete gallery error:", error);
  }
}

export async function deleteProduct(id) {
  if (id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) console.error("Delete product error:", error);
  }
}

export async function deleteTestimonial(id) {
  if (id) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) console.error("Delete testimonial error:", error);
  }
}