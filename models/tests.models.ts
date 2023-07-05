export type QuizType = {
  id: number;
  name: string;
  is_deleted: boolean;
  datetime_created: string;
};

export type GeneratedQuestion = {
  id: number;
  name: string;
  attached_subject_class: number;
  is_deleted: boolean;
  datetime_created: string;
  answers: Array<QuizAnswer>;
}

export type QuizAnswer = {
  id: number;
  name: string;
  is_correct: boolean;
  question: number;
  is_deleted: boolean;
  datetime_created: string;
};

export type GeneratedQuiz = {
  id: number;
  name: string;
  student: number;
  quiz_type: QuizType;
  datetime_created: string;
  attached_questions: Array<GeneratedQuestion>; 
};

export type QuizListItem = {
  id: number;
  name: string;
  quiz_type: QuizType;
  student: number;
  datetime_created: string;
};

export type QuizQuestionsMM = {
  id: number;
  quiz: number;
  question: GeneratedQuestion;
  user_answer: QuizAnswer;
};

export type QuizDetailed = {
  id: number;
  name: string;
  quiz_type: QuizType;
  student: number;
  quiz_questions: Array<QuizQuestionsMM>;
  datetime_created: string;
  correct_questions: number;
};

export type UploadedAnswer = {
  quiz: number;
  question: number;
  user_answer: number;
};