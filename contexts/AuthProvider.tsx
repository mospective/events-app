import { ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '~/utils/supabase';
import { createContext, useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';

interface AuthContextType {
    session: Session | null;
    user: any;
    isAuthenticated: boolean;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
  }

export default function AuthProvider({ children } : AuthProviderProps ) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, isAuthenticated: !!session?.user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    console.log("context", context)
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

