import React from 'react'
import { Input, JsonInput,Textarea } from '@mantine/core'

export default function Controller() {
        const [value, setValue] = React.useState()
  return (
    <div>
        <Input label="Name" placeholder="Enter name" onChange={(e)=>setValue(e.target.value)} />
    {JSON.stringify(value)}
    </div>
  )
}
