"use client";
import "./AnswersListItem.scss";

import { QuizAnswer } from "@/models/tests.models";

type AnswersGeneratedItemProps = {
    answer: QuizAnswer,
    questionID: number,
    handleChange: (questionID: number, answerID: number) => void, 
}

export default function AnswersGeneratedItem({
  answer,
  questionID,
  handleChange
}: AnswersGeneratedItemProps) {
  return (
    <div className="answer__option">
      <div className="answer__detail">
        <input
          type="radio"
          name={String(questionID)}
          id={String(answer.id)}
          value={answer.id}
          disabled={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (handleChange) handleChange(questionID, Number(e.target.value))
          }}
        />
        <label htmlFor={String(answer.id)}>{answer.name}</label>
      </div>
    </div>
  );
};