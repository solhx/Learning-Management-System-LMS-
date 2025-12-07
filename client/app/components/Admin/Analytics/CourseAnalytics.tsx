import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  Label,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';

type Props = {};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Courses: <span className="font-bold text-[#3faf82]">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError, error } = useGetCoursesAnalyticsQuery({});

  // Transform data
  const analyticsData: any[] = [];
  data?.courses?.last12Months?.forEach((item: any) => {
    analyticsData.push({
      name: item.month,
      count: item.count,
    });
  });

  const minValue = 0;
  const maxValue = Math.max(...analyticsData.map(d => d.count), 10);

  // Error State
  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Failed to Load Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error?.toString() || 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Empty State
  if (!analyticsData.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Analytics Data Available
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Analytics data will appear here once courses are created
          </p>
        </div>
      </div>
    );
  }

  const totalCourses = analyticsData.reduce((sum, item) => sum + item.count, 0);
  const avgCourses = (totalCourses / analyticsData.length).toFixed(1);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className={`${styles.title} !text-start mb-2`}>
          📈 Courses Analytics
        </h1>
        <p className={`${styles.label} mb-6`}>
          Last 12 months analytics data
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#3faf82] to-[#2d8a65] p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Total Courses</p>
            <p className="text-3xl font-bold">{totalCourses}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Average / Month</p>
            <p className="text-3xl font-bold">{avgCourses}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Peak Month</p>
            <p className="text-3xl font-bold">
              {Math.max(...analyticsData.map(d => d.count))}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="w-full h-[500px] sm:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={analyticsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.3} />
              
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: '#666', fontSize: 12 }}
                stroke="#999"
              />
              
              <YAxis 
                domain={[minValue, maxValue + 5]}
                tick={{ fill: '#666', fontSize: 12 }}
                stroke="#999"
              >
                <Label 
                  value="Number of Courses" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ textAnchor: 'middle', fill: '#666' }}
                />
              </YAxis>
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(63, 175, 130, 0.1)' }} />
              
              <Bar 
                dataKey="count" 
                fill="#3faf82"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              >
                <LabelList 
                  dataKey="count" 
                  position="top" 
                  style={{ fill: '#333', fontWeight: 'bold', fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;