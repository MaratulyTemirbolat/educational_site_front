"use client";
import "./TeacherModal.scss";
import { StudentTeacherInChat } from "@/models/chats.models";
import Button from "@/components/shared/Buttons/Button";

type TeacherModalProp = {
  teacher: StudentTeacherInChat,
  handleChatBtn: () => void,
}

export default function TeacherModal(
  {
    teacher,
    handleChatBtn
  }: TeacherModalProp
) {
  console.log(teacher);
  return (
    <div className="teach__modal__cont">
      <div className="personal__teacher__data">
        <p className="full__name">{teacher.user.first_name} {teacher.user.last_name}</p>
        <p className="email">{teacher.user.email}</p>
        <p className="tought__subj">Количество предметов: {teacher.tought_subjects?.length}</p>
        <p className="datetime__created__cont">Регистрация: <span className="datetime__created">{teacher.user.datetime_created}</span></p>
      </div>
      <div className="subscr__buttons">
        <p
          className="subscription"
        >
          Подписка:
          <span className={`status_subscr ${teacher.status_subscription ? "green" : ""}`}>
            {teacher.status_subscription ? teacher.status_subscription.name : "Неактивная"}
          </span>
        </p>

        <div className="chat__btn">
          <Button
            text="Создать чат"
            isEnable={true}
            handleSuccess={handleChatBtn}
          />
        </div>
      </div>
    </div>
  );
}