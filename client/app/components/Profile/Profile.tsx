"use client"
import React, { FC, useState, useEffect } from 'react'
import SideBarProfile from "./SideBarProfile"
import { useLogOutMutation } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

type Props = {
    user: any;
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const router = useRouter(); // ✅ Initialize router
    
    // ✅ Use mutation instead of query
    const [logOut, { isLoading: isLoggingOut }] = useLogOutMutation();

    const logOutHandler = async () => {
        try {
            // ✅ Show loading state
            toast.loading("Logging out...", { id: "logout" });
            
            // ✅ First, logout from backend (clears httpOnly cookies)
            await logOut({}).unwrap();
            
            // ✅ Then, sign out from NextAuth
            await signOut({ redirect: false });
            
            // ✅ Show success message
            toast.success("Logged out successfully", { id: "logout" });
            
            // ✅ Optional: Redirect to home page
            window.location.href = "/";
            
        } catch (error: any) {
            // ✅ Handle errors gracefully
            console.error("Logout error:", error);
            toast.error(error?.data?.message || "Logout failed. Please try again.", { 
                id: "logout" 
            });
        }
    };

    // ✅ Redirect to student dashboard when tab 3 is clicked
    useEffect(() => {
        if (active === 3) {
            router.push("/student"); // or "/student-dashboard" or whatever route you want
        }
    }, [active, router]);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }

    return (
        <div className='w-[85%] flex mx-auto'>
            <div
                className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[150px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"
                    } left-[30px]`}
            >
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                    isLoggingOut={isLoggingOut}
                />
            </div>
            {active === 1 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ProfileInfo avatar={avatar} user={user} />
                </div>
            )}
            {active === 2 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ChangePassword />
                </div>
            )}
        </div>
    )
}

export default Profile