import { useState, createContext, useContext } from 'react';
import {createClient } from '@supabase/supabase-js';
import type { Root } from '../../types/data';
// Initialize Supabase client
const supabase =createClient(
        'https://knynjdymqqfoqqbbmsvq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueW5qZHltcXFmb3FxYmJtc3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0MTkyMjcsImV4cCI6MTk4Nzk5NTIyN30.g7plIYSn93kt-DSvs1ES0TTLIXVup2j04ftz8C1FKHo'
);
// Define types for auth state and user
type AuthState = {
  isAuthenticated: boolean;
        data?: any;
};

type User = {
  id: string;
  email: string;
};

// Create the auth context
const AuthContext = createContext<{
  authState: AuthState;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  authState: { isAuthenticated: false },
  signUp: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

// Create a provider component
export const AuthProvider = ({ children }:any) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
  });

  async function signUp(email: string, password: string): Promise<void> {

      // Call Supabase's `auth.signup` method to create a new user
      const {data ,error } = await supabase.auth.signUp({ email, password });
      // Update the auth state
      setAuthState({ isAuthenticated: true,data });

        if(error){
      setAuthState({ isAuthenticated: false });

    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    
    
      const { data,error } = await supabase.auth.signInWithPassword({ email, password });
    if(data){
      setAuthState({ isAuthenticated: true,data });
    }
      if(error){
        console.log(error);
        
      setAuthState({ isAuthenticated: false });}
    
  }

  async function signOut(): Promise<void> {
    try {
      // Call Supabase's `auth.signout` method to sign out the user
      await supabase.auth.signOut();
      // Reset the auth state
      setAuthState({ isAuthenticated: false });
    } catch (error) {
      console.error(error);
      // Reset the auth state if there was an error
      setAuthState({ isAuthenticated: false });
    }
  }

  return (
    <AuthContext.Provider
      value={{ authState, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to access the auth context
export function useAuth(): {
  authState: AuthState;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
} {
  return useContext(AuthContext);
}

