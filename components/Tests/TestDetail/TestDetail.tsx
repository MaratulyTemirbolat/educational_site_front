"use client";
import "./TestDetail.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { QuizDetailed, QuizQuestionsMM } from "@/models/tests.models";
import { fetchQuiz } from "@/services/tests.services";
import { useUserStore, UseUser } from "@/store/user.store";
import QuestionListItem from "@/components/Questions/QuestionListItem/QuestionListItem";
import TestHeader from "../TestHeader/TestHeader";

type TestDetailProps = {
  id: number;
};

export default function TestDetail({ id }: TestDetailProps) {
  const [quiz, setQuiz] = useState<QuizDetailed | null>(null);
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser
  ]);
  const router = useRouter();

  useEffect(() => {
    if (!user) fetchUser();
    if (!user) router.push("/login");

    if (!quiz) {
      fetchQuiz(id)
      .then(resp => {
        console.log(resp)
        if (resp.isOk) setQuiz(resp.response.data);
      });
    }
  }, [quiz]);
  console.log
  return (
    <div className="test__detail__cont">
      {quiz && <div className="quiz__detaill__data">
        <TestHeader
          quiz={quiz}
          correctQuestions={quiz.correct_questions}
          totalQuestion={quiz.quiz_questions.length}
          isPassed={quiz.quiz_questions.length !== 0 ? true : false}
        />
        {/* <div className="quiz__detail__header">
          <div className="header__left">
            <h1 className="quiz__detail__id">#{quiz.id}</h1>
            <h2 className="quiz__detail__name">
                {quiz.name}
            </h2>
            <p className="quiz__detail__type">Тип теста: {quiz.quiz_type.name}</p>
            <p className="quiz__detail__datetime">Создан: {quiz.datetime_created}</p>
            <p
              className={`quiz__detail__state`}
            >
              Состояние:
              <span className={`${quiz.quiz_questions.length !== 0 ? "passed" : "not-passed"}`}>
              {quiz.quiz_questions.length === 0 ? "Не завершен" : "Завершен"}
              </span>
            </p>
          </div>
          <div className="header__right">
            <div className="correct__number">{quiz.correct_questions}/{quiz.quiz_questions.length}</div>
            <Link className="back__link" href={"/main/tests"}>Назад</Link>
          </div>
        </div> */}
        <hr />

        <div className="quiz__detail__body">
            {quiz.quiz_questions.map((question: QuizQuestionsMM, index: number) => (
                <QuestionListItem
                  key={question.id}
                  indexNumber={index + 1}
                  quizQuestion={question}
                />
            ))}
            <Link className="back__link" href={"/main/tests"}>Назад</Link>
        </div>
      </div>}
    </div>
  );
};