import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MarkDownPreview = dynamic(
  () => import("@uiw/react-markdown-preview"),
  { ssr: false }
);

export default function Preview(content: any) {
  return (
    <MarkDownPreview source={content} />
  )
}