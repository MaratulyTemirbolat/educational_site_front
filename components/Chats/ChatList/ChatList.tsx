"use client";
import "./ChatList.scss";

import {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react"; 
import { useRouter } from "next/navigation";

import ChatListCard from "./ChatListCard/ChatListCard";
import SearchInput from "@/components/shared/SearchInput/SearchInput";
import PersonalChat from "../PersonalChat/PersonalChat";
import { getUserChats } from "@/services/chats.services";
import { PersonalChat as PersonalChatType} from "@/models/chats.models";
import { useUserStore, UseUser } from "@/store/user.store";


export default function ChatList() {
  const handleSearchInput = useCallback((fullName: string) => {
    const chats: PersonalChatType[] = joinedChats.filter(
      (chat: PersonalChatType) => (chat.student.user.id != user?.id && (chat.student.user.first_name + chat.student.user.last_name).includes(fullName)) || (chat.teacher.user.id != user?.id && (chat.teacher.user.first_name + chat.teacher.user.last_name).includes(fullName))
    )
    setJoinedChats(chats);
  }, []);
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser,
  ]);
  const router = useRouter();
  const isUser: boolean = useMemo(() => user ? true : false, [user]);
  const [joinedChats, setJoinedChats] = useState<Array<PersonalChatType>>([]);
  const [curChatId, setCurChatId] = useState<number | null>(null);
  const handleChatClick = (chatID: number) => {
    if (curChatId != chatID) setCurChatId(chatID);
  };
  useEffect(() => {
    if (!user) fetchUser();
    if (!user) router.push("/login");
    if (joinedChats.length == 0) {
      getUserChats()
      .then(value => {
        console.log(value);
        if (value.isOk) setJoinedChats(value.response.data);
      });
    }
  }, [joinedChats]);

  return (
    <>
      {isUser && <div className="user__chat__container">
        <div className="chat__list__container">
          <div className="search__div">
            <SearchInput
              name="fullname"
              placeholderText="Поиск..."
              handleInput={handleSearchInput}
            />
          </div>
          <div className="chats__list">
            {
              joinedChats.map(
                (persChat: PersonalChatType) => (
                  <div
                    style={{width: "100%", cursor: "pointer"}}
                    key={persChat.id}
                    onClick={() => handleChatClick(persChat.id)}
                  >
                    <ChatListCard
                      personalChat={persChat}
                      userInChat={user?.id != persChat.student.user.id ? persChat.student : persChat.teacher}
                    />
                  </div>
                )
              )
            }
          </div>
        </div>

        <div className="personal__chat__wrapper">
          {curChatId && <PersonalChat chatId={curChatId}/>}
        </div>
      </div>}
    </>
  );
};