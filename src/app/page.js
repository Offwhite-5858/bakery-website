import HeroBanner from "@/components/home/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <CTASection />
    </main>
  );
}