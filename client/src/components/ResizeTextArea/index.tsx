import React, { useRef } from "react";
import styled from "styled-components";
import { cx } from "@emotion/css";

const TextArea = styled.textarea`
  padding: 2px;
  resize: none;
  overflow-y: hidden;
`;

interface PropsType {
  className?: string;
  placeholder?: string;
  saveContent: (content: string) => void;
}

function Index({ className, placeholder, saveContent }: PropsType) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef !== null && textAreaRef.current !== null) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveContent(e.target.value);
    resizeTextArea();
  };

  return (
    <TextArea
      ref={textAreaRef}
      onChange={onChange}
      rows={1}
      className={cx(className)}
      placeholder={placeholder}
    />
  );
}

export default Index;
