// components/Route/Hero.tsx
'use client';
import React from 'react';
import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../Loader/Loader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Hero: React.FC = () => {
  const { data, isLoading, isFetching, isError } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  // Show loader while fetching
  if (isLoading || isFetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    console.error("Error loading hero data");
  }
  
  const banner = data?.layout?.banner;
  
  // --- Extract Image Data ---
  const bannerImage = banner?.image?.url;

  const badge = banner?.badge || "🎓 Join 50,000+ learners worldwide";
  const title = banner?.title || "Transform Your";
  const subtitle = banner?.subtitle || "Learning Journey";
  const description = banner?.description || "Unlock your potential with cutting-edge courses, expert instructors, and a community of passionate learners. Start learning today.";
  const primaryButton = banner?.primaryButton || "Start Learning Free";
  const secondaryButton = banner?.secondaryButton || "Watch Demo";
  const stats = banner?.stats && banner.stats.length > 0 ? banner.stats : [
    { icon: 'Users', label: 'Active Students', value: '50K+', color: 'blue' },
    { icon: 'BookOpen', label: 'Courses', value: '500+', color: 'purple' },
    { icon: 'Award', label: 'Certificates', value: '30K+', color: 'indigo' },
    { icon: 'TrendingUp', label: 'Success Rate', value: '95%', color: 'pink' },
  ];

  const pathname = usePathname();
const isActive = pathname === "/courses";

  const iconMap: { [key: string]: React.ElementType } = {
    Users,
    BookOpen,
    Award,
    TrendingUp
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 overflow-hidden pb-20">
      
      {/* --- BACKGROUND LOGIC --- */}
      {bannerImage ? (
        /* If Admin uploaded an image, show Image + Overlay */
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay to ensure text readability on top of image */}
          <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-[2px]"></div>
        </div>
      ) : (
        /* If NO image, show original Animated Gradients */
        <>
          <div className="absolute inset-0 hero_animation"></div>
          <div className="absolute inset-0 mesh-gradient"></div>
        </>
      )}

      {/* Floating Particles (Visible on both versions) */}
      <div className="particles-container z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 geometric-shape shape-1 z-0"></div>
      <div className="absolute top-40 right-20 w-24 h-24 geometric-shape shape-2 z-0"></div>
      <div className="absolute bottom-32 left-20 w-28 h-28 geometric-shape shape-3 z-0"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 geometric-shape shape-4 z-0"></div>
      
      {/* Large Background Icons */}
      <div className="absolute top-1/4 left-10 opacity-10 dark:opacity-5 animate-float z-0">
        <BookOpen size={120} className="text-blue-600 dark:text-blue-400" />
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-10 dark:opacity-5 animate-float-delayed z-0">
        <Award size={100} className="text-purple-600 dark:text-purple-400" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20 md:mt-0">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 animate-fade-in shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {badge}
          </span>
        </div>

        {/* Title with Gradient Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up font-Josefin">
          <span className="gradient-text block mb-2">{title}</span>
          <span className="text-gray-900 dark:text-white">{subtitle}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-10 animate-fade-in-up animation-delay-200 font-Poppins max-w-3xl mx-auto leading-relaxed font-medium">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400 mb-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
            <span className="relative z-10 flex items-center gap-2">
              {primaryButton}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <Link
  href="/courses"
  className={`
    group px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
    font-semibold rounded-full text-lg flex items-center gap-2 transition-all duration-300 
    hover:scale-105 hover:shadow-xl

    ${isActive 
      ? "border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400" 
      : "border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white"
    }
  `}
>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>

  {secondaryButton}
</Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-600">
          {stats.map((stat:any, index:any) => {
            const IconComponent = iconMap[stat.icon] || Users;
            
            return (
              <div
                key={index}
                className="group relative bg-[#fafafa]/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-[#e0e0e0] dark:border-gray-700/80 p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:bg-white dark:hover:bg-gray-800 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-blue-500/50"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:[transform:rotateY(360deg)] shadow-[0_4px_12px] ${
                  stat.color === 'blue' 
                    ? 'bg-gradient-to-br from-blue-500/25 to-blue-700/15 text-blue-600 dark:from-blue-500/30 dark:to-blue-700/20 dark:text-blue-400 shadow-blue-500/25' 
                    : stat.color === 'purple' 
                    ? 'bg-gradient-to-br from-purple-500/25 to-purple-700/15 text-purple-600 dark:from-purple-500/30 dark:to-purple-700/20 dark:text-purple-400 shadow-purple-500/25' 
                    : stat.color === 'indigo' 
                    ? 'bg-gradient-to-br from-indigo-500/25 to-indigo-700/15 text-indigo-600 dark:from-indigo-500/30 dark:to-indigo-700/20 dark:text-indigo-400 shadow-indigo-500/25' 
                    : 'bg-gradient-to-br from-pink-500/25 to-pink-700/15 text-pink-600 dark:from-pink-500/30 dark:to-pink-700/20 dark:text-pink-400 shadow-pink-500/25'
                }`}>
                  <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator - Fixed at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center p-2 bg-white/20 backdrop-blur-sm">
          <div className="w-1 h-3 bg-gray-600 dark:bg-white rounded-full animate-scroll"></div>
        </div>
      </div>

    </div>
  );
};

export default Hero;