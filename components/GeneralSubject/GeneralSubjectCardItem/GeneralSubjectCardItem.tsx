"use client";
import "./GeneralSubjectCardItem.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { GeneralSubject } from "@/models/subjects.models";
import { useClassGenSubjectStore, ClassGenSubjectStore } from "@/store/subjects.store";

import Button from "@/components/shared/Buttons/Button";
import RocketIMG from "@/public/icons/common/rocket-solid.svg";
import CalculatorIMG from "@/public/icons/common/calculator-solid.svg";
import ComputerIMG from "@/public/icons/common/computer-solid.svg";
import DNAIMG from "@/public/icons/common/dna-solid.svg";
import ChemistryIMG from "@/public/icons/common/vial-circle-check-solid.svg"

const imgs: string[] = [
    RocketIMG,
    CalculatorIMG,
    ComputerIMG,
    DNAIMG,
    ChemistryIMG,
];

type GeneralSubjectCardItemProps = {
  generalSubject: GeneralSubject;
  classID: string;
};


export default async function GeneralSubjectCardItem(
  {
    generalSubject,
    classID
  }: GeneralSubjectCardItemProps
) {
  const [setClassID, setGenSubjectID] = useClassGenSubjectStore((state: ClassGenSubjectStore) => [
    state.setClassID,
    state.setGenSubjectID,
  ]);
  const router = useRouter();
  return (
    <>
      <div className="card">
        <div className="face face1">
          <div className="content">
            <Image width={40} src={imgs[Math.floor(Math.random()*imgs.length)]} alt="" />
            <h3>{generalSubject.name}</h3>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <p>
                Предмет: <span className={generalSubject.is_deleted ? "not-active" : "active"}>{generalSubject.is_deleted? "неактивный" : "активный"}</span> <br />
                Дата создания: {generalSubject.datetime_created}
            </p>
            <Button
              text="Просмотреть"
              isEnable={true}
              handleSuccess={() => {
                setClassID(classID);
                setGenSubjectID(String(generalSubject.id));
                router.push("/main/subjects");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};