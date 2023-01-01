import MarkdownPreview from '@uiw/react-markdown-preview';



export default function Preview(content: any) {
  return (
    <MarkdownPreview source={content} />
  )
}