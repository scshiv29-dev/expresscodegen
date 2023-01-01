import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useAuth } from '../component/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 const { authState, signUp, signIn, signOut } = useAuth();
  return (
    
       authState.isAuthenticated ? (
        <>
        <button onClick={signOut}>Sign Out</button>
        {JSON.stringify(authState.data)}
        </>
      ) : (
        <>
          <button  >
            Sign Up
          </button>
          <button  >
            Sign In
          </button>
          <div className={styles.main}>
<input type="checkbox" id="chk" className={styles.chk} aria-hidden={true} required={true} />
<div className={styles.signup}>
<form>
<label htmlFor='chk' aria-hidden={true} className={styles.label}>Sign up</label>
<input type="text" className={styles.input} name="txt" placeholder="User name" required={true} />
<input type="email" className={styles.input} name="email" placeholder="Email" required={true} />
<input type="password" className={styles.input} name="pswd" placeholder="Password" required={true}/>
<button className={styles.button} onClick={() => signUp('thelaw2900@gmail.com', 'password')}>Sign up</button>
</form>
</div>
<div className={styles.login}>
<form>
<label htmlFor='chk' aria-hidden={true} className={styles.label}>Login</label> 
<input type="email" className={styles.input} name="email" placeholder="Email" required={true} />
<input type="password" className={styles.input} name="pswd" placeholder="Password" required={true} />
<button className={styles.button} onClick={() => signIn('thelaw2900@gmail.com', 'password')}>Login</button>
</form>
</div>
</div>
        </>
      )
    
  )
}
