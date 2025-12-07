"use client";
import React, { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader/Loader";
import CourseCard from "@/app/components/Course.CourseCard";
import {
  BookOpen,
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  Filter,
  TrendingUp,
  Star,
  Clock,
  Users,
  Target,
  Zap,
} from "lucide-react";
import Footer from "../components/Routes/Footer";

type Props = {};

const Page = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating">("popular");
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
      setFilteredCourses(data.courses);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.courses.map((course: any) => course.categories).filter(Boolean))
      ) as string[];
      setCategories(["all", ...uniqueCategories]);
    }
  }, [data]);

  // Filter and sort courses
  useEffect(() => {
    if (!courses) return;

    let filtered = [...courses];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((course) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          course.name?.toLowerCase().includes(searchLower) ||
          course.description?.toLowerCase().includes(searchLower) ||
          course.tags?.toLowerCase().includes(searchLower) ||
          course.categories?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.categories === selectedCategory);
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.purchased || 0) - (a.purchased || 0);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "rating":
          return (b.ratings || 0) - (a.ratings || 0);
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, sortBy, courses]);

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("popular");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <Header activeItem={1} open={false} setOpen={() => {}} route="" setRoute={() => {}} />

      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-20"></div>
      <div className="particles-container">
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

      {/* Floating Shapes */}
      <div className="absolute top-32 left-10 w-32 h-32 geometric-shape shape-1"></div>
      <div className="absolute top-64 right-20 w-24 h-24 geometric-shape shape-2"></div>
      <div className="absolute bottom-32 left-20 w-28 h-28 geometric-shape shape-3"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {courses?.length || 0}+ Premium Courses Available
            </span>
          </div>

          {/* Title */}
          <h1 className="font-Poppins text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Expand Your Career </span>
            <span className="gradient-text">Opportunity</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-Poppins mb-8">
            Discover world-class courses from expert instructors and transform your learning journey
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { icon: Users, value: "50K+", label: "Students" },
              { icon: BookOpen, value: courses?.length || 0, label: "Courses" },
              { icon: Star, value: "4.8", label: "Average Rating" },
              { icon: Target, value: "95%", label: "Success Rate" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 animate-fade-in-up animation-delay-100">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search courses by name, description, tags, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Category Filter */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Categories:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category === "all" ? "All Courses" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="w-full lg:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Sort By:
                  </span>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "popular", label: "Most Popular", icon: TrendingUp },
                    { value: "newest", label: "Newest", icon: Clock },
                    { value: "rating", label: "Top Rated", icon: Star },
                  ].map((sort) => {
                    const Icon = sort.icon;
                    return (
                      <button
                        key={sort.value}
                        onClick={() => setSortBy(sort.value as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                          sortBy === sort.value
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{sort.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== "all" || sortBy !== "popular") && (
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Results Count */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredCourses.length === 0 ? (
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        No courses found matching your criteria
                      </span>
                    ) : (
                      <>
                        Found{" "}
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {filteredCourses.length}
                        </span>{" "}
                        course{filteredCourses.length !== 1 ? "s" : ""}
                        {searchQuery && (
                          <>
                            {" "}
                            matching
                            <span className="font-semibold">{searchQuery}</span>
                          </>
                        )}
                        {selectedCategory !== "all" && (
                          <>
                            {" "}
                            in <span className="font-semibold">{selectedCategory}</span>
                          </>
                        )}
                      </>
                    )}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sorted by: <span className="font-semibold">{sortBy}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="animate-fade-in-up animation-delay-200">
          {filteredCourses && filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((item: any, index: number) => (
                <div
                  key={item._id || index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CourseCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border-2 border-gray-200 dark:border-gray-700">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Courses Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "No courses available at the moment"}
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
       
        {/* Call to Action Section */}
       
      </div><Footer/>
    </div>
  );
};

export default Page;