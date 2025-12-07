import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value = 0 }) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={normalizedValue}
        size={45}
        color={normalizedValue > 50 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-xs font-semibold dark:text-white text-black">
          {`${Math.round(normalizedValue)}%`}
        </span>
      </Box>
    </Box>
  );
};

type WidgetCardProps = {
  icon: React.ReactNode;
  count: number;
  label: string;
  percentage: number;
  open?: boolean;
  isLoading?: boolean;
};

const WidgetCard: FC<WidgetCardProps> = ({ 
  icon, 
  count, 
  label, 
  percentage, 
  open,
  isLoading = false 
}) => {
  const isPositive = percentage >= 0;
  
  return (
    <div className="w-full dark:bg-[#111C43] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center p-5 justify-between">
        <div className="space-y-2">
          <div className="p-2 bg-gradient-to-br from-[#45CBA0]/20 to-[#45CBA0]/5 rounded-lg inline-block">
            {icon}
          </div>
          <h5 className="font-Poppins dark:text-white text-black text-2xl font-bold">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              count.toLocaleString()
            )}
          </h5>
          <h5 className="font-Poppins dark:text-[#45CBA0] text-gray-600 text-base font-medium">
            {label}
          </h5>
        </div>
        <div className="flex flex-col items-center space-y-2">
          {isLoading ? (
            <div className="w-[45px] h-[45px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#45CBA0]"></div>
            </div>
          ) : (
            <CircularProgressWithLabel value={Math.abs(percentage)} open={open} />
          )}
          <h5 className={`text-center text-sm font-semibold ${
            isPositive 
              ? 'dark:text-green-400 text-green-600' 
              : 'dark:text-red-400 text-red-600'
          }`}>
            {isPositive ? '+' : ''}{Math.round(percentage)}%
          </h5>
        </div>
      </div>
    </div>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>(null);
  const [userComparePercentage, setUserComparePercentage] = useState<any>(null);

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading || ordersLoading) return;

    if (data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;

        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        // Handle division by zero
        const usersPercentChange = usersPreviousMonth === 0 
          ? 100 
          : ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100;
        
        const ordersPercentChange = ordersPreviousMonth === 0 
          ? 100 
          : ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrdersComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [data, ordersData, isLoading, ordersLoading]);

  return (
    <div className="p-4 lg:p-6">
      {/* Top Section - Analytics & Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-[70%,28%] gap-6 mb-6">
        {/* User Analytics */}
        <div className="dark:bg-[#111c43] bg-white rounded-lg shadow-lg p-6">
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Widgets Column */}
        <div className="space-y-6">
          <WidgetCard
            icon={<BiBorderLeft className="dark:text-[#45CBA0] text-[#45CBA0] text-[30px]" />}
            count={ordersComparePercentage?.currentMonth || 0}
            label="Orders"
            percentage={ordersComparePercentage?.percentChange || 0}
            open={open}
            isLoading={ordersLoading}
          />
          <WidgetCard
            icon={<PiUsersFourLight className="dark:text-[#45CBA0] text-[#45CBA0] text-[30px]" />}
            count={userComparePercentage?.currentMonth || 0}
            label="New Users"
            percentage={userComparePercentage?.percentChange || 0}
            open={open}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Bottom Section - Orders Analytics & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%,38%] gap-6">
        {/* Orders Analytics */}
        <div className="dark:bg-[#111c43] bg-white shadow-lg rounded-lg p-6">
          <OrdersAnalytics isDashboard={true} />
        </div>

        {/* Recent Transactions */}
        <div className="dark:bg-[#111c43] bg-white rounded-lg shadow-lg p-6">
          <h5 className="dark:text-white text-black text-xl font-semibold font-Poppins mb-4">
            Recent Transactions
          </h5>
          <div className="overflow-hidden">
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;