"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
 
  ExitToAppIcon,
} from "./Iconss";

import avatarDefault from "../../../../public/assets/hoss.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BookOpen, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation"; // Add this import

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="group"
    >
      <Typography className="!text-[15px] !font-Poppins font-medium">
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname(); // Get current pathname

  // Map pathname to menu item titles
  const getSelectedFromPathname = (path: string): string => {
    const routeMap: { [key: string]: string } = {
      "/admin": "Dashboard",
      "/admin/users": "Users",
      "/admin/invoices": "Invoices",
      "/admin/create-course": "Create Course",
      "/admin/courses": "Live Courses",
      "/admin/hero": "Hero",
      "/admin/faq": "FAQ",
      "/admin/categories": "Categories",
      "/admin/team": "Manage Team",
      "/admin/courses-analytics": "Courses Analytics",
      "/admin/orders-analytics": "Orders Analytics",
      "/admin/users-analytics": "Users Analytics",
      
    };

    return routeMap[path] || "Dashboard";
  };

  // Set selected based on current pathname
  useEffect(() => {
    if (pathname) {
      const selectedItem = getSelectedFromPathname(pathname);
      setSelected(selectedItem);
      // Optionally store in localStorage for extra persistence
      localStorage.setItem("selectedMenuItem", selectedItem);
    }
  }, [pathname]);

  // On mount, check localStorage and pathname
  useEffect(() => {
    setMounted(true);
    
    // First try to get from pathname (most reliable)
    if (pathname) {
      const selectedItem = getSelectedFromPathname(pathname);
      setSelected(selectedItem);
    } else {
      // Fallback to localStorage if pathname isn't available yet
      const storedSelection = localStorage.getItem("selectedMenuItem");
      if (storedSelection) {
        setSelected(storedSelection);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
    localStorage.removeItem("selectedMenuItem"); // Clear on logout
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark"
              ? "linear-gradient(180deg, #1a1f3a 0%, #0f1729 100%) !important"
              : "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%) !important"
          }`,
          boxShadow: theme === "dark" 
            ? "4px 0 20px rgba(0, 0, 0, 0.5)" 
            : "4px 0 20px rgba(0, 0, 0, 0.08)",
        },
        "& .pro-sidebar": {
          borderRight: `1px solid ${
            theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          background: `${
            theme === "dark"
              ? "rgba(99, 102, 241, 0.1) !important"
              : "rgba(99, 102, 241, 0.05) !important"
          }`,
          borderRadius: "12px !important",
          color: "#6366f1 !important",
        },
        "& .pro-menu-item.active .pro-inner-item": {
          background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important`,
          borderRadius: "12px !important",
          color: "#fff !important",
          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
        },
        "& .pro-inner-item": {
          padding: "12px 20px !important",
          margin: "4px 12px !important",
          opacity: 1,
          transition: "all 0.3s ease !important",
        },
        "& .pro-menu-item": {
          color: `${theme === "dark" ? "#e5e7eb" : "#374151"} !important`,
        },
        "& .pro-icon": {
          marginRight: "12px !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "80px" : "280px",
          transition: "width 0.3s ease",
          zIndex: 999,
        }}
      >
        <Menu iconShape="square">
          {/* LOGO and Menu Icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <ArrowForwardIosIcon className="text-gray-600 dark:text-gray-400" />
              ) : undefined
            }
            style={{
              margin: "20px 0 30px 0",
              background: "transparent",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[22px] font-Poppins font-bold gradient-text">
                    Elearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowBackIosIcon className="text-gray-600 dark:text-gray-400" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER PROFILE */}
          {!isCollapsed && (
            <Box mb="30px" px="20px">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border-2 border-gray-200 dark:border-gray-700"
              >
                {/* Avatar with Gradient Ring */}
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-sm opacity-75"></div>
                  <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
                    <Image
                      src={user.avatar ? user.avatar.url : avatarDefault}
                      alt="profile-user"
                      fill
                      style={{ objectFit: "cover" }}
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                  {/* Online Status */}
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full"></span>
                </div>

                {/* User Info */}
                <Typography
                  variant="h4"
                  className="!text-[18px] !font-bold text-gray-900 dark:text-white text-center"
                >
                  {user?.name}
                </Typography>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Sparkles className="w-3 h-3 text-white" />
                  <Typography className="!text-[12px] !font-semibold text-white uppercase">
                    {user?.role}
                  </Typography>
                </div>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0"}>
            {/* DASHBOARD */}
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* DATA SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Data Management
              </Typography>
            )}
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* CONTENT SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Content
              </Typography>
            )}
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* CUSTOMIZATION SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Customization
              </Typography>
            )}
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* CONTROLLERS SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Controllers
              </Typography>
            )}
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* ANALYTICS SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Analytics
              </Typography>
            )}
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* EXTRAS SECTION */}
            {!isCollapsed && (
              <Typography
                variant="h5"
                sx={{ m: "20px 0 10px 25px" }}
                className="!text-[13px] !font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Extras
              </Typography>
            )}
           
            <div onClick={logoutHandler}>
              <Item
                title="Exit"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            {/* Bottom Spacing */}
            <Box height="30px" />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;