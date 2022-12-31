import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useAuth } from '../component/auth'
import {Button} from "@mantine/core" 
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const { authState, signUp, signIn, signOut } = useAuth();
  return (
    <>
       {authState.isAuthenticated ? (
        <>
        <Button onClick={signOut}>Sign Out</Button>
        {JSON.stringify(authState.data)}
        </>
      ) : (
        <>
          <Button onClick={() => signUp('thelaw2900@gmail.com', 'password')}>
            Sign Up
          </Button>
          <Button onClick={() => signIn('thelaw2900@gmail.com', 'password')}>
            Sign In
          </Button>
        </>
      )}
    </>
  )
}
