"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Cake, Image, Clock, MessageSquare, Phone,
  LogOut, Save, Check, Eye, Upload, Plus, Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  fetchProducts, fetchHero, fetchAnnouncement, fetchHours,
  fetchTestimonials, fetchContact, fetchGallery,
  saveProducts, saveHero, saveAnnouncement, saveHours,
  saveTestimonials, saveContact, saveGallery,
  deleteGalleryImage, deleteProduct, deleteTestimonial,
} from "@/lib/api";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("products");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [editData, setEditData] = useState({
    products: [],
    hero: { headline: "", subheadline: "", hero_image_url: "" },
    announcement: { active: false, text: "" },
    hours: [],
    contact: { whatsapp: "", phone: "", email: "", address: "", instagram_url: "", facebook_url: "" },
    testimonials: [],
    gallery: [],
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) { router.push("/admin"); return; }
    loadAllData();
  }, [router]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [products, hero, announcement, hours, testimonials, contact, gallery] =
        await Promise.all([fetchProducts(), fetchHero(), fetchAnnouncement(), fetchHours(), fetchTestimonials(), fetchContact(), fetchGallery()]);
      setEditData({
        products: products || [], hero: hero || {}, announcement: announcement || {},
        hours: hours || [], contact: contact || {}, testimonials: testimonials || [], gallery: gallery || [],
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaved(false);
    try {
      await Promise.all([
        saveProducts(editData.products), saveHero(editData.hero),
        saveAnnouncement(editData.announcement), saveHours(editData.hours),
        saveTestimonials(editData.testimonials), saveContact(editData.contact),
        saveGallery(editData.gallery),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { alert("Failed to save: " + e.message); }
  };

  const handleImageUpload = async (e, type, index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${type}/${Date.now()}-${file.name}`;
    try {
      const { error } = await supabase.storage.from("bakery-images").upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("bakery-images").getPublicUrl(fileName);
      const url = urlData.publicUrl;
      if (type === "hero") setEditData({ ...editData, hero: { ...editData.hero, hero_image_url: url } });
      else if (type === "products" && index !== null) {
        const updated = [...editData.products];
        updated[index].image_url = url;
        setEditData({ ...editData, products: updated });
      } else if (type === "gallery") {
        setEditData({ ...editData, gallery: [...editData.gallery, { image_url: url, alt: "New image", category: "General", display_order: editData.gallery.length + 1 }] });
      }
    } catch (e) { alert("Upload failed: " + e.message); }
    setUploading(false);
  };

  const addProduct = () => {
    const newProduct = { name: "New Product", category: "cakes", price: "$0", description: "", image_url: "", bestseller: false, featured: true, display_order: editData.products.length + 1 };
    setEditData({ ...editData, products: [...editData.products, newProduct] });
  };

  const addTestimonial = () => {
    const newReview = { name: "New Customer", role: "", rating: 5, text: "Write review here...", display_order: editData.testimonials.length + 1 };
    setEditData({ ...editData, testimonials: [...editData.testimonials, newReview] });
  };

  const deleteProductHandler = async (index) => {
    const product = editData.products[index];
    if (product.id) await deleteProduct(product.id);
    const updated = editData.products.filter((_, i) => i !== index);
    setEditData({ ...editData, products: updated });
  };

  const deleteTestimonialHandler = async (index) => {
    const review = editData.testimonials[index];
    if (review.id) await deleteTestimonial(review.id);
    const updated = editData.testimonials.filter((_, i) => i !== index);
    setEditData({ ...editData, testimonials: updated });
  };

  const deleteGalleryHandler = async (index) => {
    const image = editData.gallery[index];
    if (image.id) await deleteGalleryImage(image.id);
    const updated = editData.gallery.filter((_, i) => i !== index);
    setEditData({ ...editData, gallery: updated });
  };

  const handleLogout = () => { sessionStorage.removeItem("admin-auth"); router.push("/admin"); };

  const tabs = [
    { id: "products", name: "Products", icon: Cake },
    { id: "hero", name: "Hero & Photos", icon: Image },
    { id: "hours", name: "Hours & Info", icon: Clock },
    { id: "testimonials", name: "Reviews", icon: MessageSquare },
    { id: "contact", name: "Contact", icon: Phone },
    { id: "gallery", name: "Gallery", icon: Image },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center"><Cake size={48} className="text-chocolate-400 mx-auto mb-4 animate-pulse" /><p className="text-chocolate-500">Loading...</p></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-3">
            <Cake size={24} className="text-chocolate-600" />
            <h1 className="text-lg font-bold text-chocolate-700" style={{ fontFamily: "var(--font-playfair)" }}>Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-chocolate-500 hover:text-chocolate-700"><Eye size={16} /><span className="hidden sm:inline">View Site</span></Link>
            <button onClick={handleSave} className="flex items-center gap-2 bg-chocolate-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-chocolate-700">{saved ? <Check size={16} /> : <Save size={16} />}<span className="hidden sm:inline">{saved ? "Saved!" : "Save All Changes"}</span></button>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-20 md:w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all text-left ${activeTab === tab.id ? "bg-chocolate-50 text-chocolate-700 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>
                <Icon size={20} /><span className="hidden md:inline text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 p-4 md:p-6">
          {/* PRODUCTS */}
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-chocolate-700">Manage Products</h2>
                <button onClick={addProduct} className="flex items-center gap-2 bg-chocolate-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-chocolate-700">
                  <Plus size={16} /> Add Product
                </button>
              </div>
              <div className="space-y-3">
                {editData.products.map((product, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                    <div className="w-16 h-16 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                      {product.image_url ? <img src={product.image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300"><Cake size={24} /></div>}
                      <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload size={16} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "products", index)} />
                      </label>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <input type="text" value={product.name} onChange={(e) => { const u = [...editData.products]; u[index].name = e.target.value; setEditData({ ...editData, products: u }); }} className="w-full font-medium text-chocolate-700 bg-transparent border-none outline-none" placeholder="Product name" />
                      <input type="text" value={product.price} onChange={(e) => { const u = [...editData.products]; u[index].price = e.target.value; setEditData({ ...editData, products: u }); }} className="w-full text-sm text-chocolate-400 bg-transparent border-none outline-none" placeholder="Price" />
                      <select value={product.category} onChange={(e) => { const u = [...editData.products]; u[index].category = e.target.value; setEditData({ ...editData, products: u }); }} className="text-xs text-chocolate-500 bg-cream-50 border border-chocolate-200 rounded px-2 py-1">
                        <option value="cakes">Cakes</option><option value="cupcakes">Cupcakes</option><option value="pastries">Pastries</option><option value="bread">Bread</option><option value="savory">Savory</option><option value="special-orders">Special Orders</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-chocolate-500">
                      <input type="checkbox" checked={product.featured} onChange={(e) => { const u = [...editData.products]; u[index].featured = e.target.checked; setEditData({ ...editData, products: u }); }} className="rounded" /> Featured
                    </label>
                    <button onClick={() => deleteProductHandler(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO */}
          {activeTab === "hero" && (
            <div>
              <h2 className="text-xl font-bold text-chocolate-700 mb-6">Hero & Announcement</h2>
              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate-700 mb-1">Hero Image</label>
                  <div className="w-full h-40 bg-cream-100 rounded-xl overflow-hidden relative mb-2">
                    {editData.hero.hero_image_url ? <img src={editData.hero.hero_image_url} alt="Hero" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300">No image</div>}
                    <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={24} className="text-white" /><span className="text-white ml-2 font-medium">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "hero")} />
                    </label>
                  </div>
                </div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Hero Headline</label><input type="text" value={editData.hero.headline} onChange={(e) => setEditData({ ...editData, hero: { ...editData.hero, headline: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400" /></div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Hero Subheadline</label><input type="text" value={editData.hero.subheadline} onChange={(e) => setEditData({ ...editData, hero: { ...editData.hero, subheadline: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400" /></div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Announcement Bar Text</label><input type="text" value={editData.announcement.text} onChange={(e) => setEditData({ ...editData, announcement: { ...editData.announcement, text: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400" /></div>
                <label className="flex items-center gap-2 text-sm text-chocolate-600"><input type="checkbox" checked={editData.announcement.active} onChange={(e) => setEditData({ ...editData, announcement: { ...editData.announcement, active: e.target.checked } })} className="rounded" /> Show announcement bar</label>
              </div>
            </div>
          )}

          {/* HOURS */}
          {activeTab === "hours" && (
            <div>
              <h2 className="text-xl font-bold text-chocolate-700 mb-6">Opening Hours</h2>
              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-3">
                {editData.hours.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-chocolate-700 capitalize">{item.day}</span>
                    <input type="text" value={item.hours} onChange={(e) => { const u = editData.hours.map((h) => h.id === item.id ? { ...h, hours: e.target.value } : h); setEditData({ ...editData, hours: u }); }} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-chocolate-700">Customer Reviews</h2>
                <button onClick={addTestimonial} className="flex items-center gap-2 bg-chocolate-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-chocolate-700"><Plus size={16} /> Add Review</button>
              </div>
              <div className="space-y-3">
                {editData.testimonials.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex gap-3 mb-2">
                      <input type="text" value={review.name} onChange={(e) => { const u = [...editData.testimonials]; u[index].name = e.target.value; setEditData({ ...editData, testimonials: u }); }} className="flex-1 font-medium text-chocolate-700 bg-transparent border-none outline-none" placeholder="Customer name" />
                      <input type="text" value={review.role || ""} onChange={(e) => { const u = [...editData.testimonials]; u[index].role = e.target.value; setEditData({ ...editData, testimonials: u }); }} className="w-40 text-sm text-chocolate-400 bg-transparent border-none outline-none" placeholder="Role" />
                      <button onClick={() => deleteTestimonialHandler(index)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <textarea value={review.text} onChange={(e) => { const u = [...editData.testimonials]; u[index].text = e.target.value; setEditData({ ...editData, testimonials: u }); }} rows={2} className="w-full text-sm text-chocolate-500 bg-transparent border-none outline-none resize-none" placeholder="Review text" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <div>
              <h2 className="text-xl font-bold text-chocolate-700 mb-6">Contact Information</h2>
              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                {[{ key: "whatsapp", label: "WhatsApp Number" },{ key: "phone", label: "Phone Number" },{ key: "email", label: "Email" },{ key: "address", label: "Address" },{ key: "instagram_url", label: "Instagram URL" },{ key: "facebook_url", label: "Facebook URL" }].map(({ key, label }) => (
                  <div key={key}><label className="block text-sm font-medium text-chocolate-700 mb-1">{label}</label><input type="text" value={editData.contact[key] || ""} onChange={(e) => setEditData({ ...editData, contact: { ...editData.contact, [key]: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400" /></div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeTab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-chocolate-700">Gallery</h2>
                <label className="flex items-center gap-2 bg-chocolate-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-chocolate-700 cursor-pointer">
                  <Upload size={16} /> {uploading ? "Uploading..." : "Add Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "gallery")} />
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {editData.gallery.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden group relative">
                    <div className="aspect-square bg-cream-100 relative">
                      {image.image_url ? <img src={image.image_url} alt={image.alt} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300">No image</div>}
                      <button onClick={() => deleteGalleryHandler(index)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                    </div>
                    <div className="p-3">
                      <input type="text" value={image.alt || ""} onChange={(e) => { const u = [...editData.gallery]; u[index].alt = e.target.value; setEditData({ ...editData, gallery: u }); }} className="w-full text-sm text-chocolate-600 bg-transparent border-none outline-none" placeholder="Description" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}