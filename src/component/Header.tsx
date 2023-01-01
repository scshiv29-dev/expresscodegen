
import { useRouter } from 'next/router'
import { useSession,signIn,signOut } from 'next-auth/react'
import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    Space,
    Text
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';

  
  const useStyles = createStyles((theme) => ({
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: 42,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
    },
  
    subLink: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),
  
      '&:active': theme.activeStyles,
    },
  
    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  }));


export default function Home() {
  const router = useRouter()
  const {data:session} = useSession()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  return (
    <>
    <Box pb={0}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
        <Text  
      variant="gradient"
      gradient={{ from: '#f3ec78', to: '#af4261', deg: 45 }}
      sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
      ta="center"
      fz={30}
      fw={700} 
      onClick={() => router.push('/')} 
      style={{cursor:"pointer"}}
      >Markdown Editor</Text>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
          <a onClick={() => router.push('/')}>Home</a>
          <Space w="lg" />
          {session && (<a onClick={() => router.push('/pastes')}>View Pastes</a>)}

          </Group>
          {session && (
  <Group position="center" className={classes.hiddenMobile} grow pb="xl" px="md" mt="sm">  
    <Button onClick={() => signOut()} >Sign out</Button>
  </Group>  
)}
{!session && (
    <>
  <Group position="center" className={classes.hiddenMobile} grow pb="xl" px="md" mt="sm"> 
     <Button onClick={() => signIn()}>Sign in</Button>
  </Group>
  </>
)}

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a onClick={() => router.push('/')}>Home</a>
          <Space w="lg" />
          {session && (<a onClick={() => router.push('/pastes')}>View Pastes</a>)}

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {session && (
  <Group position="center" grow pb="xl" px="md" mt="sm">  
    <Button onClick={() => signOut()}>Sign out</Button>
  </Group>
  
)}
{!session && (
  <Group position="center" grow pb="xl" px="md" mt="sm"> 
    <Button onClick={() => signIn()}>Sign in</Button>
  </Group>
)}
        </ScrollArea>
      </Drawer>
    </Box>

    </>
  )
}
