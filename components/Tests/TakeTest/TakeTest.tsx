"use client";
import "./TakeTest.scss";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/Buttons/Button";

import { useUserStore, UseUser } from "@/store/user.store";
import { useTestStore, TestStore } from "@/store/tests.store";
import TestHeader from "../TestHeader/TestHeader";
import { UploadedAnswer } from "@/models/tests.models";
import { uploadTestAnswers } from "@/services/tests.services";
import QuestionGeneratedListItem from "@/components/Questions/QuestionListItem/QuestionGeneratedListItem";
import InformMessage from "@/components/shared/InformMessage/InformMessage";

export default function TakeTest() {
  const [ generatedQuiz, resetStore ] = useTestStore((state: TestStore) => [
    state.generatedQuiz,
    state.resetStore,
  ]);
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser,
  ]);
  const [answers, setAnswers] = useState<Array<UploadedAnswer>>([]);
  const router = useRouter(); 
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [informMsg, setInformMsg] = useState<string>("");
  const isGeneratedQuiz: boolean = useMemo(
    () => generatedQuiz ? true : false,
    [generatedQuiz]
  );

  useEffect(() => {
    if (!user) fetchUser();
    if (!user) router.push("/login");
    if (!generatedQuiz) router.push("/main/tests");
  }, [user, generatedQuiz]);

  const handleAnswerSelect = (questionID: number, answerID: number): void => {
    let foundInd: number = answers.findIndex(userAnsw => userAnsw.question == questionID);
    if (generatedQuiz) {
      const userAnsw: UploadedAnswer = {
        quiz: generatedQuiz.id,
        question: questionID,
        user_answer: answerID
      }
      if (foundInd == -1) setAnswers([...answers, userAnsw]);
      else if (foundInd != -1) setAnswers(answers => [...(answers.filter(answ => answ.question != questionID)), userAnsw]);
    }
  };

  const areAnsweredAllQuestions: boolean = useMemo(
    () => answers.length == generatedQuiz?.attached_questions.length,
    [answers]
  );

  const handleSendTest = (): void => {
    if (areAnsweredAllQuestions && generatedQuiz) {
      uploadTestAnswers(generatedQuiz.id, answers)
      .then(resp => {
        console.log(resp)
        if (resp.isOk) {
          const id: number = generatedQuiz.id;
          resetStore();
          router.push(`/main/tests/${id}`);
        } else {

        }
      })
    };
  };

  return (
    <div className="test__detail__cont">
      {isGeneratedQuiz && <div className="quiz__detaill__data">
        <TestHeader
          quiz={generatedQuiz}
          correctQuestions={isGeneratedQuiz ? questionNumber+1 : 0}
          totalQuestion={0}
        />
        <hr />
        <div className="take__test__body">
            {generatedQuiz?.attached_questions.map((question, index: number) => (
              <QuestionGeneratedListItem
                key={question.id}
                indexNumber={index + 1}
                quizQuestion={question}
                handleChange={handleAnswerSelect}
              />
            )
            )}
            <div className="take__test__btn__wrapper">
              <Button
                text="Завершить"
                isEnable={areAnsweredAllQuestions}
                handleSuccess={handleSendTest}
              />
            </div>
        </div>
      </div>}
      <h1>Нет активных тестов на данный момент!</h1>
      {
        informMsg &&
        <InformMessage
          isError={isError}
          msg={informMsg}
          handleClose={() => setInformMsg("")}
        />
      }
    </div>
  );
};