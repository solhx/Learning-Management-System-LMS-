"use client";

import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

type Props = {};

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword,{isSuccess,error}]=useUpdatePasswordMutation();

  const PasswordChangeHandler =async (e: any) => {
    e.preventDefault();
   if(newPassword !== confirmPassword){
    toast.error("Passwords do not match")
   }else{
    await updatePassword({oldPassword,newPassword})
   }
  };

  useEffect(() => {
    if(isSuccess){
        toast.success("Password changed successfully");
    }
    if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }
  }, [isSuccess,error])
  

  return (
    <div className="w-full flex justify-center  pb-20 px-4">
      <div className="flex flex-col items-center w-full max-w-3xl">

        {/* Card */}
        <div className="w-full bg-white dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 md:p-10">
          
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-10 flex items-center justify-center gap-3">
            <FaLock className="text-blue-600" /> 
            Change Password
          </h2>

          <form  
          onSubmit={PasswordChangeHandler} 
          className="flex flex-col gap-8" >

            {/* Old Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                Old Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Submit Button */}
        
             <input
                type="submit"
                required
                value=" Update Password "
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-xl transition-all hover:opacity-90 hover:scale-[1.03]"
              />

          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
