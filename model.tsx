import React, { useState ,useEffect} from 'react'
import { Autocomplete,Button,Checkbox,Code,Divider,Input,Select } from '@mantine/core'
import { IconAsterisk, IconPlus } from '@tabler/icons';
import { generateModel } from '../../utlis/generateModel';
export default function Models() {
  const [value, setValue] = React.useState([{
    name: '',
    type: 'String',
    required:false,
    unique: false,
    trim:false,
    maxlength:0,
    minlength:0
  }]);
const [modelName,setModelName]=useState("")
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

const changeTrim=(ind:number)=>{
value[ind].trim=!value[ind].trim;
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
}
const addNewFeild=()=>{
   setValue([...value,{name:"",type:"",required:false,unique:false,trim:false,maxlength:0,minlength:0}])
}

  return (
    <div>
      <Input placeholder="Model name"  style={{"width":"50%"}} onChange={(e)=>setModelName(e.target.value)}/>
<Divider/>
{
  value.map((item,index) => (
    <div key={index} style={{"width":"50%"}}>
      <Input placeholder="Field name" value={item.name} onChange={(e)=>changeText(index,e.target.value)} />
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
      {item.type==="String" &&
      <>
      <Checkbox label="Trim"  color={"green"} onChange={()=>{changeTrim(index)}}/>
      <Input placeholder="Max length" value={item.maxlength} onChange={(e)=>{changeMaxlenght(index,e.target.value)}}/>
      <Input placeholder="Min length" value={item.minlength} onChange={(e)=>{changeMinlenght(index,e.target.value)}}/>

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