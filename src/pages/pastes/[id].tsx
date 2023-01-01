import React from 'react'
import { supasupabase } from '../../../lib/supabase';
import { getSession } from 'next-auth/react';
import Rte from '../../component/Rte';
export default function One({paste,session}:any) {
  return (
    <>
      <h1>{paste[0].title}</h1>
      <Rte content={paste[0].content}></Rte>
      

    </>
  )
}

export async function getServerSideProps(context: { req: any; res: any; }) {
        const { req, res } = context;
        const session = await getSession({ req });
        const id=context.params.id
        console.log(session?.user?.id);
    
        if (!session) {
        res.writeHead(302, {
        Location: "/",
        });
        res.end();
        return { props: {} };
        }
        else{
                    const supa=supasupabase(session?.supabaseAccessToken)
                        const { data, error } = await supa.from('pastes').select('*').eq('id', id)
                        console.log(data)
                          return {
        props: {
        session,
        paste:data
        },
        };
                        
        }

      
        }