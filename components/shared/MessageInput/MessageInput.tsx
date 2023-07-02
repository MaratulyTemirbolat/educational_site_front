"use client";
import "./MessageInput.scss";
import { useRef, useState } from "react";
import { useAutosizeTextArea } from "@/hooks/useAutoSizeTextArea";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type MessageInputProps = {
  handleMessageInput: (messageContent: any) => void;
  handleBtnClick: () => void;
}

export default function MessageInput({
  handleMessageInput,
  handleBtnClick,
}: MessageInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [messageContent, setMessageContent] = useState("");
  useAutosizeTextArea(textAreaRef.current, messageContent);

  return (
    <>
      <textarea
        ref={textAreaRef}
        onChange={(e) => handleMessageInput(e.target.value)}
        name="content"
        id="content"
        className="message__texarea"
        rows={1}
        value={messageContent}
        placeholder="Напечатайте своё сообщение..."
      ></textarea>
      <div onClick={handleBtnClick} id="send__icon">
            <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </>
  );
};