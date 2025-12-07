'use client';

import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import AllInvoices from "../../../app/components/Admin/Orders/AllInvoices";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <div className="flex">
        {/* Sidebar */}
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="w-[85%]">
          <DashboardHeader />
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default Page;
