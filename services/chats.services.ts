import localforage from "localforage";

import {
  HOST,
  TOKEN_KEY_NAME
} from "./index";
import { fetcher, PomiseResponse } from "./helpers/fetcher";
import { updateAccessToken } from "./auth.services";


export async function getUserChats(): Promise<PomiseResponse> {
  await updateAccessToken();
  const accessToken: string | null = await localforage.getItem("access");
  return fetcher(
    `${HOST}/api/v1/chats/chats`,
    {
      headers: {
        Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
      }
    }
  )
};

export async function getUserChat(chatID: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  return fetcher(
    `${HOST}/api/v1/chats/chats/${chatID}`,
    {
      headers: {
        Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
      }
    }
  )
};

export async function createChat(studentID: number, teacherID: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/chats/chats`,
      {
        method: "POST",
        body: JSON.stringify({ teacher: teacherID, student: studentID }),
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        }
      }
    )
  }
  return { isOk: false, response: {response: "Авторизуйтесь заново"} }
};
