import React from 'react'
import { useAuth } from '../../component/auth'
import { getSession } from 'next-auth/react';
import { getAllUserPastes, supasupabase } from '../../../lib/supabase';
import Base from '../../component/Base';
import { createStyles, Box, Button, UnstyledButton, Text, Container, Anchor, Card, Group, SimpleGrid, Space, Avatar, HoverCard } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconEyeCheck, IconEyeOff, IconLock, IconLockOpen, IconSpy, IconSpyOff } from '@tabler/icons';
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
      transform: "translateY(-0.25em)",
    },
  },
}));
export default function Paste({pastes,session}:any) {
        const router=useRouter()
        const { classes, theme } = useStyles();

  const items = pastes?.map((paste:any)=>(
    <UnstyledButton key={paste.id} className={classes.item} onClick={()=>router.push(`/pastes/${paste.id}`)}>
      <HoverCard>
        <HoverCard.Target>
      <Text size="lg" ta={"center"} >
        {paste.title}
      </Text>
      </HoverCard.Target>
      <HoverCard.Dropdown>
      <Group position="center" style={{marginTop:10}}>
      <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste.isViewOnce?
        <IconEyeCheck size={32}  color={"yellow"}/>
        :<IconEyeOff size={32} color={"yellow"} />}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste.isViewOnce?"View Once Enabled":"View Once Disabled" }
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>

        <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste.isProtected?
      <IconLock size={32}  color={"lime"}/>
      :<IconLockOpen size={32} color={"lime"}/>}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste.isProtected?"Protected":"Not Protected" }
          </Text>
        </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard width={280} shadow="md" >
        <HoverCard.Target>
        <Button variant="subtle" color="dark">    
      {paste.anonymous?
      <IconSpy  size={32}  color="violet"/>
      :<IconSpyOff size={32} color="violet"/>}
        </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          {paste.anonymous?"Anonymous":"Not Anonymous"}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
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
                  console.log(dd);
                  return {
        props: {
        session,
        pastes:dd
        },
        };         
        }
        }