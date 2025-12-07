"use client";
import React, { useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader/Loader";
import Protected from "@/app/hooks/useProtected";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Clock,
  PlayCircle,
  TrendingUp,
  Calendar,
  Star,
  ChevronRight,
  Target,
  Zap,
  CheckCircle,
  BarChart3,
  Users,
  Sparkles,
  GraduationCap,
  BookMarked,
} from "lucide-react";
import { format } from "timeago.js";

type Props = {};

const StudentDashboard = (props: Props) => {
  const { data: userData, isLoading: userLoading } = useLoadUserQuery(undefined, {});
  const { data: coursesData, isLoading: coursesLoading } = useGetUsersAllCoursesQuery({});
  const [activeTab, setActiveTab] = useState<"enrolled" | "completed" | "wishlist">("enrolled");

  const user = userData?.user;
  const allCourses = coursesData?.courses || [];

  // Get enrolled courses
  const enrolledCourses = user?.courses?.map((userCourse: any) => {
    return allCourses.find((course: any) => course._id === userCourse.courseId);
  }).filter(Boolean) || [];

  // Calculate statistics
  const totalCourses = enrolledCourses.length;
  const completedCourses = 0; // You can add completion logic
  const inProgressCourses = totalCourses - completedCourses;
  const totalLearningHours = enrolledCourses.reduce((acc: number, course: any) => {
    return acc + (course?.totalVideos || 0) * 0.5; // Assuming 30 min per video
  }, 0);

  if (userLoading || coursesLoading) {
    return <Loader />;
  }

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <Header activeItem={5} open={false} setOpen={() => {}} route="" setRoute={() => {}} />

        {/* Background Elements */}
        <div className="absolute inset-0 hero_animation opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in-up">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* User Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg">
                      <Image
                        src={user?.avatar?.url || "/assets/hoss.png"}
                        alt={user?.name || "User"}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      Welcome back, {user?.name?.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Continue your learning journey
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <Link
                  href="/courses"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse Courses</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Courses */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {totalCourses}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Courses</p>
            </div>

            {/* In Progress */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {inProgressCourses}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">In Progress</p>
            </div>

            {/* Completed */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {completedCourses}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
            </div>

            {/* Learning Hours */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {totalLearningHours.toFixed(0)}h
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Learning Time</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Courses */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                  {[
                    { key: "enrolled", label: "My Courses", icon: BookOpen },
                    { key: "completed", label: "Completed", icon: CheckCircle },
                    { key: "wishlist", label: "Wishlist", icon: Star },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-300 relative ${
                          activeTab === tab.key
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                        {activeTab === tab.key && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                  {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course: any, index: number) => (
                      <Link
                        key={course._id}
                        href={`/course-access/${course._id}`}
                        className="group block p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {/* Course Thumbnail */}
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={course.thumbnail?.url || "/placeholder-course.jpg"}
                              alt={course.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <PlayCircle className="w-8 h-8 text-white" />
                            </div>
                          </div>

                          {/* Course Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                              {course.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {course.description}
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                <span>Progress</span>
                                <span>25%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                                  style={{ width: "25%" }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Courses Yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start your learning journey today!
                      </p>
                      <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <BookOpen className="w-5 h-5" />
                        Browse Courses
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Learning Streak */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Learning Streak
                  </h3>
                </div>
                <div className="text-center py-6">
                  <div className="text-6xl mb-2">🔥</div>
                  <p className="text-4xl font-bold gradient-text mb-1">7 Days</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep it up!
                  </p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Achievements
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "🎯", title: "First Course", desc: "Enrolled in first course" },
                    { icon: "⭐", title: "Quick Learner", desc: "Completed 5 lessons" },
                    { icon: "🚀", title: "On Fire", desc: "7 day streak" },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Recent Activity
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Started lesson 3
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Completed lesson 2
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default StudentDashboard;