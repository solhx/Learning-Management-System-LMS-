"use client";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiX } from "react-icons/hi";
import { BookOpen, Sparkles } from "lucide-react";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/hoss.png";
import { useSession } from "next-auth/react";
import {  useLogOutMutation, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute?: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {data: userData, isLoading, refetch} = useLoadUserQuery (undefined, {}) ;
  const [logout,setLogout]=useState(false)
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
 const [logOut, { isSuccess: successlogout, isLoading: lodingLogout, error }] =
  useLogOutMutation();


 useEffect(() => {
  if (!isLoading) {
    if (!userData) {
      if(data){
          socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
      refetch();
      }
    
    }

    
    if (data === null ) {
      if(isSuccess){
        toast.success("Login Successfully");
      }
      
    }


    if (data ===null && !isLoading &&!userData) {
      setLogout(true)
    }
  }
}, [data, userData, isLoading,isSuccess]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`
          fixed top-0 left-0 w-full z-[80] transition-all duration-500
          ${
            active
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 h-[70px]"
              : "bg-transparent border-b border-transparent h-[80px]"
          }
        `}
      >
        <div className="w-[95%] 800px:w-[92%] max-w-[1400px] m-auto h-full">
          <div className="w-full h-full flex items-center justify-between px-4">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className={`
                w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 
                flex items-center justify-center shadow-lg
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                ${active ? "shadow-blue-500/30" : "shadow-blue-500/50"}
              `}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-[22px] font-Poppins font-bold gradient-text hidden sm:block">
                Elearning
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden 800px:flex items-center gap-4">
              <NavItems activeItem={activeItem} isMobile={false} />
              
              {/* Theme Switcher */}
              <div className="mx-2">
                <ThemeSwitcher />
              </div>

              {/* User Profile / Login Button */}
              {userData ? (
                <Link href="/profile">
                  <div className="relative group">
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 
                      rounded-full blur-sm opacity-0 group-hover:opacity-75 
                      transition-opacity duration-300
                      ${activeItem === 5 ? "opacity-75" : ""}
                    `}></div>
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-white dark:border-gray-800 shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Online Status Indicator */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <HiOutlineUserCircle size={20} />
                    <span>Sign In</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 800px:hidden">
              <ThemeSwitcher />
              <button
                onClick={() => setOpenSidebar(true)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <HiOutlineMenuAlt3
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {active && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift"></div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div
          className="fixed w-full h-screen z-[99999] top-0 left-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
          id="screen"
        >
          <div className="w-[85%] max-w-[400px] fixed z-[999999999] h-screen bg-white dark:bg-gray-900 top-0 right-0 shadow-2xl animate-slide-in-right overflow-y-auto">
            
            {/* Sidebar Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
              <div className="flex items-center justify-between p-6">
                <Link href="/" onClick={() => setOpenSidebar(false)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[20px] font-Poppins font-bold gradient-text">
                      Elearning
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setOpenSidebar(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <HiX size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* User Section */}
            {userData ? (
              <Link href="/profile" onClick={() => setOpenSidebar(false)}>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                        alt="User Avatar"
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {userData.user.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        View Profile
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                >
                  <HiOutlineUserCircle size={24} />
                  <span>Sign In</span>
                </button>
              </div>
            )}

            {/* Navigation Items */}
            <div className="px-2">
              <NavItems activeItem={activeItem} isMobile={true} />
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Empowering learners worldwide
                </p>
              </div>
              <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} Elearning. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
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

export default Header;