import "./ClassCard.scss";
import { Class } from "@/models/subjects.models";

type ClassCardProps = {
  myClass: Class;
  iconName: string;
};

export default function ClassCard(
  { myClass, iconName = "fa-bicycle" }: ClassCardProps 
) {
  return (
    <li>
      <div className="icon">
        <i className={`fa-solid ${iconName}`}></i>
      </div>
      <div className="title">Класс {myClass.number}</div>
      <div className="descr">Дата создания: {myClass.datetime_created}</div>
    </li>
  );
};