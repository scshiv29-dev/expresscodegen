import React from 'react'
import { useAuth } from '../../component/auth'
import { getSession } from 'next-auth/react';
import { getAllUserPastes, supasupabase } from '../../../lib/supabase';
import Base from '../../component/Base';
import { Box, Button } from '@mantine/core';
import { useRouter } from 'next/router';
export default function Paste({pastes,session}:any) {
        const router=useRouter()
return (
    <Base >
  <h1>Your pastes</h1>
{pastes?.map((paste:any)=>(
        <Box  sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        width: '40%',
        transition: 'background-color 100ms ease-out',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}
      onClick={()=>router.push(`/pastes/${paste.id}`)}
      key={paste.id}
      >
   
        <h2>{paste.title}</h2>
        
      
        </Box>
        ))}
          <Button onClick={()=>router.push('/pastes/new')}>New Paste</Button>
    </Base>
  )}

export async function getServerSideProps(context: { req: any; res: any; }) {
        const { req, res } = context;
        const session = await getSession({ req }); 
        if (!session) {
        res.writeHead(302, {
        Location: "/",
        });
        res.end();
        return { props: {} };
        }
        else{
                  const dd= await getAllUserPastes(session?.user?.id,session?.supabaseAccessToken as string)
                  console.log(dd);
                  return {
        props: {
        session,
        pastes:dd
        },
        };         
        }
        }