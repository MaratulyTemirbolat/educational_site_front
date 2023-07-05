"use client";
import "./QuestionListItem.scss";

import {GeneratedQuestion} from "@/models/tests.models";
import AnswersGeneratedItem from "@/components/Answers/AnswersListItem/AnswersGeneratedItem";

type QuestionGeneratedListItemProps = {
    indexNumber: number;
    quizQuestion: GeneratedQuestion,
    handleChange: (questionID: number, answerID: number) => void,
}

export default function QuestionGeneratedListItem({
    indexNumber,
    quizQuestion,
    handleChange
}: QuestionGeneratedListItemProps) {
  return (
    <div className="question__list__item__div">
      <div className="item__question__part">
        {indexNumber}. {quizQuestion.name}?
        <span className={"points__number"}>(1 point)</span>
      </div>

      <div className="item__answers__part">
        {quizQuestion.answers.map(answer => (
            <AnswersGeneratedItem
              key={answer.id}
              answer={answer}
              questionID={quizQuestion.id}
              handleChange={handleChange}
            />
        ))}
      </div>
    </div>
  );
};