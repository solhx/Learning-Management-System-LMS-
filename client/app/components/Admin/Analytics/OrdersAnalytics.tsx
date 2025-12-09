import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

interface AnalyticsItem {
  name: string;
  fullDate: string;
  count: number;
}

interface Stats {
  total: number;
  average: string;
  peak: number;
  growth: string;
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {label}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Orders: <span className="font-bold text-[#82ca9d]">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Stats Card Component
const StatCard: FC<{ title: string; value: string | number; icon: string; gradient: string }> = ({
  title,
  value,
  icon,
  gradient,
}) => (
  <div className={`${gradient} p-4 sm:p-6 rounded-xl shadow-lg text-white transform transition-transform hover:scale-105`}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs sm:text-sm opacity-90">{title}</p>
      <span className="text-xl sm:text-2xl">{icon}</span>
    </div>
    <p className="text-2xl sm:text-3xl font-bold">{value}</p>
  </div>
);

const OrdersAnalytics: FC<Props> = ({ isDashboard = false }) => {
  const { data, isLoading, isError, error } = useGetOrdersAnalyticsQuery({});

  // Get current date info
  const currentDate = useMemo(() => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      day: now.toLocaleDateString('en-US', { weekday: 'long' }),
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
  }, []);

  // Transform analytics data - Format month names for better display
  const analyticsData = useMemo((): AnalyticsItem[] => {
    if (!data?.orders?.last12Months) return [];

    const transformed = data.orders.last12Months.map((item: any) => {
      // Convert "Nov 29, 2025" to "Nov 2025" for cleaner display
      const monthName = item.month.split(' ')[0] + ' ' + item.month.split(', ')[1];

      return {
        name: monthName,
        fullDate: item.month, // Keep original for tooltip
        count: item.count,
      };
    });

    return transformed;
  }, [data]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!analyticsData.length) return null;

    const total = analyticsData.reduce((sum: number, item: AnalyticsItem) => sum + item.count, 0);
    const monthsWithOrders = analyticsData.filter((item: AnalyticsItem) => item.count > 0).length;
    const average = monthsWithOrders > 0 ? (total / monthsWithOrders).toFixed(1) : '0.0';
    const peak = Math.max(...analyticsData.map((d: AnalyticsItem) => d.count), 0);
    const latest = analyticsData[analyticsData.length - 1]?.count || 0;
    const previous = analyticsData[analyticsData.length - 2]?.count || 0;
    const growth = previous > 0 ? (((latest - previous) / previous) * 100).toFixed(1) : latest > 0 ? '100' : '0';

    return { total, average, peak, growth };
  }, [analyticsData]);

  // Error State
  if (isError) {
    return (
      <div className={`${isDashboard ? "h-[30vh]" : "h-screen"} flex items-center justify-center`}>
        <div className="text-center p-6 sm:p-8 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-lg sm:text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Failed to Load Analytics
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {error?.toString() || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className={`${isDashboard ? "h-[30vh]" : "h-screen"} flex items-center justify-center`}>
        <Loader />
      </div>
    );
  }

  // Empty State
  if (!analyticsData.length) {
    return (
      <div className={`${isDashboard ? "h-[30vh]" : "h-screen"} flex items-center justify-center`}>
        <div className="text-center p-6 sm:p-8">
          <div className="text-5xl sm:text-6xl mb-4">📦</div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Orders Data Available
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Orders analytics will appear here once orders are placed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDashboard ? "mt-[20px]" : "min-h-screen p-4 sm:p-6 lg:p-8"
      }`}
    >
      {/* Header Section with Date/Day */}
      <div className={`${isDashboard ? "mb-4" : "mb-8"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h1
            className={`${styles.title} ${
              isDashboard ? "!text-[18px] sm:!text-[20px] px-4" : "px-5"
            } !text-start flex items-center gap-2`}
          >
            <span className={isDashboard ? "text-xl" : "text-2xl"}>📦</span>
            Orders Analytics
          </h1>
          
          {/* Date and Day Display */}
          {!isDashboard && (
            <div className="px-5 sm:px-0 text-right">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {currentDate.day}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentDate.date} • {currentDate.time}
              </p>
            </div>
          )}
        </div>

        {!isDashboard && (
          <p className={`${styles.label} px-5 mb-6`}>
            Last 12 months analytics data
          </p>
        )}

        {/* Dashboard Date Display */}
        {isDashboard && (
          <div className="px-4 mb-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              📅 {currentDate.day}, {currentDate.date}
            </p>
          </div>
        )}

        {/* Stats Cards - Only show on full page view */}
        {!isDashboard && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-5">
            <StatCard
              title="Total Orders"
              value={stats.total}
              icon="📦"
              gradient="bg-gradient-to-br from-[#82ca9d] to-[#66a67e]"
            />
            <StatCard
              title="Average / Month"
              value={stats.average}
              icon="📊"
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              title="Peak Month"
              value={stats.peak}
              icon="🚀"
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <StatCard
              title="Growth Rate"
              value={`${stats.growth}%`}
              icon={Number(stats.growth) >= 0 ? "📈" : "📉"}
              gradient={
                Number(stats.growth) >= 0
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-red-500 to-red-600"
              }
            />
          </div>
        )}

        {/* Mini stats for dashboard */}
        {isDashboard && stats && (
          <div className="flex gap-2 sm:gap-4 px-4 mb-3 overflow-x-auto">
            <div className="bg-[#82ca9d]/10 dark:bg-[#82ca9d]/20 px-3 py-2 rounded-lg min-w-fit">
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-sm sm:text-base font-bold text-[#82ca9d]">{stats.total}</p>
            </div>
            <div className="bg-green-500/10 dark:bg-green-500/20 px-3 py-2 rounded-lg min-w-fit">
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Growth</p>
              <p className="text-sm sm:text-base font-bold text-green-600 dark:text-green-400">
                {stats.growth}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chart Section */}
      <div
        className={`w-full ${
          isDashboard 
            ? "h-[30vh] px-4" 
            : "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
        }`}
      >
        <div className={`w-full ${isDashboard ? "h-full" : "h-[400px] sm:h-[500px]"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analyticsData}
              margin={{
                top: isDashboard ? 5 : 20,
                right: isDashboard ? 5 : 30,
                left: isDashboard ? -20 : 0,
                bottom: isDashboard ? 0 : 20,
              }}
            >
              {!isDashboard && (
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.3} />
              )}

              <XAxis
                dataKey="name"
                tick={{ fill: "#666", fontSize: isDashboard ? 10 : 12 }}
                stroke="#999"
                angle={isDashboard ? -45 : 0}
                textAnchor={isDashboard ? "end" : "middle"}
                height={isDashboard ? 50 : 30}
              />

              <YAxis
                tick={{ fill: "#666", fontSize: isDashboard ? 10 : 12 }}
                stroke="#999"
                width={isDashboard ? 30 : 60}
              />

              <Tooltip content={<CustomTooltip />} />

              {!isDashboard && (
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="line"
                  formatter={() => "Orders Count"}
                />
              )}

              <Line
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrdersAnalytics;