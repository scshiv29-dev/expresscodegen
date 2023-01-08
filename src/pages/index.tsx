import { Container, Divider, Space, Text, createStyles, Title, SimpleGrid, Button, ThemeIcon, Grid, Col  } from "@mantine/core"
import styles from "../styles/Home.module.css"
import { IconArrowDown, IconH1, IconLivePhoto, IconLayoutGridAdd, IconAdjustments } from '@tabler/icons';
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession,signIn,signOut } from 'next-auth/react'
const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: IconH1,
    title: 'Rich Markdown editor',
    description: "Using our Markdown syntax highlighting, you'll be able to visualise final rendering of your documents",
  },
  {
    icon: IconAdjustments,
    title: 'Controls',
    description: 'Easy to use controls to make your documents look the way you want them to',
  },
  {
    icon: IconLayoutGridAdd,
    title: 'Elegant layout',
    description:
      "Whatever you do... Markdown Editor's layout provides the flexibility you need, without sacrificing quality.",
  },
  {
    icon: IconLivePhoto,
    title: 'Scroll synchronized live preview.',
    description:
      'By using Scroll Sync, you are always able to see the output if you are writing while simultaneously scrolling the editor or preview panels.',
  },
];


export default function Home() {
  const router = useRouter()
  const {data:session} = useSession()
  const { classes } = useStyles();
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));
  
  return (
    <>

    <div className={styles.flexer} >
    <div className={styles.text}>
      MARKDOWN EDITOR
    </div>
<Text
sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
ta="center"
fz={25}
fw={600}
>In-browser Markdown editor</Text>
 </div>
 <div className={styles.read}>
  <Link href="#features" style={{width: "inherit"}} scroll={false}>
 <Text
sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
ta="center"
fz={25}
fw={600}
style={{cursor:"pointer"}}
>
<IconArrowDown 
height={25}
width={25}
/>
Read more</Text>
</Link>
</div>
<Container size="xl" px="xl" id="features">
  
<div className={classes.wrapper}>
<Divider mb="lg"/>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
          Unrivalled writing experience
          </Title>
          <Text color="dimmed">
          Markdown editor is an intuitive and lightweight text-to-HTML conversion tool for web content writers. 
          You can use it to format lists, headers, and for emphasis, as well as to incorporate links and images. 
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={session?() => router.push('/pastes'):() => signIn()}
          >
            Get started
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
  </div>
  
</Container>
 </>

  )
}
