import React from 'react'
import { useAuth } from '../component/auth'
export default function Signup() {
        const {authState, signUp, signIn, signOut} = useAuth();
  return (
    <div>
        {authState.isAuthenticated ? (
                <>
                <button onClick={signOut}>Sign Out</button>
                {JSON.stringify(authState.data)}
                </>
        ) : (
                <>
<input type="text" placeholder="Email" />
<input type="password" placeholder="Password" />
<button>Sign Up</button>
</>
        )}
    </div>
  )
}
