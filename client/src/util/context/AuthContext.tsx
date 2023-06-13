import React, { SetStateAction, createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext<{
  isLogin: boolean;
  setIsLogin: React.Dispatch<SetStateAction<boolean>>;
} | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem('auth') !== null) {
      setIsLogin(true);
    }
  }, []);

  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
