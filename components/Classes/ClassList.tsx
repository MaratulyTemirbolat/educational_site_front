"use client";

import useSWR from "swr";
import CustomLoading from "@/app/loading";

import { fetcher } from "@/services/helpers/fetcher";
import { Class } from "@/models/subjects.models";
import ClassCard from "./ClassCard";

const classImages: Array<string> = [
  "fa-bicycle",
  "fa-car",
  "fa-helicopter",
  "fa-plane",
  "fa-rocket",
  "fa-bus",
];

export default function ClassList() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/v1/subjects/classes",
    fetcher
  );
  return (
    <>
        {isLoading && <CustomLoading />}
        {data && <div className="classes">
          <ol className="classes__list">
            {data.response.data.map((myClass: Class, ind: number) => (
              <ClassCard
                key={myClass.id}
                myClass={myClass}
                iconName={ind >= classImages.length ? classImages[ind%classImages.length] : classImages[ind]}
              />
            ))}
          </ol>
        </div>}
    </>
  );
};