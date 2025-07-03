
import React from 'react';
import StatsCard from './StatsCard';
import AttendanceChart from './AttendanceChart';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your school today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={1247}
          change="12%"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Teachers"
          value={89}
          change="5%"
          icon={GraduationCap}
          color="green"
        />
        <StatsCard
          title="Total Classes"
          value={24}
          icon={BookOpen}
          color="purple"
        />
        <StatsCard
          title="Attendance Rate"
          value="91%"
          change="3%"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { activity: 'New student admission', time: '2 hours ago', type: 'info' },
              { activity: 'Fee payment received', time: '3 hours ago', type: 'success' },
              { activity: 'Exam schedule updated', time: '5 hours ago', type: 'warning' },
              { activity: 'Parent meeting scheduled', time: '1 day ago', type: 'info' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'success' ? 'bg-green-500' :
                  item.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
