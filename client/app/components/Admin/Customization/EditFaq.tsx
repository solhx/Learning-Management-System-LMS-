"use client";
import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdSave, MdRefresh, MdCheck } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
};

type Props = {};

const EditFaq: FC<Props> = () => {
  const [questions, setQuestions] = useState<FaqItem[]>([
    { question: "", answer: "" },
  ]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { data, isLoading: fetchLoading, isError, error: fetchError, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: updateLoading, isSuccess, error }] = useEditLayoutMutation();

  // Load FAQ data
  useEffect(() => {
  if (data?.layout?.faq) {
    const items: FaqItem[] = data.layout.faq.map((item: FaqItem) => ({
      ...item,
    }));

    setQuestions(
      items.length > 0 ? items : [{ question: "", answer: "" }]
    );
  }
}, [data]);

  // Handle fetch error
  useEffect(() => {
    if (isError && fetchError) {
      console.error("Fetch error:", fetchError);
      if ("status" in fetchError) {
        if (fetchError.status === 404) {
          toast.error("FAQ data not found. You can create new FAQs below.");
          setQuestions([
            { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee on all our courses." },
            { question: "How do I access my courses?", answer: "After purchase, courses are immediately available in your dashboard." },
            { question: "Can I get a certificate?", answer: "Yes, you'll receive a certificate upon successful completion of each course." },
          ]);
        } else {
          toast.error("Failed to load FAQ data");
        }
      }
    }
  }, [isError, fetchError]);

  // Handle success/error for updates
  useEffect(() => {
    if (isSuccess) {
      toast.success("FAQ updated successfully! 🎉");
      refetch();
      setEditingIndex(null);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Failed to update FAQ");
      } else {
        toast.error("An error occurred while updating");
      }
    }
  }, [isSuccess, error, refetch]);

  // Toggle accordion
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Start editing
  const startEditing = (index: number) => {
    setEditingIndex(index);
    setActiveIndex(index);
  };

  // Stop editing
  const stopEditing = () => {
    setEditingIndex(null);
  };

  // Handle question change
  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  // Handle answer change
  const handleAnswerChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };

  // Add new question
  const handleAddQuestion = () => {
    const newQuestion = { question: "", answer: "" };
    setQuestions([...questions, newQuestion]);
    setActiveIndex(questions.length);
    setEditingIndex(questions.length);
    toast.success("New FAQ item added");
  };

  // Delete question
  const handleDeleteQuestion = (index: number) => {
    if (questions.length === 1) {
      toast.error("You must have at least one FAQ item");
      return;
    }
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setActiveIndex(null);
    setEditingIndex(null);
    toast.success("FAQ item removed");
  };

  // Duplicate question
  const handleDuplicateQuestion = (index: number) => {
    const duplicatedQuestion = { ...questions[index] };
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, duplicatedQuestion);
    setQuestions(updatedQuestions);
    setActiveIndex(index + 1);
    setEditingIndex(index + 1);
    toast.success("FAQ item duplicated");
  };

  // Move question up
  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index - 1]] = [updatedQuestions[index - 1], updatedQuestions[index]];
    setQuestions(updatedQuestions);
    setActiveIndex(index - 1);
    toast.success("FAQ moved up");
  };

  // Move question down
  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index + 1]] = [updatedQuestions[index + 1], updatedQuestions[index]];
    setQuestions(updatedQuestions);
    setActiveIndex(index + 1);
    toast.success("FAQ moved down");
  };

  // Check if data has changed
  const hasChanges = (): boolean => {
    if (!data?.layout?.faq) return true;
    return JSON.stringify(data.layout.faq) !== JSON.stringify(questions);
  };

  // Validate FAQ items
  const validateFaqs = (): boolean => {
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim() || !questions[i].answer.trim()) {
        toast.error(`Please fill in both question and answer for FAQ #${i + 1}`);
        setActiveIndex(i);
        setEditingIndex(i);
        return false;
      }
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateFaqs()) return;

    try {
      await editLayout({
        type: "FAQ",
        faq: questions.map(({ question, answer }) => ({ question, answer })),
      }).unwrap();
    } catch (err) {
      console.error("Failed to update FAQ:", err);
    }
  };

  // Reset to original values
  const handleReset = () => {
  if (data?.layout?.faq) {
    const items: FaqItem[] = data.layout.faq.map((item: FaqItem) => ({
      ...item,
    }));

    setQuestions(
      items.length > 0 ? items : [{ question: "", answer: "" }]
    );

    setActiveIndex(null);
    setEditingIndex(null);
    toast.success("Changes reset successfully");
  }
};


  // Show loader while fetching data
  if (fetchLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BsQuestionCircle className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit FAQ Section
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Manage frequently asked questions to help your users
              </p>
            </div>
          </div>
          
          {isError && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</span>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  FAQ data not found in database. You can create new FAQs below and save them.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-6">
          {questions.map((item, index) => (
            <div
              key={`faq-${index}`}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                activeIndex === index
                  ? "border-blue-500 dark:border-blue-400 shadow-xl"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-sm shadow-lg">
                      {index + 1}
                    </span>
                    {/* Move Up/Down Buttons */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveQuestionUp(index)}
                        disabled={index === 0}
                        className={`p-0.5 rounded text-xs ${
                          index === 0
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveQuestionDown(index)}
                        disabled={index === questions.length - 1}
                        className={`p-0.5 rounded text-xs ${
                          index === questions.length - 1
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                        {item.question || `New FAQ Question #${index + 1}`}
                      </h3>
                      {editingIndex === index && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                          Editing
                        </span>
                      )}
                    </div>
                    {activeIndex !== index && item.answer && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {item.answer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  {editingIndex !== index && (
                    <button
                      onClick={() => startEditing(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit FAQ"
                    >
                      <AiOutlineEdit className="text-xl" />
                    </button>
                  )}

                  {/* Done Editing Button */}
                  {editingIndex === index && (
                    <button
                      onClick={stopEditing}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Done editing"
                    >
                      <MdCheck className="text-xl" />
                    </button>
                  )}

                  {/* Duplicate Button */}
                  <button
                    onClick={() => handleDuplicateQuestion(index)}
                    className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                    title="Duplicate FAQ"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete FAQ"
                  >
                    <AiOutlineDelete className="text-xl" />
                  </button>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {activeIndex === index ? (
                      <HiMinus className="text-xl" />
                    ) : (
                      <HiPlus className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

              {/* Question Content (Expandable) */}
              {activeIndex === index && (
                <div className="p-6 space-y-5 border-t-2 border-gray-100 dark:border-gray-700">
                  {/* Question Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Question
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.question.length} characters
                      </span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="e.g., What is your refund policy?"
                      value={item.question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                    />
                  </div>

                  {/* Answer Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Answer
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.answer.length} characters
                      </span>
                    </div>
                    <textarea
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 resize-none transition-all duration-300"
                      placeholder="Enter a detailed answer to help your users..."
                      value={item.answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      rows={6}
                    />
                  </div>

                  {/* Preview */}
                  {item.question && item.answer && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">PREVIEW</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900 dark:text-white">{item.question}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

               {/* Add New Question Button */}
        <button
          onClick={handleAddQuestion}
          className="w-full py-5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg group"
        >
          <IoMdAddCircleOutline className="text-3xl group-hover:scale-110 transition-transform" />
          <span>Add New FAQ Question</span>
        </button>

        {/* Action Buttons - Sticky Footer */}
        <div className="sticky bottom-6 mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {hasChanges() ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    Unsaved changes
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    All saved
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {questions.length} FAQ{questions.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                disabled={!hasChanges() || updateLoading}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300 border-2
                  ${
                    hasChanges() && !updateLoading
                      ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:scale-105 active:scale-95"
                      : "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <MdRefresh className="text-xl" />
                <span>Reset</span>
              </button>

              {/* Save Button */}
              <button
                onClick={handleSubmit}
                disabled={!hasChanges() || updateLoading}
                className={`
                  flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold
                  transition-all duration-300 transform
                  ${
                    hasChanges() && !updateLoading
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-50"
                  }
                `}
              >
                {updateLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <MdSave className="text-xl" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <BsQuestionCircle className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {questions.length}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Total Questions
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-5 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <MdCheck className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {questions.filter((q) => q.question && q.answer).length}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-5 border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <AiOutlineEdit className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {questions.filter((q) => !q.question || !q.answer).length}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Incomplete
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info/Tips Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                💡 FAQ Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>
                    <strong>Keep questions concise:</strong> Aim for 5-10 words per question for clarity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>
                    <strong>Provide detailed answers:</strong> 50-150 words works best for readability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                  <span>
                    <strong>Order by importance:</strong> Put most common questions first using ▲ ▼ buttons
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">•</span>
                  <span>
                    <strong>Use simple language:</strong> Avoid technical jargon when possible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                  <span>
                    <strong>Update regularly:</strong> Review and update based on user feedback
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span>
                    <strong>Preview before saving:</strong> Check how your FAQ looks in the preview section
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ⌨️ Quick Actions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                Click Question
              </kbd>
              <span>Expand/Collapse</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                ✏️ Edit
              </kbd>
              <span>Start Editing</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                🗑️ Delete
              </kbd>
              <span>Remove FAQ</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                📋 Duplicate
              </kbd>
              <span>Clone FAQ</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
                Need Help?
              </h4>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">
                If you need assistance with your FAQs, contact our support team or refer to the documentation for more guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;