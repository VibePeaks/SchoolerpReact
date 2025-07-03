
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
      case 'transport':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Transport Management</h2>
              <p className="text-gray-600 mb-4">Comprehensive transport management system coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Bus routes & stops mapping</p>
                <p>• Driver/vehicle details</p>
                <p>• Real-time GPS tracking</p>
                <p>• RFID/QR attendance</p>
                <p>• Fuel/maintenance logs</p>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inventory & Asset Management</h2>
              <p className="text-gray-600 mb-4">Complete inventory tracking system coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Lab equipment tracking</p>
                <p>• Library book inventory</p>
                <p>• Classroom asset allocation</p>
                <p>• Maintenance requests</p>
                <p>• Depreciation reports</p>
              </div>
            </div>
          </div>
        );
      case 'parent-portal':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Parent Portal & Mobile App</h2>
              <p className="text-gray-600 mb-4">Enhanced parent engagement platform coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Push notifications (fees, events)</p>
                <p>• Homework submission tracking</p>
                <p>• Parent-teacher meeting scheduling</p>
                <p>• Behavioral feedback system</p>
              </div>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Library Management</h2>
              <p className="text-gray-600 mb-4">Modern library management system coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Book catalog (ISBN search)</p>
                <p>• Check-in/check-out system</p>
                <p>• Fines calculator</p>
                <p>• Reservation system</p>
                <p>• Donation tracking</p>
              </div>
            </div>
          </div>
        );
      case 'hr-payroll':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HR & Payroll</h2>
              <p className="text-gray-600 mb-4">Complete HR management system coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Staff leave requests (sick/casual)</p>
                <p>• Salary processing with deductions</p>
                <p>• EPF/tax compliance</p>
                <p>• Performance appraisal records</p>
              </div>
            </div>
          </div>
        );
      case 'e-learning':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">E-Learning Platform</h2>
              <p className="text-gray-600 mb-4">Digital learning management system coming soon...</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Assignment submission portal</p>
                <p>• Virtual classroom links (Zoom/Teams)</p>
                <p>• Digital resource repository</p>
                <p>• Online quiz builder</p>
              </div>
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
