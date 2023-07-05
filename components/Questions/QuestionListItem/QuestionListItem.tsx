"use client";
import "./QuestionListItem.scss";
import { QuizQuestionsMM } from "@/models/tests.models";
import AnswerListItem from "@/components/Answers/AnswersListItem/AnswersListItem";

type QuestionListItemProps = {
    indexNumber: number;
    quizQuestion: QuizQuestionsMM,
}

export default function QuestionListItem(
  {
    indexNumber,
    quizQuestion
  }: QuestionListItemProps
) {
  return (
    <div className="question__list__item__div">
      <div className="item__question__part">
        {indexNumber}. {quizQuestion.question.name}?
        <span className={`points__number ${quizQuestion.user_answer.is_correct ? "" : "wrong"}`}>(1 point)</span>
      </div>

      <div className="item__answers__part">
        {quizQuestion.question.answers.map(answer => (
            <AnswerListItem
              key={answer.id}
              answer={answer}
              questionID={quizQuestion.question.id}
              userAnswer={quizQuestion.user_answer}
            />
        ))}
      </div>
    </div>
  );
};