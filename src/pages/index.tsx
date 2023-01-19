import { Container, Divider, Space, Text, createStyles, Title, SimpleGrid, Button, ThemeIcon, Grid, Col  } from "@mantine/core"
import styles from "../styles/Home.module.css"
import { IconArrowDown, IconRoute, IconDeviceGamepad, IconSchema, IconClock } from '@tabler/icons';
import Link from "next/link";
import { useRouter } from 'next/router'

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
    icon: IconRoute,
    title: 'Generate routes for express app',
    description: "Using the code generator you can easily generate routes for your express app",
  },
  {
    icon: IconDeviceGamepad,
    title: 'Controllers',
    description: 'Generate controllers for your express app',
  },
  {
    icon: IconSchema,
    title: 'Schema',
    description:
      "Generate schema database for your express app.",
  },
  {
    icon: IconClock,
    title: 'Save time',
    description:
      'Save time by generating code for your express app',
  },
];


export default function Home() {
  const router = useRouter()
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
     Mongo Express Generator
    </div>
<Text
sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
ta="center"
fz={25}
fw={600}
>Code Generator for mongo express app</Text>
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
         Code gen for Mern  Backend
          </Title>
          <Text color="dimmed">
        Code generator for mongo express app
        using mongoose and express
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={() => router.push('/model')}
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