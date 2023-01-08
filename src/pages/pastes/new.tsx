import React,{useState} from 'react'
import Base from '../../component/Base'
import { Button, Affix, Transition, Container,Notification,Text, PasswordInput, Space, Switch, Badge, Input, Accordion, Stack, Dialog } from '@mantine/core'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { PasteR } from '../../../types';
import { getSession, useSession } from 'next-auth/react';
import { IconEyeCheck,IconEyeOff,IconSpyOff,IconSpy,IconLock,IconLockOpen, IconGrowth, IconArrowDown, IconArrowUp, IconCheck } from '@tabler/icons';
import { createPaste, getUserPasteTitles } from '../../../lib/supabase';
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

export default function New({session,titles}:any) {
  const[titless,setTitles]=useState<any>(titles)
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
const [error, setError] = useState<any>({
  error:false,
  message:''
});
const grow = (element:any) =>{
  let tempHeight = element.target.scrollHeight < 200 ? 200: element.target.scrollHeight;
  setHeight(tempHeight);
}
const checkAlredyExists=async (title:string)=>{
for(let i=0;i<titles.length;i++){
  if(titles[i].title===title){
    setError({
      error:true,
      message:'Title already exists'
    })
    return true
  }
const SaveData=async ()=>{
  console.log(data)
  if(data.title===''){
    setError({
      error:true,
      message:'Title is required'
    })
    return
  }
  if(data.title in titles){
    setError({
      error:true,
      message:'Title already exists'
    })
    
  
  if(data.isProtected && data.password===''){
    setError({
      error:true,
      message:'Password is required'
    })
    return
    }
  setError({
      error:false,
      message:'Saved'
    }
  )
  const dataToSave:PasteR={
    title: data.title,
    isViewOnce: data.isViewOnce,
    anonymous: data.anonymous,
    isProtected: data.isProtected,
    password: data.password,
    content: content,
    views: 0,
    user: data.user,
    isShortened: false,
    shortUrl: ''
  }
  setTimeout(()=>{
    setError({
      error:false,
      message:''
    })
  },2000)
  const con=await createPaste(dataToSave,session?.supabaseAccessToken)
  if(con){
   console.log(con)
   
  }
  
}
  return (
   <Base>
   <Space h="xl" />
   <Container  size="sm" px="xl">
   <Input.Wrapper
      id="title"
      withAsterisk
      label="Title"
      description="Please give a title to your paste"
      error={error.message==='Title is required' || error.message==='Title already exists' ?error.message:''}
    >
      <Input id="title" placeholder="Title"  onChange={(e)=>setData({...data,title:e.target.value})}/>
    </Input.Wrapper>
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
    {data.isProtected&&<PasswordInput
     placeholder="Password" 
     name={"password"} 
    id='password' 
    withAsterisk label={"Password"}
    value={data.password}
    onChange={(e)=>setData({...data,password:e.target.value})}
    error={error.message==='Password is required'?error.message:''}
    />}
    </Accordion.Panel>
      </Accordion.Item>
    </Accordion >

    </Container>
    <Space h={100} />
        <Container size={2000} px="xl">
          <>
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
          <Dialog
        opened={(error.message==="Saved")}
        size="lg"
        radius="md"
        shadow="lg"
        style={{backgroundColor:"#087F5B"}}
        withCloseButton
        onClose={() => setError({error:false,message:""})}
      >
        <Text 
        tt="uppercase"      
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        fz="xl"
        fw={700}
      >Saved</Text>
        </Dialog>
          </Stack>
          </>
        </Container>
{/* {JSON.stringify(session)}
{JSON.stringify(data)} */
JSON.stringify(titless)
}
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
  const titles=await getUserPasteTitles(session.user.id,session.supabaseAccessToken as string)
  console.log("server:",titles);
  
  return {
    props: {
      session,
      title:titles
    },
  };
}