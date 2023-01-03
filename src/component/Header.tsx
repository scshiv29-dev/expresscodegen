
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
    Text,
    Anchor,
    Center,
    HoverCard,
    SimpleGrid,
    ThemeIcon,
    UnstyledButton,
    Collapse
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconH1, IconLivePhoto, IconLayoutGridAdd, IconAdjustments } from '@tabler/icons';


  
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
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const features = [
    {
      icon: IconH1,
      title: 'Rich Markdown editor',
      description: 'Our Markdown syntax highlighting is unique. The refined text formatting of the editor helps you visualize the final rendering of your files.',
    },
    {
      icon: IconAdjustments,
      title: 'WYSIWYG controls',
      description: 'We provide very handy formatting buttons and shortcuts, thanks to PageDown, the WYSIWYG-style Markdown editor used by Stack Overflow',
    },
    {
      icon: IconLayoutGridAdd,
      title: 'Smart layout',
      description:
        "Whether you write, you review, you comment… StackEdit's layout provides you with the flexibility you need, without sacrifice.",
    },
    {
      icon: IconLivePhoto,
      title: 'Live preview with Scroll Sync',
      description:
        'Scroll Sync feature accurately binds the scrollbars of the editor panel and the preview panel to ensure that you always keep an eye on the output while writing.',
    },
  ];
  const links = features.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
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
          <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text weight={500}>Features</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
          {session && (
  <Group position="center" className={classes.hiddenMobile} grow pb="xl" px="md" mt="sm">  
  
  <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={() => signOut()}>Sign Out</Button>

  </Group>  
)}
{!session && (
    <>
  <Group position="center" className={classes.hiddenMobile} grow pb="xl" px="md" mt="sm"> 
  <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={() => signOut()}>Sign In</Button>

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
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          {session && (<a onClick={() => router.push('/pastes')}>View Pastes</a>)}
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {session && (
  <Group position="center" grow pb="xl" px="md" mt="sm">  
    <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={() => signOut()}>Sign Out</Button>
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
