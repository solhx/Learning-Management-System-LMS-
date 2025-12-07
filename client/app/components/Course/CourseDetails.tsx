import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "../Admin/Course/Ratings";
import {
  IoCheckmarkDoneOutline,
  IoCloseOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { styles } from "@/app/styles/style";
import {Elements} from "@stripe/react-stripe-js";
import Link from "next/link";
import CheckOutForm from "../Payment/CheckOutForm";
import CourseContentList from "../Course/CourseContentList";
import Image from "next/image";
import {
  Users,
  Star,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  ShoppingCart,
  PlayCircle,
  CheckCircle2,
  Target,
} from "lucide-react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute:any;
  setOpen:any;
};

const CourseDetails = ({ data, stripePromise, clientSecret,setRoute,setOpen:openAuthModel }: Props) => {
  const { data:userData } = useLoadUserQuery(undefined,{});
  const [user, setUser] = useState<any>();
 
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
   setUser(userData?.user)
  }, [userData])
  


  // Calculate discount percentage
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  // Check if user purchased course or is admin
  const isPurchased =
    user && (user?.role === 'admin' || user?.courses?.find((item: any) => item.courseId === data._id));

  const handleOrder = (e: any) => {
    if(user){
      setOpen(true);
    }else{
      setRoute("Login");
      openAuthModel(true);
    }
  };
    

  return (
    <div>
      <div className="relative w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 py-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 hero_animation opacity-10"></div>
        <div className="particles-container">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-[90%] 800px:w-[90%] max-w-[1400px] m-auto py-5">
          <div className="w-full flex flex-col-reverse 800px:flex-row gap-8">
            {/* Left Column - Course Content */}
            <div className="w-full 800px:w-[65%]">
              {/* Course Header Card */}
              <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6 shadow-lg">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Link
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    href="/courses"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Courses
                  </Link>
                  <span>/</span>
                  <span className="text-gray-900 dark:text-white">
                    {data.name}
                  </span>
                </div>

                {/* Course Title */}
                <h1 className="text-3xl 800px:text-4xl font-bold font-Poppins text-gray-900 dark:text-white mb-4">
                  {data.name}
                </h1>

                {/* Course Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <Ratings rating={data.ratings} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {data.reviews?.length} Reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {data.purchased}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Certificate
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-Poppins text-gray-900 dark:text-white">
                    What You will Learn
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.benefits?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300 font-Poppins">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-Poppins text-gray-900 dark:text-white">
                    Prerequisites
                  </h2>
                </div>

                <div className="space-y-3">
                  {data?.prerequisites?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300 font-Poppins">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-Poppins text-gray-900 dark:text-white">
                    Course Content
                  </h2>
                </div>

                <CourseContentList data={data?.courseData} isDemo={true} />
              </div>

              {/* Course Description */}
              <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6 shadow-lg">
                <h2 className="text-2xl font-bold font-Poppins text-gray-900 dark:text-white mb-6">
                  Course Details
                </h2>
                <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300 font-Poppins">
                  {data?.description}
                </p>
              </div>

              {/* Reviews Section */}
              {/* Reviews Section */}
<div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold font-Poppins text-gray-900 dark:text-white mb-2">
        Student Reviews
      </h2>
      <div className="flex items-center gap-3">
        <Ratings rating={data?.ratings} />
        <span className="text-3xl font-bold gradient-text">
          {Number.isInteger(data?.ratings)
            ? data?.ratings.toFixed(1)
            : data?.ratings.toFixed(2)}
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          ({data?.reviews?.length} reviews)
        </span>
      </div>
    </div>
  </div>

  <div className="space-y-6">
    {data?.reviews &&
      [...data.reviews]
        .reverse()
        .map((item: any, index: number) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700"
          >
            {/* Main Review */}
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-blue-100 dark:ring-blue-900">
                  <Image
                    src={item.user.avatar?.url || "/assets/hoss.png"}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {item.user.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(item.createdAt)}
                  </span>
                </div>
                <Ratings rating={item.rating} />
                <p className="mt-3 text-gray-700 dark:text-gray-300 font-Poppins">
                  {item.comment}
                </p>

                {/* Instructor Replies */}
                {item.commentReplies && item.commentReplies.length > 0 && (
                  <div className="mt-6 space-y-4 pl-4 border-l-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Instructor Response{item.commentReplies.length > 1 ? 's' : ''} ({item.commentReplies.length})
                      </h6>
                    </div>

                    {item.commentReplies.map((reply: any, replyIndex: number) => (
                      <div
                        key={replyIndex}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-100 dark:border-green-900/30 shadow-sm"
                      >
                        <div className="flex gap-3">
                          {/* Instructor Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-200 dark:ring-green-800">
                              <Image
                                src={
                                  reply.user?.avatar?.url ||
                                  "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                }
                                width={40}
                                height={40}
                                alt={reply.user?.name || "Instructor"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h6 className="text-base font-semibold text-gray-900 dark:text-white">
                                {reply.user?.name || "Instructor"}
                              </h6>
                              {/* Instructor Badge */}
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                                <Award className="w-3 h-3 text-green-600 dark:text-green-400" />
                                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                  Instructor
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm leading-relaxed">
                              {reply.comment}
                            </p>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {format(reply.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
  </div>
</div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="w-full 800px:w-[35%]">
              <div className="sticky top-[100px] left-0 z-50">
                {/* Video Player Card */}
                <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                </div>

                {/* Pricing Card */}
                <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                  {/* Price Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold gradient-text">
                          {data?.price === 0 ? "Free" : `$${data?.price}`}
                        </span>
                        {data?.price > 0 && (
                          <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                            ${data?.estimatedPrice}
                          </span>
                        )}
                      </div>
                      {data?.price > 0 && (
                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                          <Sparkles className="w-3 h-3 text-white" />
                          <span className="text-sm font-bold text-white">
                            {discountPercentagePrice}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  {isPurchased ?(
                    <Link
                      href={`/course-access/${data._id}`}
                      className="group w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Enter Course
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      onClick={handleOrder}
                      className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Now ${data.price}
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Features List */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-Poppins">Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-Poppins">
                        Certificate of Completion
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-Poppins">Community Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <>
  {open && (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform transition-all">
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Complete Your Purchase</h3>
                    <p className="text-sm text-blue-100">Secure payment powered by Stripe</p>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors group"
                >
                  <IoCloseOutline className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Course Summary */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {data?.name}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold gradient-text">
                      ${data?.price}
                    </span>
                    {data?.estimatedPrice > data?.price && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${data?.estimatedPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-xs font-bold text-white">
                          {discountPercentagePrice}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              {stripePromise && clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Loading payment...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>256-bit SSL Encrypted</span>
                </div>
                <span>•</span>
                <span>Powered by Stripe</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</>
    </div>
  );
};

export default CourseDetails;
