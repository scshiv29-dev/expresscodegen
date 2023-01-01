import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import { useSession,signIn,signOut } from 'next-auth/react'
import { Button } from '@mantine/core'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const {data:session} = useSession()
  return (
    <>
<h1>Home</h1>
{session && (
  <div>
    <h2>Logged in as {session.user.email}</h2>
    {JSON.stringify(session)}
    <Button onClick={() => signOut()}>Sign out</Button>
    <Button onClick={() => router.push('/pastes')}>View Pastes</Button>
  </div>
)}
{!session && (
  <div className='bg'>
    <h2>Not signed in</h2>
    <Button onClick={() => signIn()}>Sign in</Button>
    
  </div>
)}
    </>
  )
}
