
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user-1',
      name: 'Alex Kumar',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    
    setUser(mockUser);
    toast({
      title: "Welcome back!",
      description: "You've been successfully logged in.",
    });
  }, [toast]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // Mock signup - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user-1',
      name: name,
      email: email,
    };
    
    setUser(mockUser);
    toast({
      title: "Account created!",
      description: "Welcome to Zayrif Connect.",
    });
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  }, [toast]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
