import Image from "next/image";
import React from "react";
import Ratings from "../Admin/Course/Ratings";
import { Quote } from "lucide-react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  const { item } = props;

  return (
    <div className="group relative h-full bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-blue-500/50">
      
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"></div>
      
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 dark:opacity-5">
        <Quote className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>

      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        {/* Avatar with Gradient Ring */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <Image
            src={item.avatar}
            alt={item.name}
            width={60}
            height={60}
            className="relative w-[60px] h-[60px] rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-lg"
          />
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
            {item.name}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {item.profession}
          </p>
          <Ratings rating={item.ratings} />
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px] relative z-10 line-clamp-4">
        {item.comment}
      </p>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ReviewCard;