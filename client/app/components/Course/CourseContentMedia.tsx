import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import {
  PlayCircle,
  FileText,
  MessageCircle,
  Star,
  Send,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "../Admin/Course/Ratings";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});


type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch:any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {

  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [answer,setAnswer]= useState("")
  const [questionId,setQuestionId]= useState("")
  const [rating, setRating] = useState(1);
  const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation();
  const [addAnswerInQuestion,{ isSuccess:answerSuccess, error:answerError, isLoading: answerCreationLoading}]=useAddAnswerInQuestionMutation();
  const [addReviewInCourse,{ isSuccess:reviewSuccess, error:reviewError, isLoading: reviewCreationLoading}]=useAddReviewInCourseMutation();
  const [addReplyInReview, { isSuccess: replySuccess, error: replyError, isLoading: replyCreationLoading }] = useAddReplyInReviewMutation();

const {data:courseData,refetch:courseRefetch} = useGetCourseDetailsQuery(id,{refetchOnMountOrArgChange:true});
const course = courseData?.course;
  const isReviewExists =
    course?.reviews?.find((item: any) => item.user._id === user._id) ?? false;

   const [isReviewReply,setIsReviewReply] = useState(false)
   const [reply, setReply] = useState("")
   const [reviewId, setReviewId] = useState("")
   

const handleQuestion = () => {
  if (question.length === 0) {
    toast.error("Question can't be empty");
    return;
  } else {
   
    addNewQuestion({question,courseId:id, contentId: data[activeVideo]._id });
  }
};
const handleReviewReplySubmit = () => {
  if (!replyCreationLoading) {
    if (reply.trim().length === 0) {
      toast.error("Reply can't be empty");
      return;
    }
    addReplyInReview({ comment: reply, courseId: id, reviewId });
  }
};
useEffect(() => {
    console.log("=== COURSE DATA DEBUG ===");
    console.log("Full courseData:", courseData);
    console.log("Course object:", course);
    console.log("Reviews:", course?.reviews);
    console.log("Reviews length:", course?.reviews?.length);
    console.log("User ID:", user._id);
    console.log("========================");
  }, [courseData, course, user]);

useEffect(() => {
  if (isSuccess) {
    setQuestion('');
    refetch();
    toast.success('your Question Added successfully')
    socketId.emit("notification", {
  title: "New Question Received",
  message: `You have a new question from ${data[activeVideo].title}`,
  userId: user._id,
});

  }
  if(answerSuccess){
    setAnswer("");
    refetch();
    toast.success("Answer added successfully")
    if(user.role !== "admin"){
      socketId.emit("notification", {
  title: "New Reply Received",
  message: `You have a new question Reply in ${data[activeVideo].title}`,
  userId: user._id,
});
    }
  }
  if (error) {
    if ("data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }
  if(answerError){
    if ("data" in answerError) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }
  if (reviewSuccess) {
  setReview("");
  setRating(1);
  courseRefetch();
  toast.success("Review added successfully");
  socketId.emit("notification", {
  title: "New Review Received",
  message: `You have a new review from ${data[activeVideo].title}`,
  userId: user._id,
});
}

if (reviewError) {
  if ("data" in reviewError) {
    const errorMessage = reviewError as any;
    toast.error(errorMessage.data.message);
  } else {
    toast.error("Something went wrong!");
  }
}
if (replySuccess) {
  setReply('');
  courseRefetch();
  toast.success("Reply added successfully");
}

if (replyError){
  if("data" in replyError) {
  const errorMessage = replyError as any;
  toast.error(errorMessage.data.message);
  }
}


}, [isSuccess, error,answerError,answerSuccess,reviewSuccess,reviewError,replySuccess,replyError]);

const handleAnswerSubmit=()=>{
   
addAnswerInQuestion({answer,
      courseId:id,
      contentId:data[activeVideo]._id,
      questionId:questionId,})
};

const handleReviewSubmit = async () => {
  if (review.length === 0) {
    toast.error("Review can't be empty");
    return;
  }

  // Check if user has purchased the course
  const hasPurchased = user?.courses?.some((course: any) => course.courseId === id);
  if (!hasPurchased) {
    toast.error("You do not have permission to review this course");
    return;
  }

  addReviewInCourse({
    review,
    rating,
    courseId: id,
  });
};


  const tabs = [
    { name: "Overview", icon: PlayCircle },
    { name: "Resources", icon: FileText },
    { name: "Q&A", icon: MessageCircle },
    { name: "Reviews", icon: Star },
  ];

  return (
    <div className="w-full pt-[80px] max-w-[1400px] mx-auto px-4 py-6">
      {/* Video Player Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-700 mb-6">
        <CoursePlayer
          title={data?.[activeVideo]?.title}
          videoUrl={data?.[activeVideo]?.videoUrl}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          disabled={activeVideo === 0}
          onClick={() => {
            if (activeVideo === 0) return;
            setActiveVideo(activeVideo - 1);
          }}
          className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeVideo === 0
              ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          }`}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex-1 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lesson {activeVideo + 1} of {data?.length}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((activeVideo + 1) / data?.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          disabled={activeVideo === data.length - 1}
          onClick={() => {
            if (activeVideo === data.length - 1) return;
            setActiveVideo(activeVideo + 1);
          }}
          className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeVideo === data.length - 1
              ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
          }`}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Video Title */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {data[activeVideo]?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Duration: {data[activeVideo]?.videoLength || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveBar(index)}
                className={`relative flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-all duration-300 ${
                  activeBar === index
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
                {activeBar === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 min-h-[400px]">
        {/* Overview Tab */}
        {activeBar === 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lesson Overview
              </h2>
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
              {data[activeVideo]?.description}
            </p>
          </div>
        )}

        {/* Resources Tab */}
        {activeBar === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Course Resources
              </h2>
            </div>

            {data[activeVideo]?.links?.length > 0 ? (
              <div className="space-y-3">
                {data[activeVideo]?.links?.map((item: any, index: number) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <LinkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title || "Resource"}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                        {item.url}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No resources available for this lesson
                </p>
              </div>
            )}
          </div>
        )}

        {/* Q&A Tab */}
        {activeBar === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ask a Question
              </h2>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                    <Image
                      src={user?.avatar?.url || "/assets/hoss.png"}
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <textarea
                    name="comment"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={5}
                    placeholder="Write your question here... Our instructors will respond within 24 hours."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {question.length} / 500 characters
                    </p>
                    <button
                      disabled={!question.trim()}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        question.trim()
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                      } ${questionCreationLoading && 'cursor-not-allowed'}`}
                      onClick={ questionCreationLoading ? ()=>{}:handleQuestion}
                    >
                      <Send className="w-4 h-4" />
                      Submit Question
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List Placeholder */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Questions
              </h3>
             <CommentReply
  data={data}
  activeVideo={activeVideo}
  answer={answer}
  setAnswer={setAnswer}
  handleAnswerSubmit={handleAnswerSubmit}
  user={user}
  setQuestionId={setQuestionId}
  answerCreationLoading={answerCreationLoading}
/>

            </div>
          </div>
        )}

        {/* Reviews Tab */}
{/* Reviews Tab */}
{/* Reviews Tab */}
{activeBar === 3 && (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
        <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Course Reviews
      </h2>
    </div>

    {/* Add Review Form - Only if user hasn't reviewed yet */}
    {!isReviewExists && (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-gray-700 mb-8">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-800">
              <Image
                src={user?.avatar?.url || "/assets/hoss.png"}
                alt="User Avatar"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Share Your Experience
            </h3>

            {/* Star Rating Selection */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rating:
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                    type="button"
                  >
                    {rating >= i ? (
                      <AiFillStar
                        className="cursor-pointer"
                        color="rgb(250, 204, 21)"
                        size={32}
                      />
                    ) : (
                      <AiOutlineStar
                        className="cursor-pointer"
                        color="rgb(250, 204, 21)"
                        size={32}
                      />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                {rating}.0 {rating === 5 ? "★" : ""}
              </span>
            </div>

            {/* Rating Description */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {rating === 1 && "😞 Poor - Needs major improvements"}
                {rating === 2 && "😐 Fair - Could be better"}
                {rating === 3 && "🙂 Good - Satisfactory experience"}
                {rating === 4 && "😊 Very Good - Great experience!"}
                {rating === 5 && "🤩 Excellent - Outstanding!"}
              </p>
            </div>

            {/* Review Text */}
            <textarea
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              placeholder="Tell us about your experience with this course... What did you like? What could be improved?"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none"
            />

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {review.length} / 1000 characters
              </p>
              <button
                onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}
                disabled={!review.trim() || rating === 0 || reviewCreationLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  review.trim() && rating > 0 && !reviewCreationLoading
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                {reviewCreationLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* User's Existing Review - If they've already reviewed */}
    {isReviewExists && (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-gray-700 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thank you for your review!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You have already reviewed this course
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-lg">
          <Ratings rating={isReviewExists.rating} />
          <span className="font-semibold text-gray-900 dark:text-white">
            Your rating: {isReviewExists.rating}.0
          </span>
        </div>
      </div>
    )}

    {/* Reviews List */}
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Student Reviews
        </h3>
        {course?.reviews && course.reviews.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
            <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900 dark:text-white">
              {course?.reviews?.length} {course?.reviews?.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        )}
      </div>

      {course?.reviews && course.reviews.length > 0 ? (
        <div className="space-y-4">
          {[...course.reviews].reverse().map((item: any, index: number) => (
            <div
              key={item._id || index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-300"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-yellow-100 dark:ring-yellow-900">
                    <Image
                      src={
                        item.user.avatar?.url ||
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={48}
                      height={48}
                      alt={item.user.name || "User Avatar"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item?.user?.name}
                        </h5>
                        {item?.user?._id === user._id && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Ratings rating={item?.rating} />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {item?.rating}.0
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(item?.createdAt)}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                    {item?.comment}
                  </p>

                  {/* Admin Reply Button */}
                  {user.role === "admin" && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          setIsReviewReply(!isReviewReply);
                          setReviewId(item._id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <BiMessage className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {isReviewReply && reviewId === item._id ? "Hide Reply Form" : "Add Reply"}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Admin Reply Input */}
                  {user.role === "admin" && isReviewReply && reviewId === item._id && (
                    <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-800">
                            <Image
                              src={user?.avatar?.url || "/assets/hoss.png"}
                              alt={user?.name || "Admin"}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user?.name}
                            </span>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30">
                              <VscVerifiedFilled className="w-3 h-3 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                Instructor
                              </span>
                            </div>
                          </div>

                          <textarea
                            placeholder="Write your reply to this review..."
                            value={reply}
                            onChange={(e: any) => setReply(e.target.value)}
                            rows={3}
                            disabled={replyCreationLoading}
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          />

                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {reply.length} / 500 characters
                            </p>

                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setIsReviewReply(false);
                                  setReply("");
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleReviewReplySubmit}
                                disabled={reply.trim() === "" || replyCreationLoading}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                  reply.trim() !== "" && !replyCreationLoading
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {replyCreationLoading ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Sending...</span>
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4" />
                                    <span>Submit Reply</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Display Replies */}
                  {item.commentReplies && item.commentReplies.length > 0 && (
                    <div className="mt-6 space-y-4 pl-4 border-l-2 border-green-200 dark:border-green-800">
                      <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Instructor Replies ({item.commentReplies.length})
                      </h6>
                      {item.commentReplies.map((commentReply: any, replyIndex: number) => (
                        <div
                          key={replyIndex}
                          className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-100 dark:ring-green-900">
                                <Image
                                  src={
                                    commentReply.user?.avatar?.url ||
                                    "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                  }
                                  width={40}
                                  height={40}
                                  alt={commentReply.user?.name || "User Avatar"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h6 className="text-base font-semibold text-gray-900 dark:text-white">
                                  {commentReply.user?.name}
                                </h6>
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30">
                                  <VscVerifiedFilled className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                    Instructor
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm leading-relaxed">
                                {commentReply.comment}
                              </p>

                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {format(commentReply.createdAt)}
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
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Reviews Yet
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to review this course!
          </p>
        </div>
      )}
    </div>
  </div>
)}
      </div>
    </div>
  );
};
const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full space-y-4">
        {data[activeVideo]?.questions?.length > 0 ? (
          data[activeVideo].questions.map((item: any, index: number) => (
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              setQuestionId={setQuestionId}
              item={item}
              index={index}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              answerCreationLoading={answerCreationLoading}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No questions yet. Be the first to ask!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const CommentItem = ({
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
      {/* Question Header */}
      <div className="flex gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 dark:ring-blue-900">
            <Image
              src={item.user.avatar?.url || "/assets/hoss.png"}
              alt={item.user.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.user.name}
            </h5>
            {item.user.role === "admin" && (
              <VscVerifiedFilled className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            {item.question}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{item.createdAt ? format(item.createdAt) : "Just now"}</span>
          </div>
        </div>
      </div>

      {/* Reply Button */}
      <div className="flex items-center gap-4 ml-16 mb-3">
        <button
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(item._id);
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
        >
          <BiMessage className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {!replyActive
              ? item.questionReplies.length !== 0
                ? `View ${item.questionReplies.length} ${
                    item.questionReplies.length === 1 ? "Reply" : "Replies"
                  }`
                : "Add Reply"
              : "Hide Replies"}
          </span>
        </button>

        {item.questionReplies.length > 0 && (
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-4 h-4" />
            {item.questionReplies.length}
          </span>
        )}
      </div>

      {/* Replies Section */}
      {replyActive && (
        <div className="ml-16 mt-4 space-y-4 border-l-2 border-blue-200 dark:border-blue-800 pl-6">
          {item.questionReplies.map((reply: any, index: number) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-100 dark:ring-green-900">
                    <Image
                      src={
                        reply.user.avatar?.url ||
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={40}
                      height={40}
                      alt={reply.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h6 className="text-base font-semibold text-gray-900 dark:text-white">
                      {reply.user.name}
                    </h6>
                    {reply.user.role === "admin" && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <VscVerifiedFilled className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          Instructor
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm leading-relaxed">
                    {reply.answer}
                  </p>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(reply.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Reply Input */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">You</span>
                </div>
              </div>

              <div className="flex-1">
                <textarea
                  placeholder="Write your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  rows={3}
                  disabled={answerCreationLoading}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {answer.length} / 500 characters
                  </p>

                  <button
                    type="submit"
                    onClick={handleAnswerSubmit}
                    disabled={
                      answer.trim() === "" || answerCreationLoading
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      answer.trim() !== "" && !answerCreationLoading
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {answerCreationLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Reply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;