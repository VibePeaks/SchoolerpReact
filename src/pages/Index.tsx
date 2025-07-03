
import React, { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Sidebar from '@/components/Layout/Sidebar';
import Dashboard from '@/components/Dashboard/Dashboard';
import StudentList from '@/components/Students/StudentList';
import TeacherList from '@/components/Teachers/TeacherList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList />;
      case 'teachers':
        return <TeacherList />;
      case 'classes':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Classes Management</h2>
              <p className="text-gray-600">Class management functionality coming soon...</p>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendance Tracking</h2>
              <p className="text-gray-600">Attendance management functionality coming soon...</p>
            </div>
          </div>
        );
      case 'fees':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fee Management</h2>
              <p className="text-gray-600">Fee collection and tracking functionality coming soon...</p>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Management</h2>
              <p className="text-gray-600">Exam scheduling and results functionality coming soon...</p>
            </div>
          </div>
        );
      case 'notices':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notice Board</h2>
              <p className="text-gray-600">Announcements and notices functionality coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
              <p className="text-gray-600">Configuration and settings functionality coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </AuthProvider>
  );
};

export default Index;
