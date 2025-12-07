"use client";
import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdSave, MdRefresh, MdDragIndicator } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

type CategoryItem = {
  _id?: string;
  title: string;
};

type Props = {};

const EditCategories: FC<Props> = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([
    { title: "" },
  ]);

  const { data, isLoading: fetchLoading, isError, error: fetchError, refetch } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: updateLoading, isSuccess, error }] = useEditLayoutMutation();

  // Load categories data
  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories.length > 0 ? data.layout.categories : [{ title: "" }]);
    }
  }, [data]);

  // Handle fetch error
  useEffect(() => {
    if (isError && fetchError) {
      console.error("Fetch error:", fetchError);
      if ("status" in fetchError) {
        if (fetchError.status === 404) {
          toast.error("Categories not found. You can create new categories below.");
          setCategories([
            { title: "Web Development" },
            { title: "Mobile Development" },
            { title: "Data Science" },
            { title: "UI/UX Design" },
            { title: "Digital Marketing" },
          ]);
        } else {
          toast.error("Failed to load categories");
        }
      }
    }
  }, [isError, fetchError]);

  // Handle success/error for updates
  useEffect(() => {
    if (isSuccess) {
      toast.success("Categories updated successfully! 🎉");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Failed to update categories");
      } else {
        toast.error("An error occurred while updating");
      }
    }
  }, [isSuccess, error, refetch]);

  // Handle category change
  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index].title = value;
    setCategories(updatedCategories);
  };

  // Add new category
  const handleAddCategory = () => {
    setCategories([...categories, { title: "" }]);
    toast.success("New category added");
  };

  // Delete category
  const handleDeleteCategory = (index: number) => {
    if (categories.length === 1) {
      toast.error("You must have at least one category");
      return;
    }
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    toast.success("Category removed");
  };

  // Duplicate category
  const handleDuplicateCategory = (index: number) => {
    const duplicatedCategory = { ...categories[index] };
    const updatedCategories = [...categories];
    updatedCategories.splice(index + 1, 0, duplicatedCategory);
    setCategories(updatedCategories);
    toast.success("Category duplicated");
  };

  // Move category up
  const moveCategoryUp = (index: number) => {
    if (index === 0) return;
    const updatedCategories = [...categories];
    [updatedCategories[index], updatedCategories[index - 1]] = [updatedCategories[index - 1], updatedCategories[index]];
    setCategories(updatedCategories);
    toast.success("Category moved up");
  };

  // Move category down
  const moveCategoryDown = (index: number) => {
    if (index === categories.length - 1) return;
    const updatedCategories = [...categories];
    [updatedCategories[index], updatedCategories[index + 1]] = [updatedCategories[index + 1], updatedCategories[index]];
    setCategories(updatedCategories);
    toast.success("Category moved down");
  };

  // Check if data has changed
  const hasChanges = (): boolean => {
    if (!data?.layout?.categories) return true;
    return JSON.stringify(data.layout.categories) !== JSON.stringify(categories);
  };

  // Validate categories
  const validateCategories = (): boolean => {
    for (let i = 0; i < categories.length; i++) {
      if (!categories[i].title.trim()) {
        toast.error(`Please enter a title for category #${i + 1}`);
        return false;
      }
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateCategories()) return;

    try {
      await editLayout({
        type: "Category",
        categories: categories.map(({ title }) => ({ title })),
      }).unwrap();
    } catch (err) {
      console.error("Failed to update categories:", err);
    }
  };

  // Reset to original values
  const handleReset = () => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories.length > 0 ? data.layout.categories : [{ title: "" }]);
      toast.success("Changes reset successfully");
    }
  };

  // Show loader while fetching data
  if (fetchLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <BiCategory className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Edit Course Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Manage course categories to organize your content
              </p>
            </div>
          </div>
          
          {isError && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</span>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Categories not found in database. You can create new categories below and save them.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {categories.map((category, index) => (
            <div
              key={`category-${index}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-5">
                {/* Header with number and controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-bold text-sm shadow-lg">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveCategoryUp(index)}
                        disabled={index === 0}
                        className={`p-0.5 rounded text-xs ${
                          index === 0
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        }`}
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveCategoryDown(index)}
                        disabled={index === categories.length - 1}
                        className={`p-0.5 rounded text-xs ${
                          index === categories.length - 1
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        }`}
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Duplicate Button */}
                    <button
                      onClick={() => handleDuplicateCategory(index)}
                      className="p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                      title="Duplicate category"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCategory(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Category Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    placeholder="e.g., Web Development"
                    value={category.title}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                  />
                </div>

                {/* Character Count */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                  {category.title.length} characters
                </div>

                {/* Preview Badge */}
                {category.title && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">PREVIEW</p>
                    <span className="inline-flex px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg">
                      {category.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Category Button */}
        <button
          onClick={handleAddCategory}
          className="w-full py-5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:border-green-500 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg group"
        >
          <IoMdAddCircleOutline className="text-3xl group-hover:scale-110 transition-transform" />
          <span>Add New Category</span>
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
                {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
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
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 active:scale-95"
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
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-5 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <BiCategory className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {categories.length}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Total Categories
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl p-5 border-2 border-teal-200 dark:border-teal-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <BsGridFill className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {categories.filter((c) => c.title).length}
                </div>
                <div className="text-sm text-teal-700 dark:text-teal-300 font-medium">
                  Completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-5 border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <AiOutlinePlus className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {categories.filter((c) => !c.title).length}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Incomplete
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Examples */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                💡 Category Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                  <span>
                    <strong>Be specific:</strong> Use clear, descriptive names (e.g., `Web Development` instead of `Programming``)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>
                    <strong>Keep it concise:</strong> Aim for 1-4 words per category name
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>
                    <strong>Avoid overlap:</strong> Make sure categories are distinct and do not duplicate content
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>
                    <strong>Order by popularity:</strong> Put the most popular categories first using ▲ ▼ buttons
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">•</span>
                  <span>
                    <strong>Update regularly:</strong> Add new categories as your course library grows
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Category Examples */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span>🎯</span>
            <span>Popular Category Examples</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Web Development",
              "Mobile Development",
              "Data Science",
              "Machine Learning",
              "UI/UX Design",
              "Digital Marketing",
              "Graphic Design",
              "Business",
              "Photography",
              "Music",
              "Language Learning",
              "Personal Development"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  const emptyIndex = categories.findIndex(c => !c.title);
                  if (emptyIndex !== -1) {
                    handleCategoryChange(emptyIndex, example);
                    toast.success(`Added "${example}"`);
                  } else {
                    setCategories([...categories, { title: example }]);
                    toast.success(`Added "${example}"`);
                  }
                }}
                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-600"
              >
                {example}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            💡 Click any example to quickly add it to your categories
          </p>
        </div>

        {/* Quick Actions Guide */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ⌨️ Quick Actions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                ▲ ▼
              </kbd>
              <span>Reorder</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                📋 Duplicate
              </kbd>
              <span>Clone Category</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                🗑️ Delete
              </kbd>
              <span>Remove</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">
                💾 Save
              </kbd>
              <span>Save All</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                Organizing Your Categories
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Categories help students find relevant courses quickly. Use the reorder buttons to prioritize popular categories, and keep your list focused by avoiding too many similar categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;