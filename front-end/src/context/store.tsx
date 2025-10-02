'use client';

import { createContext, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { deleteAllCookies, getCookie } from '@/utils/cookie';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { getProfile } from '@/fetching/auth';

const storeContext = createContext<any>(null);
export const useContextStore = () => useContext(storeContext);

const ContextStoreProvider = ({ children }: any) => {
  const [isPending, startTransition] = useTransition();
  const [isAuthentication, setIsAuthentication] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = getCookie('accessToken');
    setIsAuthentication(!!token);
  }, []);

  const { data: profileData, isLoading: isProfileLoading, isError: isProfileError, refetch: refetchProfile } = useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
    enabled: isAuthentication,
    staleTime: 5 * 60 * 1000,
  });

  // Update profile when profileData changes
  useEffect(() => {
    if (profileData) {
      setProfile(profileData?.data);
    }
  }, [profileData]);

  const logout = () => {
    setIsAuthentication(false);
    setProfile(null);
    deleteAllCookies();
  
  };

  const value = useMemo(() => ({
    isPending,
    startTransition,
    isAuthentication,
    setIsAuthentication,
    profile,
    setProfile,
    isProfileLoading,
    isProfileError,
    refetchProfile,
    logout,
  }), [isPending, startTransition, isAuthentication, profile, isProfileLoading, isProfileError, refetchProfile, logout, profileData]);
  return (
    <storeContext.Provider value={value}>
      {children}
    </storeContext.Provider>
  );
};
export default ContextStoreProvider;
