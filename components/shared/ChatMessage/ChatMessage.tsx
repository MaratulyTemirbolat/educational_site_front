"use client";
import "./ChatMessage.scss";

import { ChatMessage } from "@/models/chats.models";

type ChatMessageProps = {
  message: ChatMessage;
  isMe?: boolean;
};

export default function ChatMessage({
  message,
  isMe = false
}: ChatMessageProps) {
  return (
    <div className={`message ${isMe? "me": ""}`}>
      <div className="message__user__info">
        <span className="status__user"></span>
        <div className="message__user__name">{message.owner.first_name}</div>
        <div className="message__creation">{message.datetime_created}</div>
      </div>
      <div className="message__lower__part">
        <div className="message__triangle"></div>
        <div className="message__content">
          {message.content}
        </div>
      </div>
    </div>
  );
};