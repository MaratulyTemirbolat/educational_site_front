"use client";
import Link from "next/link";

import { GeneratedQuiz, QuizDetailed } from "@/models/tests.models";

type TestHeaderProps = {
  quiz: QuizDetailed | GeneratedQuiz | null,
  isPassed?: boolean,
  correctQuestions: number,
  totalQuestion: number,
};

export default function TestHeader(
  { 
    quiz,
    isPassed = false,
    correctQuestions = 0,
    totalQuestion = 0
  }: TestHeaderProps
){
  return (
    <div className="quiz__detail__header">
      <div className="header__left">
        <h1 className="quiz__detail__id">#{quiz?.id}</h1>
        <h2 className="quiz__detail__name">{quiz?.name}</h2>
        <p className="quiz__detail__type">Тип теста: {quiz?.quiz_type.name}</p>
        <p className="quiz__detail__datetime">Создан: {quiz?.datetime_created}</p>
        <p className={`quiz__detail__state`}>
          Состояние:
          <span className={`${isPassed ? "passed" : "not-passed"}`}>
          {isPassed ? "Завершен" : "Не завершен"}
          </span>
        </p>
      </div>
      <div className="header__right">
        <div className="correct__number">
            {correctQuestions}/{totalQuestion}
        </div>
        <Link className="back__link" href={"/main/tests"}>Назад</Link>
      </div>
    </div>
  );
};