
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserPlan = 'starter' | 'professional' | 'enterprise';

interface UserContextType {
  userName: string;
  userPlan: UserPlan;
  updateUserName: (name: string) => void;
  updateUserPlan: (plan: UserPlan) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>('User Name');
  const [userPlan, setUserPlan] = useState<UserPlan>('starter');

  const updateUserName = (name: string) => {
    setUserName(name);
  };

  const updateUserPlan = (plan: UserPlan) => {
    setUserPlan(plan);
  };

  return (
    <UserContext.Provider value={{ userName, userPlan, updateUserName, updateUserPlan }}>
      {children}
    </UserContext.Provider>
  );
};
