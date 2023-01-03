import React,{useState} from 'react'
import Base from '../../component/Base'
import { Button, PasswordInput, Switch, TextInput } from '@mantine/core'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { PasteR } from '../../../types';
import { getSession, useSession } from 'next-auth/react';
import { IconEyeCheck,IconEyeOff,IconSpyOff,IconSpy,IconLock,IconLockOpen } from '@tabler/icons';
import { createPaste } from '../../../lib/supabase';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function New({session}:any) {
  
  const [content,setContent]=useState<any>('')
  const[data,setData]=useState<any>({
        title:'',
    isViewOnce:false,
    anonymous:false,
    isProtected:false,
    password:'',
    content:content,
    user:session.user.id
  })
const SaveData=async ()=>{
  const dataToSave:PasteR={
    title: data.title,
    isViewOnce: data.isViewOnce,
    anonymous: data.anonymous,
    isProtected: data.isProtected,
    password: data.password,
    content: content,
    views: 0,
    user: data.user
  }
  const con=await createPaste(dataToSave,session?.supabaseAccessToken)
  if(con){
    console.log(con);
  }
}
  return (
   <Base>
   
   <TextInput placeholder="Title" name='title' id='title' required label={"Title"}/>
   <Switch label="View Once" onChange={()=>setData({...data,isViewOnce:!data.isViewOnce})} color={"yellow"}
    onLabel={<IconEyeCheck size={16} stroke={2.5}  />}
        offLabel={<IconEyeOff size={16} stroke={2.5}  />}
        description="View Once will make the paste viewable only once you can change it later in your dashboard"
   />
    <Switch label="Anonymous" onChange={()=>setData({...data,anonymous:!data.anonymous})} color={"grape"}
    onLabel={<IconSpy size={16} stroke={2.5}  />}
        offLabel={<IconSpyOff size={16} stroke={2.5}  />}
        description="Anonymous will make the paste so people dont know who made it"
    />
    <Switch label="Protected" onChange={()=>setData({...data,isProtected:!data.isProtected})} color={"lime"}
    onLabel={<IconLock size={16} stroke={2.5}  />}
        offLabel={<IconLockOpen size={16} stroke={2.5}  />}
        description="Turning this on people would require passwword to view the paste"
    />
    {data.isProtected&&<PasswordInput placeholder="Password" name={"password"}  id='password'required label={"Password"}/>
    }
      <MDEditor value={content} onChange={setContent} >
        <EditerMarkdown source={content} />
      </MDEditor>
<Button onClick={()=>SaveData()}>Save</Button>
{JSON.stringify(session)}
{JSON.stringify(data)}
   </Base>
  )
}

export async function getServerSideProps(context: { req: any; res: any; }) {
  const { req, res } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}