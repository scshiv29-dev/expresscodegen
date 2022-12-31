import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useAuth } from '../component/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const { authState, signUp, signIn, signOut } = useAuth();
  return (
    <>
       {authState.isAuthenticated ? (
        <>
        <button onClick={signOut}>Sign Out</button>
        {JSON.stringify(authState.data)}
        </>
      ) : (
        <>
          <button onClick={() => signUp('thelaw2900@gmail.com', 'password')}>
            Sign Up
          </button>
          <button onClick={() => signIn('thelaw2900@gmail.com', 'password')}>
            Sign In
          </button>
        </>
      )}
    </>
  )
}
