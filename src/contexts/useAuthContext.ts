import { User } from '../types/gqlResponses.ts';
import { createContext, useContext } from 'react';

interface AuthContextProps {
  user: User | null;
  updateUser: (user: User | null) => void;
}

export const AuthenticatedUserContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthenticatedUserContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
