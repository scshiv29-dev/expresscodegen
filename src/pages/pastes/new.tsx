import React from 'react'
import Base from '../../component/Base'
import Editor from '../../component/Editor'
import { Button } from '@mantine/core'


export default function New() {
  const[data,setData]=React.useState<any>("")
  return (
   <Base>
  <Editor
content={data.content}
changeContent={setData}
/>
<Button onClick={()=>console.log(data)}>Save</Button>
   </Base>
  )
}
