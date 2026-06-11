import { Inter, Playfair_Display } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Sweet Delights Bakery | Freshly Baked Cakes & Pastries",
  description:
    "Custom cakes, daily pastries, and desserts for birthdays, weddings, and special moments. Order now for pickup or delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}