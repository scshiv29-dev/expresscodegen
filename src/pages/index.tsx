import { Container, Divider, Text } from "@mantine/core"
import styles from "../styles/Home.module.css"
import { IconArrowDown } from '@tabler/icons';
import Link from "next/link";

export default function Home() {
  
  return (
    <>
  <div style={{
      position: "relative",
      textAlign: "center",
      color: "white"
  }}> 
      <img 
      src="https://img.freepik.com/free-vector/technology-wire-mesh-network-connection-digital-background_1017-28407.jpg?w=1480&t=st=1672575841~exp=1672576441~hmac=cdb652e9c7b05fc6274e6d560f60684012501252afdf39098d09b43b92c1fb59"
      className={styles.image}
      />
    <div className={styles.flexer} >
    <Text  
variant="gradient"
gradient={{ from: '#971c54', to: '#007174', deg: 45 }}
sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
ta="center"
fz={150}
fw={700} 
>Markdown Editor</Text>
<Text
sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
ta="center"
fz={25}
fw={600}
>Shivam u ill, but slogan soch :)</Text>
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
</div>
<Container size="sm" px="sm" id="features">
        
        <Divider
        my="xl"
        label={
          <Text
        ta="center"
        fz={45}
        >
          Unrivalled writing experience
        </Text>
        }
        labelPosition="center"
        />
</Container>
 </>

  )
}
