import Link from "next/link";
import React, { FC } from "react";
import { Home, BookOpen, Info, Shield, HelpCircle,GraduationCap} from "lucide-react";
import SiCoursera from "react-icons"

export const navItemsData = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Courses",
    link: "/courses",
    icon: BookOpen,
  },
  {
    name: "About",
    link: "/about",
    icon: Info,
  },
  {
    name: "Policy",
    link: "/policy",
    icon: Shield,
  },
  {
    name: "FAQ",
    link: "/faq",
    icon: HelpCircle,
  },
  {
    name: "My courses",
    link: "/student",
    icon: GraduationCap,
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex items-center gap-2">
        {navItemsData &&
          navItemsData.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === index;
            
            return (
              <Link href={item.link} key={index} passHref>
                <span
                  className={`
                    group relative px-4 py-2 rounded-xl font-Poppins font-medium text-[15px]
                    transition-all duration-300 cursor-pointer
                    flex items-center gap-2
                    ${
                      isActive
                        ? "text-white dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }
                  `}
                >
                  {/* Active Background Gradient */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-gradient-shift"></span>
                  )}
                  
                  {/* Hover Background */}
                  {!isActive && (
                    <span className="absolute inset-0 bg-gray-100 dark:bg-gray-800/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                  
                  {/* Icon */}
                  <Icon className={`
                    w-4 h-4 relative z-10 transition-transform duration-300
                    ${isActive ? "scale-110" : "group-hover:scale-110"}
                  `} />
                  
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  )}
                </span>
              </Link>
            );
          })}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5 animate-fade-in">
          {/* Logo/Brand */}
          <div className="w-full text-center py-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" passHref>
              <span className="inline-flex items-center gap-3 text-[24px] font-Poppins font-bold">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="gradient-text">Elearning</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Items */}
          <nav className="py-4 px-2">
            {navItemsData &&
              navItemsData.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeItem === index;
                
                return (
                  <Link href={item.link} key={index} passHref>
                    <div
                      className={`
                        group relative flex items-center gap-4 px-6 py-4 mb-2
                        rounded-xl font-Poppins font-medium text-[16px]
                        transition-all duration-300 cursor-pointer
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                        }
                      `}
                    >
                      {/* Left Border Indicator */}
                      <div
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-white scale-100"
                              : "bg-blue-600 dark:bg-blue-400 scale-0 group-hover:scale-100"
                          }
                        `}
                      ></div>

                      {/* Icon Container */}
                      <div
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-white/20"
                              : "bg-gray-200 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                          }
                        `}
                      >
                        <Icon
                          className={`
                            w-5 h-5 transition-transform duration-300
                            ${isActive ? "scale-110" : "group-hover:scale-110"}
                            ${
                              isActive
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            }
                          `}
                        />
                      </div>

                      {/* Text */}
                      <span className="flex-1">{item.name}</span>

                      {/* Arrow Indicator */}
                      <svg
                        className={`
                          w-5 h-5 transition-transform duration-300
                          ${isActive ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}
                        `}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
          </nav>

          {/* Mobile Bottom Decoration */}
          <div className="mt-6 px-6">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;