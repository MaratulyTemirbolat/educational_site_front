"use client";
import "./ClassSubjectDetail.scss";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/shared/Buttons/Button";
import TopicList from "@/components/Topics/TopicList/TopicList";
import { ClassSubjectDetail } from "@/models/subjects.models";
import { StudentTeacherInChat } from "@/models/chats.models";
import {
  fetchClassSubject,
  fetchClassSubjectTeachers,
  registerForSubject,
} from "@/services/subjects.services";
import { generateQuiz, SUBJECT_QUIZ_TYPE } from "@/services/tests.services";
import { createChat } from "@/services/chats.services";
import { useUserStore, UseUser } from "@/store/user.store";
import InformMessage from "@/components/shared/InformMessage/InformMessage";
import TeacherModal from "../TeacherModal/TeacherModal";
import { useTestStore, TestStore } from "@/store/tests.store";

type ClassSubjectDetailProps = {
  id: number;
  page?: number;
}

export default function ClassSubjectDetail(
  { 
    id,
    page = 1
  }: ClassSubjectDetailProps
) {
  const [classSubject, setClassSubject] = useState<ClassSubjectDetail | null>(null);
  const [teacherList, setTeacherList] = useState<Array<StudentTeacherInChat>>([]);
  const [currentTeacher, setCurrentTeacher] = useState<StudentTeacherInChat | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [informMsg, setInformMsg] = useState<string>("");
  const [user, fetchUser, addRegisteredSubj] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser,
    state.addRegisteredSubj
  ]);
  const [setQuiz] = useTestStore((state: TestStore) => [
    state.setQuiz
  ]);
  const router = useRouter();
  const isRegistered: boolean = useMemo(() => {
    if (user && (!user.student || user.teacher)) {
      return false;
    }
    const clSubjInd: number = user?.student.registered_subjects.findIndex(
      (classSubj: {id: number}
    ) => classSubj.id == id);
    return clSubjInd != -1 ? false : true;
  }, [user?.student]);

  useEffect(() => {
    if(!user) fetchUser();
    if (!user) router.push("/login");
    fetchClassSubject(id, page)
    .then(resp => {
      if (resp.isOk){
        setClassSubject(resp.response.data);
      }
    });

    fetchClassSubjectTeachers(id)
    .then(resp => {
      if (resp.isOk) {
        setTeacherList(resp.response.data);
      }
    });
  }, [id, page]);

  const handleTeacherClick = (teacher: StudentTeacherInChat) => {
    if (teacher.id == currentTeacher?.id) {
      return setCurrentTeacher(null);
    }
    return setCurrentTeacher(teacher);
  };

  const handleRegiSubject = (): void => {
    registerForSubject(id)
    .then(res => {
      if (!res.isOk) setIsError(true);
      else {
        if (classSubject){
          addRegisteredSubj(
            {
              id: classSubject.id,
              name: classSubject.name,
              is_deleted: classSubject.is_deleted,
              datetime_created: classSubject.datetime_created
            }
          )
        }
      }
      setInformMsg(res.response.response);
    })
  };

  const handleTakingTest = (): void => {
    if (classSubject) {
      generateQuiz(
        classSubject.name,
        SUBJECT_QUIZ_TYPE,
        classSubject.general_subject.id
      ).then(resp => {
        if (resp.isOk) {
          setQuiz(resp.response.data);
          router.push("/main/tests/taketest");
        }
      });
    }
  };

  const handleCloseInformMessage = useCallback(() => {
    if (informMsg) {
      setInformMsg("");
      setIsError(false);
    }
  }, [informMsg]);

  const handleAddToChat = useCallback(() => {
    if (currentTeacher && user && user.student && currentTeacher.user.id != user.id) {
      createChat(user.student.id, currentTeacher.id)
      .then(resp => {
        if (!resp.isOk) {
          setIsError(true);
          setInformMsg(resp.response.response);
        } else router.push("/main/chats");
      })
    }
  }, [currentTeacher]);

  return (
    <>
      {classSubject && user && <div className="class__subject__detail__div">
        <div className="class__subject__info">
          <h1 className="class__subj__det__title">{classSubject.name}</h1>
          <div className="class__subj__det__body">
            <div className="class__subj__det__img">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/79/Mathematics.png"
                alt="Картинка"
              />
            </div>
            <div className="class__subj__content">
              <div className="content__row">
                <div className="class__subj__description">Описание предмета отсутсвует...</div>
              </div>

              <div className="content__row">
                <h2 className="row__title">
                  Преподаватели дайнной дисциплины:
                </h2>
                <div className="tought__teachers__list">
                  {teacherList.map(teacher => (
                    <div key={teacher.id} className="teacher__div">
                      <div
                        onClick={() => handleTeacherClick(teacher)}
                        className="teacher"
                      >
                        {teacher.user.first_name} {teacher.user.last_name}
                      </div>
                      {currentTeacher?.id == teacher.id && <TeacherModal handleChatBtn={handleAddToChat} teacher={teacher}/>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="content__row">
                <h2 className="row__title">
                  Общий предмет:
                </h2>
                <div className="general__subjects">
                  <div className="gen__subject">
                    {classSubject.general_subject.name}
                  </div>
                </div>
              </div>

              <div className="content__row">
                <h2 className="row__title">
                  Класс предмета:
                </h2>
                <div className="classes">
                  <div className="class">
                    {classSubject.attached_class.number}
                  </div>
                </div>
              </div>

              <div className="content__row">
                <h2 className="row__title">
                  Статус предмета:
                </h2>
                <div className={`status ${classSubject.is_deleted ? "" : "green"}`}>
                  {classSubject.is_deleted ? "Удалённый" : "Активный"}
                </div>
              </div>

              <div className="content__row">
                <h2 className="row__title">
                  Время и Дата создания:
                </h2>
                <div className="datetime__created">
                  {classSubject.datetime_created}
                </div>
              </div>

              <div className="class__subj__buttons">
                <div className="btn__wrapper">
                  <Button
                    text="Назад"
                    isEnable={true}
                    handleSuccess={() => router.push("/main/subjects")}
                  />
                </div>

                {isRegistered && <div className="btn__wrapper">
                  <Button
                    text="Зарегестрироваться на предмет"
                    isEnable={isRegistered}
                    handleSuccess={handleRegiSubject}
                  />
                </div>}
                {!isRegistered && user && <div className="btn__wrapper">
                  <Button
                    text="Пройти тест"
                    isEnable={true}
                    handleSuccess={handleTakingTest}
                  />
                </div>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="class__subj__topics">
          <h3 className="topics__title">Темы предмета "{classSubject.name}"</h3>
          <div className="topics__wrapper">
            <TopicList classSubjectId={id} page={page} topics={classSubject.topics} isUser={user ? true: false}/>
          </div>
        </div>
      </div>}

      {informMsg && <InformMessage msg={informMsg} isError={isError} handleClose={handleCloseInformMessage} />}
      
      {!user && <h1 style={{textAlign: "center", color: "red"}}>Вы не авторизованы!</h1>}
      {!classSubject && user && <h1 style={{textAlign: "center", color: "red"}}>Данного предмета не существует</h1>}
    </>
  );  
};