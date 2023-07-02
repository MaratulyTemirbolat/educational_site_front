"use client";
import "./PersonalChat.scss";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import SecretUser from "@/public/icons/people/user-secret-solid.svg";
import ChatMessage from "@/components/shared/ChatMessage/ChatMessage";
import { useAutosizeTextArea } from "@/hooks/useAutoSizeTextArea";
import { useUserStore, UseUser } from "@/store/user.store";
import { DetailedChat, ChatMessage as Message } from "@/models/chats.models";
import { getUserChat } from "@/services/chats.services";
import { useSocketStore, SocketStore } from "@/store/socket.store";
import { getRandomNumber } from "@/tools/random";

type PersonalChatProps = {
  chatId: number | null;
};

export default function PersonalChat({
  chatId
}: PersonalChatProps) {
  const [ socket, setSocket, resetSocket ] = useSocketStore((state: SocketStore) => [
    state.socket,
    state.setSocket,
    state.resetSocket,
  ]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [messageContent, setMessageContent] = useState("");
  const [chat, setChat] = useState<DetailedChat | null>(null);
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser,
  ]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  useAutosizeTextArea(textAreaRef.current, messageContent);
  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim()) setMessageContent(e.target.value);
  };
  const onSocketMessage = useCallback((message: any) => {

    if (message.data) {
      const result = JSON.parse(message.data);
      if (result.accepted && user) {
        const currentDate = new Date();
        const newMessage: Message = {
          id: getRandomNumber(50000),
          content: result.content,
          owner: result.user,
          datetime_created: currentDate.toLocaleString(),
          is_deleted: false,
        }
        console.log(newMessage,user, user['first_name']);
        setMessages((value) => [newMessage, ...value]);
        setMessageContent("");
      }
    }
  }, []);
  const handleBtnClick = () => {
    if (socket && messageContent.trim() && chatId && user) {
      socket.send(JSON.stringify({
        "content": messageContent,
        "chat_id": chatId,
        "user_id": user.id,
        "user": user,
      }));
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
    if (chatId) {
      getUserChat(chatId)
      .then((res) => {
        console.log(res);
        if (res.isOk) {
          setChat(res.response.data);
          setMessages(res.response.data.messages.data);
        }
      });

      setSocket(
        `ws://localhost:8000/ws/chats/${chatId}/`,
        onSocketMessage
      )
    }

    return () => {
      resetSocket(onSocketMessage);
    }
  }, [chatId]);
  return (
    <>
      {chatId && chat && <div className="personal__chat">

        <div className="personal__chat__header">
          <div className="chat__head__data">

            <div className="user__img__wrapper">
              <Image src={SecretUser} alt="secret user"/>
            </div>

            <div className="chat__user__info">
              <div className="chat__user__name">
                {user?.id != chat.student.user.id ? chat.student.user.first_name : chat.teacher.user.first_name}
                {user?.id != chat.student.user.id ? chat.student.user.last_name : chat.teacher.user.last_name}
              </div>
              <div className="message__number">
                already {chat.messages.data.length} messages
              </div>
            </div>

          </div>

          <div onClick={() => setIsFavorite(!isFavorite)} className="is__favorite__img">
            <FontAwesomeIcon style={{ color: `${isFavorite ? "orange" : "gray"}` }} icon={faStar} />
          </div>
        </div>

        <div className="messaging__container">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              isMe={user?.id != message.owner.id ? false : true}
            />
          ))}
        </div>

        <div className="personal__chat__footer">
          <textarea
            ref={textAreaRef}
            onChange={handleMessageInput}
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
        </div>

      </div>}
    </>
  );
};