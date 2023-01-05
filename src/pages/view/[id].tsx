import React, { useState } from 'react'
import { getPasteAndUpdateView, supasupabase } from '../../../lib/supabase';
import dynamic from 'next/dynamic';
import  MarkdownPreview from '@uiw/react-markdown-preview';
import {  Button, Container,Divider,Group,HoverCard,Popover,Skeleton,Space,Text, Tooltip } from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconLock, IconLockOpen, IconSpy, IconSpyOff } from '@tabler/icons';
const PreviewMarkdown = dynamic(
  () =>
    import("@uiw/react-markdown-preview").then((mod) => {
      return mod.default;
    }),
  { ssr: false }
);

export default function One({paste,viewOnce}:any) {
  console.log(paste[0])
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
      {
        
        viewOnce?
        <div style={{textAlign:'center',marginTop:'20px'}}>
        <h1> This paste was made private or was set to view Once and cannot be viewed anymore ask the author to make turn of view Once</h1>
        </div>
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
      {paste[0].anonymous?
      <IconSpy  size={32}  color="violet"/>
      :<IconSpyOff size={32} color={"violet"}/>}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste[0].anonymous?"Anonymous":"Not Anonymous" }
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
         if(data){
          const dd:any=data[0]
          console.log(dd);
          
            if(dd.isViewOnce){
              return {
                props: {
                  viewOnce:true
              },
          }
        }
      }  
  return {
        props: {
        paste:data
        },
        };
                        
        }

      
        