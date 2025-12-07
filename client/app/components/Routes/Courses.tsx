import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course.CourseCard";
import { BookOpen, Sparkles, Search, X, Filter, SlidersHorizontal } from "lucide-react";
import Loader from "../Loader/Loader";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
console.log(data)
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

  // Filter courses based on search query and category
  useEffect(() => {
    if (!courses) return;

    let filtered = courses;

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
      filtered = filtered.filter(
        (course) => course.categories === selectedCategory
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 py-20 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-30"></div>
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
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
      <div className="absolute top-20 left-10 w-32 h-32 geometric-shape shape-1"></div>
      <div className="absolute top-40 right-20 w-24 h-24 geometric-shape shape-2"></div>
      <div className="absolute bottom-32 left-20 w-28 h-28 geometric-shape shape-3"></div>

      {/* Content Container */}
      <div className="relative z-10 w-[90%] 800px:w-[85%] max-w-[1400px] m-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {courses?.length || 0}+ Courses Available
            </span>
          </div>

          {/* Title */}
          <h1 className="font-Poppins text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Expand Your Career </span>
            <span className="gradient-text">Opportunity</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-Poppins">
            Discover world-class courses from expert instructors and transform your learning journey
          </p>
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
                placeholder="Search courses by name, description, or tags..."
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

            {/* Category Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-semibold">Categories:</span>
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

              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={clearSearch}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Clear Filters</span>
                </button>
              )}
            </div>

            {/* Results Count */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredCourses.length === 0 ? (
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      No courses found matching your criteria
                    </span>
                  ) : (
                    <>
                      Found <span className="font-bold text-blue-600 dark:text-blue-400">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
                      {searchQuery && <> matching<span className="font-semibold">{searchQuery}</span></>}
                      {selectedCategory !== "all" && <> in <span className="font-semibold">{selectedCategory}</span></>}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((item: any, index: number) => (
              <div
                key={item._id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard item={item} />
              </div>
            ))
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
      </div>
    </div>
  );
};

export default Courses;