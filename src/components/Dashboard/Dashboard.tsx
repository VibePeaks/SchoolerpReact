
import React from 'react';
import { Users, GraduationCap, BookOpen, Calendar, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from './StatsCard';
import AttendanceChart from './AttendanceChart';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,248',
      change: '+12%',
      trend: 'up' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Teaching Staff',
      value: '89',
      change: '+3%',
      trend: 'up' as const,
      icon: GraduationCap,
      color: 'purple'
    },
    {
      title: 'Classes',
      value: '42',
      change: '0%',
      trend: 'neutral' as const,
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Today\'s Attendance',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: Calendar,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'fee',
      message: 'Fee payment received from Alice Johnson',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'attendance',
      message: 'Attendance marked for Grade 10-A',
      time: '3 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'alert',
      message: '5 students absent today in Grade 9-B',
      time: '4 hours ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'fee',
      message: 'Fee reminder sent to 15 parents',
      time: '5 hours ago',
      status: 'info'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: '2024-01-25',
      time: '9:00 AM',
      type: 'event'
    },
    {
      id: 3,
      title: 'Mid-term Examinations',
      date: '2024-02-01',
      time: '9:00 AM',
      type: 'exam'
    },
    {
      id: 4,
      title: 'Science Fair',
      date: '2024-02-10',
      time: '2:00 PM',
      type: 'event'
    }
  ];

  const pendingTasks = [
    {
      id: 1,
      task: 'Review pending fee payments',
      priority: 'high',
      count: 23
    },
    {
      id: 2,
      task: 'Approve leave requests',
      priority: 'medium',
      count: 8
    },
    {
      id: 3,
      task: 'Update student records',
      priority: 'low',
      count: 12
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'fee': return <DollarSign size={16} className="text-green-500" />;
      case 'attendance': return <Calendar size={16} className="text-blue-500" />;
      case 'alert': return <AlertCircle size={16} className="text-orange-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'event': return '🎉';
      case 'exam': return '📝';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your school today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Attendance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock size={20} />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className={`p-3 rounded-lg border ${getStatusColor(activity.status)}`}>
                  <div className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={20} />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getEventIcon(event.type)}</span>
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle size={20} />
              <span>Pending Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{task.task}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <span className="text-sm text-gray-500">{task.count} items</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    {task.count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
