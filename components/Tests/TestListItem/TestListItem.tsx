"use client";
import "./TestListItem.scss";
import { QuizListItem } from "@/models/tests.models";

const QUIZ_TYPE_COLORS: any = {
  1: "red",
  2: "green",
  3: "yellow",
};

type TestListItemProps = {
    quizItem: QuizListItem;
};

export default function TestListItem({ quizItem }: TestListItemProps) {
  return (
    <div className="test__item__card">
      <div
        className="test__item__card__square"
        style={{background: QUIZ_TYPE_COLORS[quizItem.quiz_type.id]}}
      >
      </div>
      <div className="test__item__card__info">
        <p className="test__item__id">#{quizItem.id}</p>
        <p className="test__item__name">Имя: "{quizItem.name}"</p>
        <p className="test__item__type">Тип теста: "{quizItem.quiz_type.name}"</p>
        <p className="test__item__date__time">Дата проведения: {quizItem.quiz_type.datetime_created}</p>
      </div>
    </div>
  );
};