import Head from 'next/head'
import React from 'react'

export default function Base({children}:any) {
  return (
    <div className='bg'>
        <Head>
        <title>SupaPaste</title>
        
        </Head>
        {children}
    </div>
  )
}
