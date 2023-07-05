"use client";
import "./AnswersListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { QuizAnswer } from "@/models/tests.models";

type AnswerListItemProps = {
    answer: QuizAnswer,
    questionID: number,
    userAnswer: QuizAnswer,
}

export default function AnswerListItem({
  answer,
  questionID,
  userAnswer,
}: AnswerListItemProps) {
  return (
    <div className="answer__option">
      <div className="answer__detail">
        <input
          type="radio"
          name={String(questionID)}
          id={String(answer.id)}
          value={answer.id}
          disabled={true}
          checked={userAnswer.id == answer.id ? true : false}
        />
        <label htmlFor={String(answer.id)}>{answer.name}</label>
      </div>
      {userAnswer.id == answer.id && <div className="asnwer__is__correct">
        <FontAwesomeIcon
          icon={answer.is_correct ? faCheck : faXmark}
          style={{color: answer.is_correct ? "green" : "red"}}
        />
      </div>}
      {userAnswer.id != answer.id && answer.is_correct == true && <div className="asnwer__is__correct">
        <FontAwesomeIcon icon={faCheck} style={{color: "green"}} />
      </div>}
    </div>
  );
};