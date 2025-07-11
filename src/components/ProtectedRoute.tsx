import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ 
  children,
  isAdmin = false 
}: { 
  children: ReactNode;
  isAdmin?: boolean;
}) => {
  const { user } = useStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};