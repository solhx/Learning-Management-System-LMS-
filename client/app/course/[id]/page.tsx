'use client';

import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="pt-[80px]">
      <CourseDetailsPage id={params.id}/>
    </div>
  );
};

export default Page;
