"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyWhatsApp from "@/components/shared/StickyWhatsApp";
import WhatsAppProvider from "@/components/shared/WhatsAppProvider";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <WhatsAppProvider>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <StickyWhatsApp />}
    </WhatsAppProvider>
  );
}