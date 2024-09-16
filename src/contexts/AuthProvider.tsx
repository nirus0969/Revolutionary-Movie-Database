import React, { ReactNode, useEffect, useState } from 'react';
import { User } from '../types/gqlResponses.ts';
import { AuthenticatedUserContext } from './useAuthContext.ts';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  //Should probably be replaced with a more robust local storage solution
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const updateUser = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setUser(user);
  };

  return (
    <AuthenticatedUserContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
