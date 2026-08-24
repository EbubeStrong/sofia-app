"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import styled from "styled-components";

interface TextEditorProps {
  value?: string;
  onChange: (html: string) => void;
}

const TextEditorStyled = styled.div`
  width: 100%;
  .ql-toolbar.ql-snow {
    border: 1px solid rgb(16 16 16 / 0.1);
    border-radius: 8px 8px 0px 0px;
    box-sizing: border-box;
    font-family: var(--font-libre-franklin);
    padding: 8px;
  }
  .ql-container.ql-snow {
    border: 1px solid rgb(16 16 16 / 0.1);
    border-radius: 0px 0px 8px 8px;
    font-family: var(--font-libre-franklin);
  }
  .ql-container {
    font-family: var(--font-libre-franklin) !important;
  }
`;

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [onChange, quill]);

  return (
    <TextEditorStyled>
      <div ref={quillRef} style={{ minHeight: "150px" }} />
    </TextEditorStyled>
  );
};

export default TextEditor;
