"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Cake, Image, Clock, MessageSquare, Phone,
  LogOut, Save, Check, Eye, Upload, Plus, Trash2, Menu, X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [editData, setEditData] = useState({
    products: [],
    hero: { headline: "", subheadline: "", hero_image_url: "" },
    announcement: { active: false, text: "" },
    hours: [],
    contact: { whatsapp: "", phone: "", email: "", address: "", instagram_url: "", facebook_url: "" },
    testimonials: [],
    gallery: [],
    about: { story_title: "", story_text: "", founder_image_url: "", kitchen_image_url: "" },
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
        hours: hours || [], contact: contact || {}, testimonials: testimonials || [],
        gallery: gallery || [],
        about: {
          story_title: "How It All Started",
          story_text: "Sweet Delights Bakery started in a small home kitchen with one simple belief: everyone deserves cake that tastes as good as it looks.",
          founder_image_url: hero?.founder_image_url || "",
          kitchen_image_url: hero?.kitchen_image_url || "",
        },
      });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaved(false);
    try {
      await Promise.all([
        saveProducts(editData.products), saveHero({ ...editData.hero, founder_image_url: editData.about.founder_image_url, kitchen_image_url: editData.about.kitchen_image_url }),
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
      else if (type === "founder") setEditData({ ...editData, about: { ...editData.about, founder_image_url: url } });
      else if (type === "kitchen") setEditData({ ...editData, about: { ...editData.about, kitchen_image_url: url } });
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
    setEditData({ ...editData, products: [...editData.products, { name: "New Product", category: "cakes", price: "$0", description: "", image_url: "", bestseller: false, featured: true, display_order: editData.products.length + 1 }] });
  };

  const addTestimonial = () => {
    setEditData({ ...editData, testimonials: [...editData.testimonials, { name: "New Customer", role: "", rating: 5, text: "Write review here...", display_order: editData.testimonials.length + 1 }] });
  };

  const deleteProductHandler = async (index) => {
    const product = editData.products[index];
    if (product.id) await deleteProduct(product.id);
    setEditData({ ...editData, products: editData.products.filter((_, i) => i !== index) });
  };

  const deleteTestimonialHandler = async (index) => {
    const review = editData.testimonials[index];
    if (review.id) await deleteTestimonial(review.id);
    setEditData({ ...editData, testimonials: editData.testimonials.filter((_, i) => i !== index) });
  };

  const deleteGalleryHandler = async (index) => {
    const image = editData.gallery[index];
    if (image.id) await deleteGalleryImage(image.id);
    setEditData({ ...editData, gallery: editData.gallery.filter((_, i) => i !== index) });
  };

  const handleLogout = () => { sessionStorage.removeItem("admin-auth"); router.push("/admin"); };

  const tabs = [
    { id: "products", name: "Products", icon: Cake },
    { id: "hero", name: "Hero & Photos", icon: Image },
    { id: "about", name: "About Page", icon: Cake },
    { id: "hours", name: "Hours", icon: Clock },
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
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-3 md:px-6 h-14 md:h-16">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-1.5 text-chocolate-600">
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Cake size={20} className="text-chocolate-600 hidden sm:block" />
            <h1 className="text-base md:text-lg font-bold text-chocolate-700 truncate" style={{ fontFamily: "var(--font-playfair)" }}>Admin Panel</h1>
          </div>
          <div className="flex items-center gap-1.5 md:gap-3">
            <Link href="/" target="_blank" className="text-xs md:text-sm text-chocolate-500 hover:text-chocolate-700 px-1.5 md:px-2"><Eye size={14} className="inline md:hidden" /><span className="hidden md:inline">View Site</span></Link>
            <button onClick={handleSave} className="flex items-center gap-1 md:gap-2 bg-chocolate-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-chocolate-700">
              {saved ? <Check size={14} /> : <Save size={14} />}<span className="hidden sm:inline">{saved ? "Saved!" : "Save"}</span>
            </button>
            <button onClick={handleLogout} className="p-1.5 text-gray-400 hover:text-red-500"><LogOut size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Mobile overlay */}
        {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:sticky top-14 md:top-16 left-0 z-40 w-56 bg-white border-r border-gray-200 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] p-3 transition-transform duration-200 overflow-y-auto`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-left text-sm ${activeTab === tab.id ? "bg-chocolate-50 text-chocolate-700 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>
                <Icon size={18} /><span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6 w-full overflow-x-hidden">
          {/* PRODUCTS */}
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-chocolate-700">Products</h2>
                <button onClick={addProduct} className="flex items-center gap-1 md:gap-2 bg-chocolate-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-chocolate-700"><Plus size={14} /> Add</button>
              </div>
              <div className="space-y-2 md:space-y-3">
                {editData.products.map((product, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 md:p-4 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {product.image_url ? <img src={product.image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300"><Cake size={20} /></div>}
                        <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Upload size={12} className="text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "products", index)} />
                        </label>
                      </div>
                      <div className="flex-1 min-w-0 sm:hidden">
                        <input type="text" value={product.name} onChange={(e) => { const u = [...editData.products]; u[index].name = e.target.value; setEditData({ ...editData, products: u }); }} className="w-full font-medium text-chocolate-700 bg-transparent border-none outline-none text-sm" placeholder="Product name" />
                        <input type="text" value={product.price} onChange={(e) => { const u = [...editData.products]; u[index].price = e.target.value; setEditData({ ...editData, products: u }); }} className="w-full text-xs text-chocolate-400 bg-transparent border-none outline-none" placeholder="Price" />
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-1 min-w-0 gap-3 items-center">
                      <input type="text" value={product.name} onChange={(e) => { const u = [...editData.products]; u[index].name = e.target.value; setEditData({ ...editData, products: u }); }} className="flex-1 font-medium text-chocolate-700 bg-transparent border-none outline-none text-sm" placeholder="Product name" />
                      <input type="text" value={product.price} onChange={(e) => { const u = [...editData.products]; u[index].price = e.target.value; setEditData({ ...editData, products: u }); }} className="w-32 text-sm text-chocolate-400 bg-transparent border-none outline-none" placeholder="Price" />
                      <select value={product.category} onChange={(e) => { const u = [...editData.products]; u[index].category = e.target.value; setEditData({ ...editData, products: u }); }} className="text-xs text-chocolate-500 bg-cream-50 border border-chocolate-200 rounded px-2 py-1">
                        <option value="cakes">Cakes</option><option value="cupcakes">Cupcakes</option><option value="pastries">Pastries</option><option value="bread">Bread</option><option value="savory">Savory</option><option value="special-orders">Special Orders</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <select value={product.category} onChange={(e) => { const u = [...editData.products]; u[index].category = e.target.value; setEditData({ ...editData, products: u }); }} className="sm:hidden text-xs text-chocolate-500 bg-cream-50 border border-chocolate-200 rounded px-2 py-1">
                        <option value="cakes">Cakes</option><option value="cupcakes">Cupcakes</option><option value="pastries">Pastries</option><option value="bread">Bread</option><option value="savory">Savory</option><option value="special-orders">Special Orders</option>
                      </select>
                      <label className="flex items-center gap-1 text-xs text-chocolate-500">
                        <input type="checkbox" checked={product.featured} onChange={(e) => { const u = [...editData.products]; u[index].featured = e.target.checked; setEditData({ ...editData, products: u }); }} className="rounded" /> Featured
                      </label>
                      <button onClick={() => deleteProductHandler(index)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO */}
          {activeTab === "hero" && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-chocolate-700 mb-4 md:mb-6">Hero & Announcement</h2>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate-700 mb-1">Hero Image</label>
                  <div className="w-full h-32 md:h-40 bg-cream-100 rounded-xl overflow-hidden relative mb-2">
                    {editData.hero.hero_image_url ? <img src={editData.hero.hero_image_url} alt="Hero" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300">No image</div>}
                    <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={20} className="text-white" /><span className="text-white ml-2 font-medium text-sm">Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "hero")} />
                    </label>
                  </div>
                </div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Headline</label><input type="text" value={editData.hero.headline} onChange={(e) => setEditData({ ...editData, hero: { ...editData.hero, headline: e.target.value } })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" /></div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Subheadline</label><input type="text" value={editData.hero.subheadline} onChange={(e) => setEditData({ ...editData, hero: { ...editData.hero, subheadline: e.target.value } })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" /></div>
                <div><label className="block text-sm font-medium text-chocolate-700 mb-1">Announcement Bar</label><input type="text" value={editData.announcement.text} onChange={(e) => setEditData({ ...editData, announcement: { ...editData.announcement, text: e.target.value } })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" /></div>
                <label className="flex items-center gap-2 text-sm text-chocolate-600"><input type="checkbox" checked={editData.announcement.active} onChange={(e) => setEditData({ ...editData, announcement: { ...editData.announcement, active: e.target.checked } })} className="rounded" /> Show announcement bar</label>
              </div>
            </div>
          )}

          {/* ABOUT PAGE */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-chocolate-700 mb-4 md:mb-6">About Page</h2>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate-700 mb-1">Story Title</label>
                  <input type="text" value={editData.about.story_title} onChange={(e) => setEditData({ ...editData, about: { ...editData.about, story_title: e.target.value } })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate-700 mb-1">Story Text (Bio)</label>
                  <textarea value={editData.about.story_text} onChange={(e) => setEditData({ ...editData, about: { ...editData.about, story_text: e.target.value } })} rows={6} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm resize-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-chocolate-700 mb-1">Founder Photo</label>
                    <div className="w-full h-40 bg-cream-100 rounded-xl overflow-hidden relative mb-2">
                      {editData.about.founder_image_url ? <img src={editData.about.founder_image_url} alt="Founder" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300 text-sm">Founder photo</div>}
                      <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload size={20} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "founder")} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate-700 mb-1">Kitchen Photo</label>
                    <div className="w-full h-40 bg-cream-100 rounded-xl overflow-hidden relative mb-2">
                      {editData.about.kitchen_image_url ? <img src={editData.about.kitchen_image_url} alt="Kitchen" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300 text-sm">Kitchen photo</div>}
                      <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload size={20} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "kitchen")} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOURS */}
          {activeTab === "hours" && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-chocolate-700 mb-4 md:mb-6">Opening Hours</h2>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 space-y-2 md:space-y-3">
                {editData.hours.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="w-20 md:w-24 text-sm font-medium text-chocolate-700 capitalize">{item.day}</span>
                    <input type="text" value={item.hours} onChange={(e) => { const u = editData.hours.map((h) => h.id === item.id ? { ...h, hours: e.target.value } : h); setEditData({ ...editData, hours: u }); }} className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-chocolate-700">Reviews</h2>
                <button onClick={addTestimonial} className="flex items-center gap-1 md:gap-2 bg-chocolate-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-chocolate-700"><Plus size={14} /> Add</button>
              </div>
              <div className="space-y-2 md:space-y-3">
                {editData.testimonials.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 md:p-4 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <input type="text" value={review.name} onChange={(e) => { const u = [...editData.testimonials]; u[index].name = e.target.value; setEditData({ ...editData, testimonials: u }); }} className="flex-1 font-medium text-chocolate-700 bg-transparent border-none outline-none text-sm" placeholder="Customer name" />
                      <div className="flex gap-2">
                        <input type="text" value={review.role || ""} onChange={(e) => { const u = [...editData.testimonials]; u[index].role = e.target.value; setEditData({ ...editData, testimonials: u }); }} className="flex-1 sm:w-32 text-sm text-chocolate-400 bg-transparent border-none outline-none" placeholder="Role" />
                        <button onClick={() => deleteTestimonialHandler(index)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
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
              <h2 className="text-lg md:text-xl font-bold text-chocolate-700 mb-4 md:mb-6">Contact</h2>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 space-y-3 md:space-y-4">
                {[{ key: "whatsapp", label: "WhatsApp" },{ key: "phone", label: "Phone" },{ key: "email", label: "Email" },{ key: "address", label: "Address" },{ key: "instagram_url", label: "Instagram URL" },{ key: "facebook_url", label: "Facebook URL" }].map(({ key, label }) => (
                  <div key={key}><label className="block text-sm font-medium text-chocolate-700 mb-1">{label}</label><input type="text" value={editData.contact[key] || ""} onChange={(e) => setEditData({ ...editData, contact: { ...editData.contact, [key]: e.target.value } })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-chocolate-400 text-sm" /></div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeTab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-chocolate-700">Gallery</h2>
                <label className="flex items-center gap-1 md:gap-2 bg-chocolate-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-chocolate-700 cursor-pointer">
                  <Upload size={14} /> {uploading ? "..." : "Add"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "gallery")} />
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {editData.gallery.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden group relative">
                    <div className="aspect-square bg-cream-100 relative">
                      {image.image_url ? <img src={image.image_url} alt={image.alt} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-chocolate-300 text-xs">No img</div>}
                      <button onClick={() => deleteGalleryHandler(index)} className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                    </div>
                    <div className="p-2">
                      <input type="text" value={image.alt || ""} onChange={(e) => { const u = [...editData.gallery]; u[index].alt = e.target.value; setEditData({ ...editData, gallery: u }); }} className="w-full text-xs text-chocolate-600 bg-transparent border-none outline-none" placeholder="Description" />
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