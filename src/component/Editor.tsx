import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
function Editor({value,setValue}:any) {
  return (
    <div>
      <MDEditor value={value} onChange={setValue} >
        <EditerMarkdown source={value} />
      </MDEditor>
    </div>
  );
}

export default Editor;