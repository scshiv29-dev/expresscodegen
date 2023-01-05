import React,{useState} from 'react'
import Base from '../../component/Base'
import { Button, Affix, Transition, Container,Notification, PasswordInput, Space, Switch, TextInput, Accordion, Stack } from '@mantine/core'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { PasteR } from '../../../types';
import { getSession, useSession } from 'next-auth/react';
import { IconEyeCheck,IconEyeOff,IconSpyOff,IconSpy,IconLock,IconLockOpen, IconGrowth, IconArrowDown, IconArrowUp, IconCheck } from '@tabler/icons';
import { createPaste } from '../../../lib/supabase';
import { useWindowScroll } from '@mantine/hooks';
import { log } from 'console';
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
  const [loading,setLoading]=useState<any>(false)
  const[data,setData]=useState<any>({
        title:'',
    isViewOnce:false,
    anonymous:false,
    isProtected:false,
    password:'',
    content:content,
    user:session.user.id
  })
const [height,setHeight] = useState<any>(200)
const [scroll, scrollTo] = useWindowScroll();
const grow = (element:any) =>{
  let tempHeight = element.target.scrollHeight < 200 ? 200: element.target.scrollHeight;
  setHeight(tempHeight);
}
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
   console.log(con)
   
  }

}
  return (
   <Base>
   <Space h="xl" />
   <Container  size="sm" px="xl">
   <TextInput placeholder="Title" name='title' id='title' required label={"Title"} onChange={(e)=>setData({...data,title:e.target.value})}/>
   <Space h="xl" />
   <Accordion variant="contained">
      <Accordion.Item value="viewOnce">
        <Accordion.Control icon={data.isViewOnce?<IconEyeCheck size={20}  color={"yellow"}/>:<IconEyeOff size={20} color={"yellow"}/>}>
        View Once
        </Accordion.Control>
        <Accordion.Panel>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          View Once will make the paste viewable only once you can change it later in your dashboard
        <Switch onChange={()=>setData({...data,isViewOnce:!data.isViewOnce})} color={"yellow"}
    onLabel={<IconEyeCheck size={16} stroke={2.5}  />}
    offLabel={<IconEyeOff size={16} stroke={2.5}  />}
    />
    </div>
    </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="ananymous">
        <Accordion.Control icon={data.anonymous?<IconSpy  size={20}  color="violet"/>:<IconSpyOff size={20} color={"violet"}/>}>
        Anonymous
        </Accordion.Control>
        <Accordion.Panel>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
        Anonymous will make the paste so people dont know who made it 
        <Switch onChange={()=>setData({...data,anonymous:!data.anonymous})} color={"grape"}
    onLabel={<IconSpy size={16} stroke={2.5}  />}
    offLabel={<IconSpyOff size={16} stroke={2.5}  />}
    />
    </div>
    </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="protected">
        <Accordion.Control icon={data.isProtected?<IconLock size={20}  color={"lime"}/>:<IconLockOpen size={20} color={"lime"}/>}>
        Protected
        </Accordion.Control>
        <Accordion.Panel>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
        Turning this on people would require passwword to view the paste
        <Switch onChange={()=>setData({...data,isProtected:!data.isProtected})} color={"lime"}
    onLabel={<IconLock size={16} stroke={2.5}  />}
    offLabel={<IconLockOpen size={16} stroke={2.5}  />}
    />
    </div>
    {data.isProtected&&<PasswordInput placeholder="Password" name={"password"}  id='password'required label={"Password"}/>}
    </Accordion.Panel>
      </Accordion.Item>
    </Accordion >

    </Container>
    <Space h={100} />
        <Container size={2000} px="xl">
        <Affix position={{ bottom: 20, right: 20 }}>
          
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Stack >
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              variant="outline"
            >
              Scroll to Top
            </Button>
            <Button
              leftIcon={<IconArrowDown size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: height })}
              variant="outline"
            >
              Scroll to Bottom
            </Button>
            </Stack>
          )}
        </Transition>
      </Affix>
          <MDEditor value={content} onChange={setContent} minHeight={200} height={height} onInput={(element) => grow(element)}>
            <EditerMarkdown source={content} />
          </MDEditor>
          <Space h="lg" />
          <Stack align="center">
          <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={() => SaveData()}>Save</Button>
          </Stack>
        </Container>
{/* {JSON.stringify(session)}
{JSON.stringify(data)} */}
    <Space h={"lg"} />
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