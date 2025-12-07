import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "../../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Category", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white dark:bg-[#1b1b1b]
          p-8 md:p-12 
          rounded-2xl 
          border border-gray-200 dark:border-[#333]
          shadow-[0_4px_20px_rgba(0,0,0,0.07)]
          space-y-7
          transition
        "
      >
        {/* Course Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            Course Name
          </label>
          <input
            type="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with Next.js"
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-[#111]
              border border-gray-300 dark:border-[#444]
              focus:outline-none focus:border-blue-500
              focus:ring-2 focus:ring-blue-400/40
              transition
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Course Description
          </label>
          <textarea
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-[#111]
              border border-gray-300 dark:border-[#444]
              focus:outline-none focus:border-blue-500
              focus:ring-2 focus:ring-blue-400/40
              transition
            "
            value={courseInfo.description}
            rows={6}
            placeholder="Write something amazing..."
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* Price + Estimated Price */}
        <div className="w-full flex gap-5 flex-col md:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Course Price
            </label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
              "
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Estimated Price (optional)
            </label>
            <input
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              placeholder="79"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
              "
            />
          </div>
        </div>

        {/* Tags + Categories */}
        <div className="w-full flex gap-5 flex-col md:flex-row">
          {/* Tags */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Course Tags
            </label>
            <input
              type="text"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="MERN Tailwind LMS etc..."
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
              "
            />
          </div>

          {/* Categories */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Course Categories
            </label>

            <select
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                text-gray-700 dark:text-gray-300
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
                cursor-pointer
              "
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option
                  key={item._id}
                  value={item.title}
                  className="bg-white dark:bg-[#111] text-gray-800 dark:text-gray-200"
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level + Demo URL */}
        <div className="w-full flex gap-5 flex-col md:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Course Level
            </label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner / Intermediate / Expert"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
              "
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Demo URL
            </label>
            <input
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="https://example.com"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-[#111]
                border border-gray-300 dark:border-[#444]
                focus:outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-400/40
                transition
              "
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={`
              w-full min-h-[180px] rounded-xl border-2 border-dashed
              flex items-center justify-center text-sm text-gray-500
              cursor-pointer transition
              ${
                dragging
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 dark:bg-[#111] border-gray-300 dark:border-[#444]"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-[180px] w-full object-cover rounded-xl"
              />
            ) : (
              <span>Drag & drop thumbnail here or click to browse</span>
            )}
          </label>
        </div>

        {/* Submit */}
        <div className="w-full flex justify-end">
          <input
            type="submit"
            value="Next"
            className="
              w-full md:w-[180px] 
              h-[45px]
              bg-blue-600 hover:bg-blue-500 
              rounded-xl 
              text-white font-medium
              shadow-sm
              transition
              cursor-pointer
            "
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
