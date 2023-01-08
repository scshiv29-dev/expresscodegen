import Head from 'next/head'
import React from 'react'

export default function Base({children}:any) {
  return (
    <div className='bg'>
        <Head>
        <title>Crustulum v2 </title>
        
        </Head>
        {children}
    </div>
  )
}
