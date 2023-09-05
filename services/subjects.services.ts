import localforage from "localforage";

import { fetcher, PomiseResponse } from "./helpers/fetcher";
import { HOST, TOKEN_KEY_NAME } from "@/services/index";

export async function fetchClassSubject(id: number, page: number = 1): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/subjects/class_subjects/${id}?page=${page}`,
      {
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
        }
      }
    );
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново"} };
};

export async function fetchClassSubjectTeachers(id: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/subjects/class_subjects/${id}/get_teachers`,
      {
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
        }
      }
    );
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново"} };
};

export async function registerForSubject(id: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/subjects/class_subjects/${id}/register`,
      {
        method: "POST",
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
        }
      }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново"} };
};

export async function fetchTopic(id: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/subjects/topics/${id}`,
      {
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
        }
      }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново"} };
};


