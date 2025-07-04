
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Auth/Login';
import Sidebar from '@/components/Layout/Sidebar';
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
import SettingsPage from '@/components/Settings/SettingsPage';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList />;
      case 'teachers':
        return <TeacherList />;
      case 'classes':
        return <ClassList />;
      case 'attendance':
        return <AttendanceTracker />;
      case 'fees':
        return <FeeManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'notices':
        return <NoticesManagement />;
      case 'transport':
        return <TransportManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'parent-portal':
        return <ParentPortalManagement />;
      case 'library':
        return <LibraryManagement />;
      case 'hr-payroll':
        return <HRPayrollManagement />;
      case 'e-learning':
        return <ELearningManagement />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
