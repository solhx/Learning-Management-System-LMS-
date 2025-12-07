import { styles } from '@/app/styles/style';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaTimes } from 'react-icons/fa';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  // === Handlers ===
  const handleChange = (arr: any[], setArr: Function, index: number, value: string) => {
    const updated = [...arr];
    updated[index].title = value;
    setArr(updated);
  };

  const handleAdd = (arr: any[], setArr: Function) => setArr([...arr, { title: '' }]);

  const handleDelete = (arr: any[], setArr: Function, index: number) =>
    setArr(arr.filter((_, i) => i !== index));

  // === Navigation ===
  const prevButton = () => setActive(active - 1);

  const handleNext = () => {
    const anyEmpty =
      benefits.some(b => b.title.trim() === '') || prerequisites.some(p => p.title.trim() === '');
    if (anyEmpty) return toast.error('Please fill in all benefit and prerequisite fields before continuing.');
    setActive(active + 1);
  };

  const isNextDisabled =
    benefits.length === 0 ||
    prerequisites.length === 0 ||
    benefits.some(b => b.title.trim() === '') ||
    prerequisites.some(p => p.title.trim() === '');

  return (
    <div className="w-[80%] m-auto mt-24 space-y-10">
      {/* Benefits */}
      <div>
        <label className={`${styles.label} text-[20px]`}>What are the benefits for students in this course?</label>
        <br />
        {benefits.map((item, index) => (
          <div key={index} className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="You will learn how to build a complete LMS..."
              className={`${styles.input} my-3 w-full`}
              value={item.title}
              onChange={e => handleChange(benefits, setBenefits, index, e.target.value)}
            />
            <FaTimes
              className="cursor-pointer text-red-500 hover:text-red-700 transition text-[18px]"
              onClick={() => handleDelete(benefits, setBenefits, index)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd(benefits, setBenefits)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mt-1"
        >
          <FaPlus className="text-[18px]" /> Add Benefit
        </button>
      </div>

      {/* Prerequisites */}
      <div>
        <label className={`${styles.label} text-[20px]`}>What are the prerequisites before starting the course?</label>
        <br />
        {prerequisites.map((item, index) => (
          <div key={index} className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="Example: Basic JavaScript knowledge"
              className={`${styles.input} my-3 w-full`}
              value={item.title}
              onChange={e => handleChange(prerequisites, setPrerequisites, index, e.target.value)}
            />
            <FaTimes
              className="cursor-pointer text-red-500 hover:text-red-700 transition text-[18px]"
              onClick={() => handleDelete(prerequisites, setPrerequisites, index)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAdd(prerequisites, setPrerequisites)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mt-1"
        >
          <FaPlus className="text-[18px]" /> Add Prerequisite
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="w-full flex items-center justify-between mt-6">
        <button
          onClick={prevButton}
          className="px-6 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`px-6 py-2 rounded text-white font-medium transition ${
            isNextDisabled ? 'bg-green-950 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
