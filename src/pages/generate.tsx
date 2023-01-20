import React, { useState ,useEffect} from 'react'
import { Autocomplete,Button,Checkbox,Code,Divider,Input,Select } from '@mantine/core'
import { IconAsterisk, IconPlus } from '@tabler/icons';
import { generateModel } from '../utils/generateModel';
export default function Models() {
  const [value, setValue] = React.useState([{
    name: 'name',
    type: 'String',
    required:true,
    unique: true,
    trim:true,
    maxlength:32,
    minlength:0,
    default:{
      has:false,
      value:""
    }
  }]);
const [modelName,setModelName]=useState("Category")
const [code,setCode]=useState("")

const generateCode=()=>{
  const data=generateModel(value,modelName)
  setCode(data)

}

const changeText=(ind:number,data:string)=>{ 
value[ind].name=data;
setValue([...value])
}

const changeType=(ind:number,data:string)=>{
value[ind].type=data;
setValue([...value])
}

const changeMaxlenght=(ind:number,data:number)=>{
value[ind].maxlength=data;
setValue([...value])
}

const changeMinlenght=(ind:number,data:number)=>{
value[ind].minlength=data;
setValue([...value])
}
const changeCheck=(ind:number,nm:string)=>{
  if(nm==="req"){
    value[ind].required=!value[ind].required;
    setValue([...value])
  }
  if(nm==="unq"){
     value[ind].unique=!value[ind].unique;
    setValue([...value])
  }
  if(nm==="trim"){
      value[ind].trim=!value[ind].trim;
      setValue([...value])
    }
  if(nm==="def"){
      value[ind].default.has=!value[ind].default.has;
      setValue([...value])
    }
}
const changeDefault=(ind:number,data:any)=>{
  value[ind].default.value=data;
  setValue([...value])
}
const addNewFeild=()=>{
   setValue([...value,{name:"",type:"",required:false,unique:false,trim:false,maxlength:0,minlength:0,default:{has:false,value:""}}])
}

  return (
    <div>
      <Input placeholder="Model name"  style={{"width":"50%"}} onChange={(e:any)=>setModelName(e.target.value)}/>
<Divider/>
{
  value.map((item,index) => (
    <div key={index} style={{"width":"50%"}}>
      <Input placeholder="Field name" value={item.name} onChange={(e:any)=>changeText(index,e.target.value)} />
      <label>
        Type 
      </label>
 <select onChange={(e)=> changeType(index,e.target.value)}  value={item.type}>
   <option value="String">String</option>
  <option value="Number">Number</option>
  <option value="Boolean">Boolean</option>
  <option value="Array">Array</option>
 </select>
      <Checkbox label="Required" icon={IconAsterisk} color="green" checked={item.required} onChange={()=>changeCheck(index,"req")}/>
      <Checkbox label="Unique"  color={"green"} checked={item.unique} onChange={()=>changeCheck(index,"unq")}/>
      <Checkbox label="Default"  color={"green"} checked={item.default.has} onChange={()=>changeCheck(index,"def")} />
      {item.default.has &&
      <Input placeholder="Default value" value={item.default.value} onChange={(e:any)=>{changeDefault(index,e.target.value)}}/>
}
      {item.type==="String" &&
      <>
      <Checkbox label="Trim"  color={"green"} onChange={()=>{changeCheck(index,"trim")}}/>
      <Input placeholder="Max length" value={item.maxlength} onChange={(e:any)=>{changeMaxlenght(index,e.target.value)}}/>
      <Input placeholder="Min length" value={item.minlength} onChange={(e:any)=>{changeMinlenght(index,e.target.value)}}/>

      </>
      }
    </div>
  ))
}
<Button onClick={addNewFeild}>
  <IconPlus/>
  Add Field 
  </Button>
  {modelName?
  <Button onClick={generateCode}>
    Generate Code
  </Button>:
  <Button disabled>
    Generate Code
  </Button>
  }
  <Code block>{code}</Code>

    </div>
  )
}
