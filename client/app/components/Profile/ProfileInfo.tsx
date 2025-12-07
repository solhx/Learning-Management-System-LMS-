"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/hoss.png";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const [loadUser, setLoadUser] = useState(false);

  useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }

    if (error || updateError) {
      console.log(error);
    }

    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center pt-[80px] pb-[95px] px-4">
        <div className="flex flex-col items-center w-full max-w-3xl">
          {/* Avatar */}
          <div className="relative -mt-20 mb-6 group">
            <Image
              src={
                user.avatar || avatar
                  ? user.avatar?.url || avatar
                  : avatarIcon
              }
              alt="avatar"
              width={170}
              height={170}
              className="w-[100px] h-[100px] md:w-[170px] md:h-[170px] rounded-full shadow-2xl border-4 border-blue-500 object-cover transition-all duration-300 group-hover:scale-105"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300 hover:scale-110"
            >
              <AiOutlineCamera size={22} />
            </label>
            <input
              id="avatar"
              type="file"
              className="hidden"
              accept="image/png,image/jpg,image/jpeg,image/webp"
              onChange={imageHandler}
            />
          </div>

          {/* Card */}
          <div className="w-full bg-white dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-10">
              Profile Information
            </h2>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                  Email Address
                </label>

                <input
                  type="text"
                  readOnly
                  value={user?.email}
                  className="px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
                />
              </div>

              <input
                type="submit"
                required
                value=" Update Profile"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-xl transition-all hover:opacity-90 hover:scale-[1.03]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
