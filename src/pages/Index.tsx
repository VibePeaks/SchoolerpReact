import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';

import Dashboard from '@/components/Dashboard/Dashboard';
import StudentList from '@/components/Students/StudentList';
import TeacherList from '@/components/Teachers/TeacherList';
import ClassList from '@/components/Classes/ClassList';
import AttendanceTracker from '@/components/Attendance/AttendanceTracker';
import FeeManagement from '@/components/Fees/FeeManagement';
import TransportManagement from '@/components/Transport/TransportManagement';
import InventoryManagement from '@/components/Inventory/InventoryManagement';
import ParentPortalManagement from '@/components/ParentPortal/ParentPortalManagement';
import LibraryManagement from '@/components/Library/LibraryManagement';
import HRPayrollManagement from '@/components/HR/HRPayrollManagement';
import ELearningManagement from '@/components/ELearning/ELearningManagement';
import NoticesManagement from '@/components/Notices/NoticesManagement';
import ExamManagement from '@/components/Exams/ExamManagement';

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'dashboard');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <StudentList />;
      case 'teachers': return <TeacherList />;
      case 'classes': return <ClassList />;
      case 'attendance': return <AttendanceTracker />;
      case 'fees': return <FeeManagement />;
      case 'exams': return <ExamManagement />;
      case 'notices': return <NoticesManagement />;
      case 'transport': return <TransportManagement />;
      case 'inventory': return <InventoryManagement />;
      case 'parent-portal': return <ParentPortalManagement />;
      case 'library': return <LibraryManagement />;
      case 'hr-payroll': return <HRPayrollManagement />;
      case 'e-learning': return <ELearningManagement />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
              <p className="text-gray-600">Configuration and settings functionality coming soon...</p>
            </div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-white shadow flex items-center px-6">
        <Header />
      </div>

      {/* Layout below header */}
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        {/* Sidebar - fixed height, starts below header */}
        <div className="w-64 bg-white border-r shadow h-full">
          <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        {/* Main content scrollable */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
