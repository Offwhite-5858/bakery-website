import Image from "next/image";
import OrderButton from "@/components/ui/OrderButton";

export default function ProductCard({ product }) {
  const imageUrl = product.image_url || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-chocolate-100/50 hover:border-chocolate-200">
      <div className="relative h-56 sm:h-64 overflow-hidden bg-cream-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-gold-400 text-chocolate-900 text-xs font-semibold px-3 py-1 rounded-full">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-chocolate-700 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
          {product.name}
        </h3>
        <p className="text-chocolate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-chocolate-600 font-semibold">{product.price}</span>
          <OrderButton productName={product.name} />
        </div>
      </div>
    </div>
  );
}