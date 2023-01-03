import React from 'react'
import { getPasteAndUpdateView, supasupabase } from '../../../lib/supabase';
import dynamic from 'next/dynamic';
import  MarkdownPreview from '@uiw/react-markdown-preview';
const PreviewMarkdown = dynamic(
  () =>
    import("@uiw/react-markdown-preview").then((mod) => {
      return mod.default;
    }),
  { ssr: false }
);

export default function One({paste,viewOnce}:any) {
  return (
    <>
      {
        viewOnce?
        <h1> This paste was made private or was set to view Once and cannot be viewed anymore ask the author to make turn of view Once</h1>
        :
        <>
        <h1>{paste[0].title}</h1>
        <PreviewMarkdown source={paste[0].content} />
        </>
      }
      

    </>
  )
}

export async function getServerSideProps(context: { req: any; res: any; }) {
        const { req, res } = context;
        const id=context.params.id
        console.log(id);
         const data = await getPasteAndUpdateView(id)
         if(data){
          const dd:any=data[0]
          console.log(dd);
          
            if(dd.isViewOnce){
              return {
                props: {
                  viewOnce:true
              },
          }
        }
      }  
  return {
        props: {
        paste:data
        },
        };
                        
        }

      
        