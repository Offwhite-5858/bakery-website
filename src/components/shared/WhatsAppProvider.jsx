"use client";

import { useEffect } from "react";
import { fetchContact } from "@/lib/api";
import { setWhatsappNumber } from "@/lib/whatsapp";

export default function WhatsAppProvider({ children }) {
  useEffect(() => {
    async function load() {
      const contact = await fetchContact();
      if (contact?.whatsapp) {
        setWhatsappNumber(contact.whatsapp);
      }
    }
    load();
  }, []);

  return children;
}