import React from "react";

interface RatingsProps {
  rating: number;       // التقييم الحالي (0-5)
  totalStars?: number;   // عدد النجوم الكلي، افتراضي 5
  size?: number;         // حجم النجوم بالـ px، افتراضي 20
  showTooltip?: boolean; // هل يظهر التولتيب عند hover
}

const Ratings: React.FC<RatingsProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  showTooltip = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span
          key={`full-${i}`}
          style={{ fontSize: size }}
          className="text-yellow-400"
          title={showTooltip ? `${rating} / ${totalStars}` : undefined}
        >
          ★
        </span>
      ))}

      {hasHalfStar && (
        <span
          style={{ fontSize: size }}
          className="text-yellow-400 relative"
          title={showTooltip ? `${rating} / ${totalStars}` : undefined}
        >
          <span className="absolute overflow-hidden" style={{ width: size / 2 }}>
            ★
          </span>
          <span className="text-gray-300">★</span>
        </span>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          style={{ fontSize: size }}
          className="text-gray-300"
          title={showTooltip ? `${rating} / ${totalStars}` : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Ratings;
