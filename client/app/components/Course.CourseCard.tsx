import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Ratings from "./Admin/Course/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BookOpen, Users, DollarSign, Tag } from "lucide-react";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const discountPercentage = item.estimatedPrice > 0 
    ? Math.round(((item.estimatedPrice - item.price) / item.estimatedPrice) * 100)
    : 0;

  return (
    <Link 
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
      className="group block h-full"
    >
      <div className="relative h-full flex flex-col bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-blue-500/50">
        
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <Image
            src={item.thumbnail?.url}
            fill
            alt={item.name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {item.price === 0 ? "Free" : `$${item.price}`}
            </span>
            {item.estimatedPrice > 0 && item.price > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 line-through ml-1">
                ${item.estimatedPrice}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-5">
          {/* Course Title */}
          <h3 className="font-Poppins text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.name}
          </h3>

          {/* Rating Section */}
          <div className="mb-3">
            <Ratings rating={item.ratings} />
          </div>

          {/* Stats Grid */}
          <div className="mt-auto grid grid-cols-2 gap-3">
            {/* Students */}
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-gray-400">Students</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.purchased >= 1000 
                    ? `${(item.purchased / 1000).toFixed(1)}K` 
                    : item.purchased}
                </span>
              </div>
            </div>

            {/* Lectures */}
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-gray-400">Lectures</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.courseData?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Action */}
          <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-semibold">View Details</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;