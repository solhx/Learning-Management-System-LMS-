"use client";
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any[];
  setCourseContentData: (data: any[]) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index: number) => {
    const updated = [...isCollapsed];
    updated[index] = !updated[index];
    setIsCollapsed(updated);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updated = JSON.parse(JSON.stringify(courseContentData));
    updated[index].links.splice(linkIndex, 1);
    setCourseContentData(updated);
  };

  const handleAddLink = (index: number) => {
    const updated = JSON.parse(JSON.stringify(courseContentData));
    updated[index].links.push({ title: "", url: "" });
    setCourseContentData(updated);
  };

  const newContentHandler = (item: any) => {
    if (
      !item.title ||
      !item.description ||
      !item.videoUrl ||
      !item.links[0].title ||
      !item.links[0].url
    ) {
      toast.error("Please fill all the fields first!");
      return;
    }

    const lastSection =
      courseContentData[courseContentData.length - 1].videoSection || "";

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: lastSection,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    const last = courseContentData[courseContentData.length - 1];

    if (
      !last.title ||
      !last.description ||
      !last.videoUrl ||
      !last.links[0].title ||
      !last.links[0].url
    ) {
      toast.error("Please fill all the fields first");
      return;
    }

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: `Untitled Section ${activeSection}`,
      links: [{ title: "", url: "" }],
    };

    setActiveSection(activeSection + 1);
    setCourseContentData([...courseContentData, newContent]);
  };

  const prevButton = () => setActive(active - 1);

  const handleOptions = () => {
    const last = courseContentData[courseContentData.length - 1];

    if (
      !last.title ||
      !last.description ||
      !last.videoUrl ||
      !last.links[0].title ||
      !last.links[0].url
    ) {
      toast.error("sections can't be empty");
      return;
    }

    setActive(active + 1);
    handleCourseSubmit();
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form>
        {courseContentData.map((item, index) => {
          const showSectionTitle =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionTitle ? "mt-10" : "mb-0"
              }`}
            >
              {/* Section Title */}
              {showSectionTitle && (
                <>
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      className={`text-[20px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                      } font-Poppins bg-transparent outline-none dark:text-white text-black`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updated = [...courseContentData];
                        updated[index].videoSection = e.target.value;
                        setCourseContentData(updated);
                      }}
                    />
                    <BsPencil className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}

              {/* Collapse Header */}
              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] && item.title && (
                  <p className="font-Poppins dark:text-white text-black">
                    {index + 1}. {item.title}
                  </p>
                )}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`text-[20px] mr-2 dark:text-white text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updated = JSON.parse(JSON.stringify(courseContentData));
                        updated.splice(index, 1);
                        setCourseContentData(updated);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    className="dark:text-white text-black cursor-pointer"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {!isCollapsed[index] && (
                <>
                  {/* Title */}
                  <div className="my-3">
                    <label className={styles.label}>Video Title</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={item.title}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(courseContentData));
                        updated[index].title = e.target.value;
                        setCourseContentData(updated);
                      }}
                    />
                  </div>

                  {/* Video URL */}
                  <div className="my-3">
                    <label className={styles.label}>Video Url</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(courseContentData));
                        updated[index].videoUrl = e.target.value;
                        setCourseContentData(updated);
                      }}
                    />
                  </div>

                  {/* Video Length */}
                  <div className="my-3">
                    <label className={styles.label}>Video Length (in minutes) </label>
                    <input
                      type="number"
                      placeholder="20"
                      className={styles.input}
                      value={item.videoLength}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(courseContentData));
                        updated[index].videoLength = e.target.value;
                        setCourseContentData(updated);
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div className="my-3">
                    <label className={styles.label}>Video Description</label>
                    <textarea
                      rows={8}
                      className={`${styles.input} py-2`}
                      value={item.description}
                      onChange={(e) => {
                        const updated = JSON.parse(JSON.stringify(courseContentData));
                        updated[index].description = e.target.value;
                        setCourseContentData(updated);
                      }}
                    />
                    <br />
                  </div>

                  {/* Links */}
                  {item.links.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="mb-3 block">
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`text-[20px] dark:text-white text-black ${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          }`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Link title"
                        className={styles.input}
                        value={link.title}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(courseContentData));
                          updated[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updated);
                        }}
                      />
                      <br />

                      <input
                        type="url"
                        placeholder="Link URL"
                        className={`${styles.input} mt-7`}
                        value={link.url}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(courseContentData));
                          updated[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updated);
                        }}
                      />
                    </div>
                  ))}

                  {/* Add new link */}
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Add Link
                    </p>
                  </div>
                </>
              )}

              {/* Add Content */}
              {index === courseContentData.length - 1 && (
                <p
                  className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                  onClick={() => newContentHandler(item)}
                >
                  <AiOutlinePlusCircle className="mr-2" /> Add New Content
                </p>
              )}
            </div>
          );
        })}

        {/* Add Section */}
        <p
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer mt-5"
          onClick={addNewSection}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </p>
      </form>

      {/* Footer */}
      <div className="w-full flex items-center justify-between mt-6">
        <button
          onClick={prevButton}
          className="px-6 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={handleOptions}
          className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
