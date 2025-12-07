import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/hoss.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void; // ✅ Better type
  isLoggingOut?: boolean; // ✅ Add loading state prop
};

const SideBarProfile: FC<Props> = ({
  user,
  avatar,
  active,
  setActive,
  logOutHandler,
  isLoggingOut = false, // ✅ Default value
}) => {
  const Item = ({
    id,
    label,
    icon,
    onClick,
    disabled = false, // ✅ Add disabled prop
  }: {
    id: number;
    label: string;
    icon: any;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <div
      className={`w-full flex items-center px-4 py-3 transition-all rounded-xl
        ${
          active === id
            ? "bg-gradient-to-r from-blue-600/70 to-purple-600/70 text-white shadow-md"
            : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
      <h5 className="pl-3 800px:block hidden font-Poppins text-sm">
        {label}
      </h5>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      {/* Profile */}
      <div>
        <div
          className={`w-full flex items-center px-4 py-3 cursor-pointer transition-all rounded-xl
          ${
            active === 1
              ? "bg-gradient-to-r from-blue-600/70 to-purple-600/70 text-white shadow-md"
              : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActive(1)}
        >
          <Image
            src={
              user?.avatar?.url || avatar || avatarDefault
            }
            alt="User Avatar"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <h5 className="pl-3 800px:block hidden font-Poppins text-sm">
            My Account
          </h5>
        </div>
      </div>

      <Item
        id={2}
        label="Change Password"
        icon={<RiLockPasswordLine size={20} />}
        onClick={() => setActive(2)}
        disabled={isLoggingOut} // ✅ Disable during logout
      />

      <Item
        id={3}
        label="My Courses"
        icon={<SiCoursera size={20} />}
        onClick={() => setActive(3)}
        disabled={isLoggingOut} // ✅ Disable during logout
      />

      {user?.role === "admin" && (
        <Link
          href={"/admin"}
          className={isLoggingOut ? "pointer-events-none" : ""}
        >
          <Item
            id={6}
            label="Admin Dashboard"
            icon={<MdOutlineAdminPanelSettings size={20} />}
            onClick={() => null}
            disabled={isLoggingOut} // ✅ Disable during logout
          />
        </Link>
      )}

      {/* ✅ Logout with loading state */}
      <Item
        id={4}
        label={isLoggingOut ? "Logging out..." : "Log Out"}
        icon={
          isLoggingOut ? (
            <div className="animate-spin">
              <AiOutlineLogout size={20} />
            </div>
          ) : (
            <AiOutlineLogout size={20} />
          )
        }
        onClick={logOutHandler}
        disabled={isLoggingOut}
      />
    </div>
  );
};

export default SideBarProfile;