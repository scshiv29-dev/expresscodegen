import React, { useState } from 'react'
import { getPasteAndUpdateView, getUserDetails, supasupabase } from '../../../lib/supabase';
import dynamic from 'next/dynamic';
import  MarkdownPreview from '@uiw/react-markdown-preview';
import {  Avatar, Button, Container,Divider,Group,HoverCard,Overlay,Paper,PasswordInput,Popover,Skeleton,Space,Text, Tooltip } from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconLock, IconLockOpen, IconSpy, IconSpyOff } from '@tabler/icons';
const PreviewMarkdown = dynamic(
  () =>
    import("@uiw/react-markdown-preview").then((mod) => {
      return mod.default;
    }),
  { ssr: false }
);

export default function One({paste,viewOnce,user}:any) {

  const [loading, setLoading] = useState(true);
  const [isProtected, setIsProtected] = useState(paste[0].isProtected);
  const [password, setPassword] = useState('');
  const [error,setError] = useState({
    error:false,
    message:''
  })
  const validatePassword = async () => {
    if(password===paste[0].password){
      setIsProtected(false)
    }
    else{
      setError({
        error:true,
        message:'Wrong password'
      })
    }

  };
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>

        
       { isProtected?
       <Container size="xl" px="xl" w={600}>
      <Space h={250} />
        <Paper shadow="sm" p="lg" withBorder>

        <Text size="lg" weight={500} ta="center">
        <IconLock size={32}  color={"red"}/> <br/>This paste is protected
        </Text>
        <Space h="lg" />
        <PasswordInput placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} error={error.message} />
        <Space h="lg" />
        <Button variant="outline" color="red"  onClick={() => validatePassword()}>
          Submit
        </Button>
      </Paper>

      </Container>:
        viewOnce?
        <Container size="xl" px="xl" w={600}>
      <Space h={250} />
      <Paper shadow="sm" p="lg" withBorder style={{color:"#C92A2A"}}>
        <Text fw={700} fz={30}> 
         This paste was made private or was set to view Once and cannot be viewed anymore ask the author to make turn off view Once
        </Text>
      </Paper>
        </Container>
        :
        
        <Container size={2000} px="xl" >
          <Space h="xl" />
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center",
            padding:"0 1vw 0 1vw"
          }}>
            <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems:"center",
          }}>

            <Text fz={32} color={"#495057"} fw={700}>Title:</Text> <Space w={15} />  <Text color={"#F8F9FA"} fz={32} fw={700}>{paste[0].title} </Text> 
            </div>
        <Group spacing="lg">
        <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste[0].isViewOnce?
        <IconEyeCheck size={32}  color={"yellow"}/>
        :<IconEyeOff size={32} color={"yellow"} />}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste[0].isViewOnce?"View Once Enabled":"View Once Disabled" }
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>

        <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste[0].isProtected?
      <IconLock size={32}  color={"lime"}/>
      :<IconLockOpen size={32} color={"lime"}/>}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste[0].isProtected?"Protected":"Not Protected" }
          </Text>
        </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste[0].anonymous?
      <IconSpy  size={32}  color="violet"/>
      :<Avatar src={user.image} radius={"xl"} size={32} style={{objectFit: "cover"}}/>}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste[0].anonymous?"Anonymous":user.name }
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>

        </Group>
        </div>
        <Divider />
          <Skeleton visible={loading} >
          <div style={{backgroundColor: "#212529", minHeight:"85vh", paddingLeft:"1vw", paddingBottom:"1vh"}}>
          <Space h="xl" />
        <PreviewMarkdown source={paste[0].content} />
        </div>
        </Skeleton>
        <Space h="xl" />
        </Container>
      }
      

    </>
  )
}

export async function getServerSideProps(context: {
  params: any; req: any; res: any; 
}) {
        const { req, res } = context;
        const id=context.params.id
        console.log(id);
         const data = await getPasteAndUpdateView(id)
        const user =await getUserDetails(data[0].user)
        
         if(data){
          const dd:any=data[0]
          
          if(!dd.anonymous){

          }
            if(dd.isViewOnce){
              return {
                props: {
                  viewOnce:true,
                  paste:data
              },
          }
        }
      }  
  return {
        props: {
        paste:data,
        user:user[0]
        },
        };
                        
        }

      
        