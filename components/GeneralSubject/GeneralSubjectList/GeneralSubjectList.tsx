"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { fetcher } from "@/services/helpers/fetcher";
import { GeneralSubject } from "@/models/subjects.models";

import CustomLoading from "@/app/loading";
import GeneralSubjectCardItem from "../GeneralSubjectCardItem/GeneralSubjectCardItem";

type GeneralSubjectListProps = {
  trackID: number;
  classId: string | undefined;
};

export default function GeneralSubjectList({ classId, trackID }: GeneralSubjectListProps) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<{isOk: boolean, response: { data: Array<GeneralSubject>}}>(
    "http://localhost:8000/api/v1/subjects/general_subjects",
    fetcher
  );

  useEffect(() => {
    if (!classId) router.push(`/main/tracks/${trackID}/classes`);
  }, [classId]);
  return (
    <>
      {isLoading && <CustomLoading />}
      {data?.response && <div className="general__subject__container">
        {data.response.data.map(
          genSubject => <GeneralSubjectCardItem key={genSubject.id} generalSubject={genSubject}/>
          )
        }
      </div>}
    </>
  );
};