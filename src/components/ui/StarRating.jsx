import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "fill-gold-400 text-gold-400"
              : "fill-none text-chocolate-200"
          }
        />
      ))}
    </div>
  );
}