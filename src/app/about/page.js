import Image from "next/image";
import { Heart, Users, Target } from "lucide-react";
import siteConfig from "@/data/siteConfig";

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-gold-500 font-medium text-sm tracking-widest uppercase">
            About Us
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-chocolate-600 mt-3 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Story
          </h1>
          <p className="text-chocolate-400 max-w-xl mx-auto">
            People buy from people. Here&apos;s the heart behind every bake.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200">
              <div className="absolute inset-0 bg-chocolate-200 animate-pulse" />
              <Image
                src="/images/about/founder.jpg"
                alt="Founder of Sweet Delights Bakery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>

            {/* Text */}
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-chocolate-600 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                How It All Started
              </h2>
              <div className="space-y-4 text-chocolate-500 leading-relaxed">
                <p>
                  {siteConfig.name} started in a small home kitchen with one
                  simple belief: everyone deserves cake that tastes as good as
                  it looks.
                </p>
                <p>
                  What began as baking birthday cakes for friends and family
                  quickly grew into something bigger. Neighbors started asking,
                  then friends of neighbors, then their coworkers. Before we
                  knew it, the kitchen couldn&apos;t keep up with the orders.
                </p>
                <p>
                  Today, we bake from our shop at {siteConfig.contact.address},
                  serving our community with the same love and care that started
                  it all. Every cake, every pastry, every loaf of bread is made
                  from scratch with real ingredients — just like we&apos;d serve
                  our own family.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Heart
                size={32}
                className="text-rose-400 mx-auto mb-3"
              />
              <h3 className="font-semibold text-chocolate-700 mb-2">
                Made With Love
              </h3>
              <p className="text-chocolate-400 text-sm">
                Every recipe is crafted with care, using techniques perfected
                over years of baking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Users
                size={32}
                className="text-chocolate-500 mx-auto mb-3"
              />
              <h3 className="font-semibold text-chocolate-700 mb-2">
                Community First
              </h3>
              <p className="text-chocolate-400 text-sm">
                We&apos;re proud to be part of this neighborhood, serving
                generations of families.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-chocolate-100">
              <Target
                size={32}
                className="text-gold-400 mx-auto mb-3"
              />
              <h3 className="font-semibold text-chocolate-700 mb-2">
                Quality Always
              </h3>
              <p className="text-chocolate-400 text-sm">
                We never compromise on ingredients. Real butter, fresh eggs,
                premium chocolate — always.
              </p>
            </div>
          </div>

          {/* Kitchen Photo */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-cream-200">
            <div className="absolute inset-0 bg-chocolate-200 animate-pulse" />
            <Image
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80"
              alt="Our bakery kitchen"
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </main>
  );
}