"use client";
import "./ClassSubjectCard.scss";

import Link from "next/link";

import { ClassSubject } from "@/models/subjects.models";

type ClassSubjectCardProps = {
    classSubject: ClassSubject;
};

export default function ClassSubjectCard(
  { classSubject }: ClassSubjectCardProps) 
{
  return (
    <div className="class__subject__card">
      <div className="class__subject__body">
        <h2 className="class__subject__title">{classSubject.name}</h2>
        <p className="class__subject__description">Описание предмета отсутсвует...</p>
      </div>
      <ul className="class__subject__details">
        <li className="class__subject__detail">
          <span className="class__subj__bold">Предмет:</span>
          {classSubject.general_subject.name}
        </li>
        <li className="class__subject__detail">
          <span className="class__subj__bold">Класс:</span>
          {classSubject.attached_class.number}
          <span className="class__span">класс</span>
        </li>
        <li className="class__subject__detail">
          <span className="class__subj__bold">Дата создания:</span>
          {classSubject.datetime_created}
        </li>
        <li className="class__subject__detail "
        >
          <span className="class__subj__bold">Статус:</span> 
          <span 
            className={`${classSubject.is_deleted ? "non-active" : "active"}`}
          >{classSubject.is_deleted ? "Неактивный" : "Активный"}</span>
        </li>
      </ul>
      <div className="class__subj__links">
        <Link
          className="class__subj__link"
          href={`/main/subjects/${classSubject.id}`}
        >Просмотреть</Link>
      </div>
    </div>
  );
};