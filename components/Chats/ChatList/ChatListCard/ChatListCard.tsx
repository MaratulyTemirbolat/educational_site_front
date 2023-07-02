"use client";
import "./ChatListCard.scss";
import Image from "next/image";

import { PersonalChat, StudentTeacherInChat } from "@/models/chats.models";
import SecretUser from "@/public/icons/people/user-secret-solid.svg";

type ChatListCardProps = {
    personalChat: PersonalChat;
    userInChat: StudentTeacherInChat;
};

export default function ChatListCard(
  {
    personalChat,
    userInChat
  }: ChatListCardProps
) {
  return (
    <div className="personal__chat__list">
      <div className="pers__chat__person__img">
        <Image src={SecretUser} alt="Secret user"/>
      </div>
      <div className="chat__user__data">
        <div className="chat__user__name">
            {userInChat.user.first_name} {userInChat.user.last_name}
        </div>
        <div className="online__status">
          <div className="chat__status" style={{width: "10px", height: "10px", borderRadius: "50%"}}></div>
          <span className="chat__status__message">offline</span>
        </div>
      </div>
    </div>
  );
};