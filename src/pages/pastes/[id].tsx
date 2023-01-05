import React,{useState} from 'react'
import { supasupabase,updatePaste } from '../../../lib/supabase';
import { Button, Affix, Transition, Container, PasswordInput, Space, Switch, TextInput, Accordion, Stack,Notification, Input, Alert } from '@mantine/core'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { PasteR } from '../../../types';
import { getSession, useSession } from 'next-auth/react';
import {IconShare, IconEyeCheck,IconEyeOff,IconSpyOff,IconSpy,IconLock,IconLockOpen, IconArrowUp, IconArrowDown ,IconCheck} from '@tabler/icons';
import Base from '../../component/Base';
import { useWindowScroll } from '@mantine/hooks';

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
export default function One({id,paste,session}:any) {
    const [content,setContent]=useState<any>(paste.content)
    const [shareAble,setShareAble]=useState(`http://localhost:3000/view/${id}`)
  const[data,setData]=useState<any>({
        title:paste.title,
    isViewOnce:paste.isViewOnce,
    anonymous:paste.anonymous,
    isProtected:paste.isProtected,
    password:paste.password,
    content:content,
    user:paste.user,
    isShortened:paste.isShortened,
    shortUrl:paste.shortUrl
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
    user: data.user,
    isShortened:data.isShortened,
    shortUrl:data.shortenedUrl
  }
  const con=await updatePaste(id,session?.supabaseAccessToken,dataToSave)
  if(con){
   setUpdated(true)
  }
}
const [height,setHeight] = useState<any>(200)
const [scroll, scrollTo] = useWindowScroll();
const [updated, setUpdated] = useState(false);
const grow = (element:any) =>{
  let tempHeight = element.target.scrollHeight < 200 ? 200: element.target.scrollHeight;
  setHeight(tempHeight);
}
const shortenUrl = async () => {
  const dd= await fetch("https://linkjaye.ga/shorten",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      'Access-Control-Allow-Origin' : '*',
      
    },
  
    body:JSON.stringify({
      "fullUrl":shareAble,
    })
  })
 const res= await dd.json()
 const data=updatePaste(id,session?.supabaseAccessToken,{isShortened:true,shortUrl:res.shortUrl})
 setShareAble(res.shortUrl)
  setData({...data,isShortened:true,shortUrl:res.shortUrl})
 
}
  return (
    <Base>
 <Space h="xl" />
   <Container  size="sm" px="xl">
   <TextInput placeholder="Title" name='title' id='title' required label={"Title"} value={data.title} onChange={(e)=>setData({...data,title:e.target.value})}/>
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
    checked={data.isViewOnce}
    />
    </div>
    </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="anonymous">
        <Accordion.Control icon={data.anonymous?<IconSpy  size={20}  color="violet"/>:<IconSpyOff size={20} color={"red"}/>}>
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
    checked={data.anonymous}
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
    checked={data.isProtected}
    />
    </div>
    {data.isProtected&&<PasswordInput placeholder="Password" name={"password"}  id='password'required label={"Password"}/>}
    </Accordion.Panel>
      </Accordion.Item>
            <Accordion.Item value="ananymous">
        <Accordion.Control icon={data.anonymous?<IconShare  size={20}  color="violet"/>:<IconShare size={20} color={"violet"}/>}>
        Share
        </Accordion.Control>
        <Accordion.Panel>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
   {data.isShortened &&       <Input
          icon={<IconShare />}
           variant="filled"
            placeholder="Shortened Url"
            width={300}
             value={data.shortUrl}
             disabled
          />}
          <Button onClick={()=>{navigator.clipboard.writeText(shareAble)}}>Copy</Button>
          
          <Button onClick={()=>{shortenUrl()}} disabled={data.isShortened}>Shorten</Button>
    </div>
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
 

    <Space h={"lg"} />

    </Base>
  )
}

export async function getServerSideProps(context: {
  params: any; req: any; res: any; 
}) {
        const { req, res } = context;
        const session = await getSession({ req });
        const id=context.params.id
        console.log("id",id);
    
        console.log("This Triggered");
        if (!session) {
          
        res.writeHead(302, {
        Location: "/",
        });
        res.end();
        return { props: {} };
        }
        else{
               const supa=supasupabase(session?.supabaseAccessToken)
                        const { data, error }= await supa.from('pastes').select('*').eq('id', id)
                        
                        
                      if(data){
                        const dd:any=data[0]
                        console.log(dd);
                        
                        if(dd.user!==session?.user.id){
                          res.writeHead(302, {
                            Location:`/view/${id}`,
                            });
                            res.end();
                            return { props: {} };
                        }
                      }
                          return {
                    props: {
                    id:id,
                    session,
                    paste:data[0]
                    },
        };
                        
        }

      
        }