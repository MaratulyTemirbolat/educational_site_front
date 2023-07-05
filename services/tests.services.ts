import localforage from "localforage";

import { HOST, TOKEN_KEY_NAME } from "@/services/index";
import { fetcher, PomiseResponse } from "./helpers/fetcher";
import { UploadedAnswer } from "@/models/tests.models";
import { updateAccessToken } from "./auth.services";

export const SUBJECT_QUIZ_TYPE: number = 1,
             TOPIC_QUIZ_TYPE: number = 2,
             CLASS_QUIZ_TYPE: number = 3;

type GeneratedQuizBody = {
  name: string;
  quiz_type: number,
  subject_id?: number,
  class_number?: number,
  topic_id?: number,
};

export async function generateQuiz(
  name: string,
  quizType: number,
  subjectId: number | null = null,
  classNumber: number | null = null,
  topicId: number | null = null
): Promise<PomiseResponse> {
  await updateAccessToken();
  const accessToken: string | null = await localforage.getItem("access");
  const genQuizBody: GeneratedQuizBody = {
    name: name,
    quiz_type: quizType
  };

  if (subjectId) genQuizBody.subject_id = subjectId;
  else if (classNumber) genQuizBody.class_number = classNumber;
  else if (topicId) genQuizBody.topic_id = topicId;

  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/tests/quiz`,
      {
        method: "POST",
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(genQuizBody),
      }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново" } }
};

export async function uploadTestAnswers(
  id: number,
  userAnswers: Array<UploadedAnswer>
): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
      `${HOST}/api/v1/tests/quiz/${id}/upload_answers`,
      {
        method: "POST",
        headers: {
          Authorization: `${TOKEN_KEY_NAME} ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ questions: userAnswers }),
      }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново" } }
};

export async function fetchMyQuizes(page: number = 1): Promise<PomiseResponse> {
  await updateAccessToken();
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
        `${HOST}/api/v1/tests/quiz?page=${page}`,
        {
          headers: {
            Authorization: `${TOKEN_KEY_NAME} ${accessToken}`
          }
        }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново" } }
};

export async function fetchQuiz(id: number): Promise<PomiseResponse> {
  const accessToken: string | null = await localforage.getItem("access");
  if (accessToken) {
    return fetcher(
        `${HOST}/api/v1/tests/quiz/${id}`,
        {
          headers: {
            Authorization: `${TOKEN_KEY_NAME} ${accessToken}`,
          }
        }
    )
  }
  return { isOk: false, response: { data: "Авторизуйтесь заново" } }
};