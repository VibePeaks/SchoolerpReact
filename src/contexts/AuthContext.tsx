
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check localStorage for existing user session
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem('currentUser');
        return null;
      }
    }
    return null;
  });

  const login = (email: string, password: string, role: User['role']) => {
    const userData = {
      id: '1',
      name: getRoleDisplayName(role),
      email,
      role
    };
    
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const getRoleDisplayName = (role: User['role']) => {
    const roleNames = {
      admin: 'System Administrator',
      principal: 'School Principal',
      teacher: 'Teaching Staff',
      student: 'Student User',
      parent: 'Parent User'
    };
    return roleNames[role];
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
