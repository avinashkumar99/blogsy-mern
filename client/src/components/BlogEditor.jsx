import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
const BlogEditor = ({ placeholder, id, onKeyDown }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleKeyCommand = (command, editorState) => {
    if (command === "backspace") {
      const currentContent = editorState.getCurrentContent();
      console.log(currentContent);
      if (!currentContent.hasText()) {
        onKeyDown && onKeyDown({ key: "Backspace" }, id);
      }
    }
  };
  return (
    <>
      <div className="h-full w-full border rounded-md p-4 mb-4 focus:border-gray-500">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder={placeholder}
          id={id}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
};

export default BlogEditor;
