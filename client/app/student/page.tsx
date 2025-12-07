"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Routes/Footer";
import StudentDashboard from "./StudentDashboard";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { HiOutlineUserCircle, HiBookOpen } from "react-icons/hi";
import Loader from "../components/Loader/Loader";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(-1);
  const [route, setRoute] = useState("Login");
  const { data: userData, isLoading } = useLoadUserQuery(undefined, {});

  if (isLoading) {
    return <Loader/> // Or a proper loader component
  }

  return (
    <div>
      <Heading
        title="My dashboard - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming, mern"
      />

      {userData ? (
        <StudentDashboard />
      ) : (
        // Login Card for non-logged-in users
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <HiBookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Your Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to view your enrolled courses and continue your learning journey.
            </p>
            <button
              onClick={() => router.push('/')}
              
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105"

            >
              <HiOutlineUserCircle size={20} />
              <span>Sign In to Continue</span>
            </button>
          </div>
        </div>
      )}

      <Footer />

      {/* Auth Modals */}
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={() => {}}
        />
      )}

      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Page;
