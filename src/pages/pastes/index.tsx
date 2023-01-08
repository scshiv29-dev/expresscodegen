import React, { useState } from 'react'
import { getSession } from 'next-auth/react';
import { getAllUserPastes, supasupabase ,deletePaste} from '../../../lib/supabase';
import Base from '../../component/Base';
import { createStyles, Box, Button, UnstyledButton, Text, Container, Anchor, Card, Group, SimpleGrid, Space, Avatar, Popover, Stack, HoverCard, Modal, Affix } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconDotsVertical, IconEyeCheck, IconEyeOff, IconLock, IconLockOpen, IconSpy, IconSpyOff, IconTrash, IconCheck, IconX  } from '@tabler/icons';
import { useHover } from '@mantine/hooks';
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {

      boxShadow: `0 0.5em 0.5em -0.4em #ffffff`,
      transform: "translateY(-0.32em)",
    },
  },
}));
export default function Paste({pastes,session}:any) {
        const router=useRouter()
        const { classes, theme } = useStyles();
        const [opened, setOpened] = useState(false);
const deletePasteHandler=async (id:any)=>{
const data=await deletePaste(id,session.supabaseAccessToken)
console.log(data);

  router.reload()
  setOpened(false)

}
  const items = pastes?.map((paste:any,index:any)=>(
  
    <UnstyledButton   key={paste.id} className={classes.item} style={{cursor:"default"}}>

    
      <Text  size="lg" ta={"center"} onClick={()=>router.push(`/pastes/${paste.id}`)} style={{cursor:"pointer"}}>
        {paste.title}
      </Text>
        <HoverCard width={index%3 === 2 ? "md": 400} shadow="md" >
        <HoverCard.Target>
      <div id={index} style={{position:"absolute", right:"0.5em", top:"0.75em"}}>
          <IconDotsVertical size={32} color="gray" />
      </div>
        </HoverCard.Target>
        <HoverCard.Dropdown>

      <Group position="center" style={{marginTop:10, zIndex:100}} >
      <Popover width={'lg'} shadow="md" >
        <Popover.Target>
        <Button variant="subtle" color="dark">    
      {paste.isViewOnce?
        <IconEyeCheck size={32}  color={"yellow"}/>
        :<IconEyeOff size={32} color={"yellow"} />}
        </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
          {paste.isViewOnce?"View Once Enabled":"View Once Disabled" }
          </Text>
        </Popover.Dropdown>
      </Popover>

        <Popover width={'md'} shadow="md" >
        <Popover.Target>
        <Button variant="subtle" color="dark">    
      {paste.isProtected?
      <IconLock size={32}  color={"lime"}/>
      :<IconLockOpen size={32} color={"lime"}/>}
        </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
          {paste.isProtected?"Protected":"Not Protected" }
          </Text>
        </Popover.Dropdown>
        </Popover>

        <Popover width={'md'} shadow="md" >
        <Popover.Target>
        <Button variant="subtle" color="dark">    
      {paste.anonymous?
      <IconSpy  size={32}  color="violet"/>
      :<IconSpyOff size={32} color="violet"/>}
        </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
          {paste.anonymous?"Anonymous":"Not Anonymous"}
          </Text>
        </Popover.Dropdown>
      </Popover>

        <Button variant="subtle" onClick={() => setOpened(true)} color="dark">
        <IconTrash size={32} color="red" />
        </Button>
        <Modal centered opened={opened}  onClose={() => setOpened(false)} title="Delete?">
          <Stack align="center">
          <Text size="sm">
          Are you sure you want to delete this paste? 
          </Text>
          <Group position="center">
          <IconCheck size={32} color="green" onClick={()=>deletePasteHandler(paste.id)}/>
          <IconX size={32} color="red" onClick={() => setOpened(false)}/>
          </Group>
          </Stack>
        </Modal>

        
      </Group>
      </HoverCard.Dropdown>
      </HoverCard>

    </UnstyledButton>

  ));
return (
    <Base >
    <Space h="xl" />
    <Container> 
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>Your Pastes: {pastes.length}</Text>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
        <Button onClick={()=>router.push('/pastes/new')}>+ New Paste</Button>
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
    </Container>
    <Space h="xl" />
         
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
                  
                  return {
        props: {
        session,
        pastes:dd
        },
        };         
        }
        }