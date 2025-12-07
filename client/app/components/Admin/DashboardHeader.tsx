"use client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { ThemeSwitcher } from "../../../app/utils/ThemeSwitcher";
import React, { FC, useEffect, useState } from "react";
import {
  IoMdNotificationsOutline,
  IoMdClose,
  IoMdInformationCircle,
  IoMdWarning,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  X,
  Trash2,
  Eye,
} from "lucide-react";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [audio] = useState(
    new Audio(
      "/assets/notificatopnsound.mp3"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }

    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socketId.off("newNotification");
    };
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  const handleMarkAllAsRead = async () => {
    // Mark all notifications as read
    const promises = notifications.map((notification) =>
      updateNotificationStatus(notification._id)
    );
    await Promise.all(promises);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <IoMdInformationCircle className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
        );
      case "success":
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
            <IoMdCheckmarkCircle className="text-green-600 dark:text-green-400 text-xl" />
          </div>
        );
      case "warning":
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
            <IoMdWarning className="text-yellow-600 dark:text-yellow-400 text-xl" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <Bell className="text-gray-600 dark:text-gray-400 text-xl" />
          </div>
        );
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/10";
      case "success":
        return "border-green-500 bg-green-50 dark:bg-green-900/10";
      case "warning":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10";
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900/10";
    }
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-50">
      <ThemeSwitcher />

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 group"
        >
          {notifications && notifications.length > 0 ? (
            <BellRing className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 animate-wiggle" />
          ) : (
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          )}

          {/* Notification Badge */}
          {notifications && notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
              {notifications.length > 9 ? "9+" : notifications.length}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm -z-10"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <div className="absolute top-14 right-0 w-[400px] max-h-[600px] bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-in">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BellRing className="w-5 h-5" />
                    Notifications
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-white/90 text-sm">
                  <span>
                    {notifications.length} unread notification
                    {notifications.length !== 1 ? "s" : ""}
                  </span>
                  {notifications.length > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs font-medium"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[500px] custom-scrollbar">
                {notifications && notifications.length > 0 ? (
                  <div className="p-3 space-y-3">
                    {notifications.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`group p-4 rounded-xl border-l-4 ${getNotificationColor(
                          item.type
                        )} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          {getNotificationIcon(item.type)}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                                {item.title}
                              </h4>
                              <button
                                onClick={() =>
                                  handleNotificationStatusChange(item._id)
                                }
                                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                title="Mark as read"
                              >
                                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {item.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {format(item.createdAt)}
                              </span>

                            
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Bell className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      All caught up!
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      You have no unread notifications at the moment.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
               
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardHeader;