import localforage from "localforage";

import {
  HOST,
  TOKEN_KEY_NAME
} from "./index";
import { fetcher } from "./helpers/fetcher";
import { updateAccessToken } from "./auth.services";


export async function getUserChats() {
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

export async function getUserChat(chatID: number) {
  const accessToken: string | null = await localforage.getItem("access");
  return fetcher(
    `${HOST}/api/v1/chats/chats/${chatID}`,
    {
      headers: {
        Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
      }
    }
  )
}
