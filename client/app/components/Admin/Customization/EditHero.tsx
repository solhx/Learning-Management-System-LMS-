"use client";
import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { MdSave, MdRefresh, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type StatItem = {
  icon: string;
  label: string;
  value: string;
  color: string;
};

type Props = {};

const EditHero: FC<Props> = () => {
  // State Management
  const [image, setImage] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [primaryButton, setPrimaryButton] = useState<string>("");
  const [secondaryButton, setSecondaryButton] = useState<string>("");
  const [stats, setStats] = useState<StatItem[]>([
    { icon: "Users", label: "Active Students", value: "50K+", color: "blue" },
    { icon: "BookOpen", label: "Courses", value: "500+", color: "purple" },
    { icon: "Award", label: "Certificates", value: "30K+", color: "indigo" },
    { icon: "TrendingUp", label: "Success Rate", value: "95%", color: "pink" },
  ]);

  // API Hooks
  const { data, isLoading: fetchLoading, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: updateLoading, isSuccess, error }] = useEditLayoutMutation();

  // Load data from API
  useEffect(() => {
    if (data?.layout?.banner) {
      const banner = data.layout.banner;
      setBadge(banner.badge || "");
      setTitle(banner.title || "");
      setSubtitle(banner.subtitle || "");
      setDescription(banner.description || "");
      setPrimaryButton(banner.primaryButton || "");
      setSecondaryButton(banner.secondaryButton || "");
      setImage(banner.image?.url || "");
      if (banner.stats && Array.isArray(banner.stats) && banner.stats.length > 0) {
        setStats(banner.stats);
      }
    }
  }, [data]);

  // Handle Success/Error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero section updated successfully! 🎉");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Failed to update hero section");
      } else {
        toast.error("An error occurred while updating");
      }
    }
  }, [isSuccess, error, refetch]);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2 && event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove Image Handler
  const handleRemoveImage = () => {
    setImage("");
    toast.success("Image removed. Will revert to default background.");
  };

  // Stat Change Handler
  const handleStatChange = (index: number, field: keyof StatItem, value: string) => {
    const updatedStats = [...stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setStats(updatedStats);
  };

  // Submit Handler
  const handleSubmit = async () => {
    try {
      await editLayout({
        type: "Banner",
        image,
        badge,
        title,
        subtitle,
        description,
        primaryButton,
        secondaryButton,
        stats,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update layout:", err);
    }
  };

  // Check if data has changed
  const hasChanges = (): boolean => {
    if (!data?.layout?.banner) return true;

    const banner = data.layout.banner;
    return (
      banner.badge !== badge ||
      banner.title !== title ||
      banner.subtitle !== subtitle ||
      banner.description !== description ||
      banner.primaryButton !== primaryButton ||
      banner.secondaryButton !== secondaryButton ||
      banner.image?.url !== image ||
      JSON.stringify(banner.stats) !== JSON.stringify(stats)
    );
  };

  // Reset to original values
  const handleReset = () => {
    if (data?.layout?.banner) {
      const banner = data.layout.banner;
      setBadge(banner.badge || "");
      setTitle(banner.title || "");
      setSubtitle(banner.subtitle || "");
      setDescription(banner.description || "");
      setPrimaryButton(banner.primaryButton || "");
      setSecondaryButton(banner.secondaryButton || "");
      setImage(banner.image?.url || "");
      if (banner.stats && banner.stats.length > 0) {
        setStats(banner.stats);
      }
      toast.success("Changes reset successfully");
    }
  };

  // Show loader while fetching data
  if (fetchLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Edit Hero Section
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Customize your landing page hero section to engage your audience
          </p>
        </div>

        {/* Image Upload */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <BiImageAdd className="text-blue-600" />
              Hero Background Image
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Optional background image for the hero section. Leave empty for default animated background.
            </p>
          </div>
          <div className="p-6">
            <div className="relative w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 group">
              {image ? (
                <>
                  <img
                    src={image}
                    alt="Hero banner preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Remove Image Button */}
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-5 right-5 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-red-500/50 hover:scale-110 active:scale-95 z-10"
                    title="Remove image"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <AiOutlineCamera className="text-7xl mb-3 animate-pulse" />
                  <p className="text-base font-medium">No image uploaded</p>
                  <p className="text-xs mt-2">Click the camera button to upload</p>
                  <p className="text-xs mt-1 text-gray-500">Default animated background will be used</p>
                </div>
              )}
              <input
                type="file"
                name="banner"
                id="banner-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="banner-upload"
                className="absolute bottom-5 right-5 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-110 active:scale-95"
              >
                <AiOutlineCamera className="text-2xl" />
              </label>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>💡 Tip:</span>
              <span>Recommended size: 1920x1080px, Max: 5MB. Leave empty for animated gradient background.</span>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Badge Text
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="🎓 Join 50,000+ learners worldwide"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Small text badge that appears above the main title
          </p>
        </div>

        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Main Title <span className="text-purple-600">(Gradient)</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Transform Your"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              First line with gradient effect
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Learning Journey"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Second line of the main heading
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 resize-none transition-all duration-300"
            placeholder="Unlock your potential with cutting-edge courses, expert instructors, and a community of passionate learners. Start learning today."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Supporting text below the main title
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Call-to-Action Buttons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Button
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Start Learning Free"
                value={primaryButton}
                onChange={(e) => setPrimaryButton(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Button
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Watch Demo"
                value={secondaryButton}
                onChange={(e) => setSecondaryButton(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Statistics Cards
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Configure the four statistics displayed in the hero section
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Stat Card #{index + 1}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        stat.color === "blue"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : stat.color === "purple"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                          : stat.color === "indigo"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                          : "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300"
                      }`}
                    >
                      {stat.color.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Label
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={stat.label}
                        onChange={(e) => handleStatChange(index, "label", e.target.value)}
                        placeholder="Active Students"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Value
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={stat.value}
                        onChange={(e) => handleStatChange(index, "value", e.target.value)}
                        placeholder="50K+"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Icon
                      </label>
                      <select
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer"
                        value={stat.icon}
                        onChange={(e) => handleStatChange(index, "icon", e.target.value)}
                      >
                        <option value="Users">Users 👥</option>
                        <option value="BookOpen">Book Open 📖</option>
                        <option value="Award">Award 🏆</option>
                        <option value="TrendingUp">Trending Up 📈</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Color
                      </label>
                      <select
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer"
                        value={stat.color}
                        onChange={(e) => handleStatChange(index, "color", e.target.value)}
                      >
                        <option value="blue">Blue 🔵</option>
                        <option value="purple">Purple 🟣</option>
                        <option value="indigo">Indigo 🟣</option>
                        <option value="pink">Pink 🩷</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

               {/* Action Buttons - Sticky Footer */}
        <div className="sticky bottom-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Status Text */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {hasChanges() ? (
                <span className="text-red-500 font-semibold">You have unsaved changes</span>
              ) : (
                <span className="text-green-500 font-semibold">All changes saved</span>
              )}
            </div>

            {/* Buttons */}
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
                Reset
              </button>

              {/* Save Button */}
              <button
                onClick={handleSubmit}
                disabled={!hasChanges() || updateLoading}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
                  transition-all duration-300
                  ${
                    hasChanges() && !updateLoading
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                      : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <MdSave className="text-xl" />
                {updateLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {/* Final Spacing */}
        <div className="h-[120px]" />
      </div>
    </div>
  );
};

export default EditHero;