"use client";
import "./ClassSubjectList.scss";

import useSWR from "swr";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";

import CustomLoading from "@/app/loading";

import { HOST } from "@/services/index";
import { fetcher } from "@/services/helpers/fetcher";
import { getFullPath } from "@/tools/navigation";
import { ClassSubject } from "@/models/subjects.models";
import ClassSubjectCard from "../ClassSubjectCard/ClassSubjectCard";
import PaginationList from "@/components/shared/PaginationList/PaginationList";

type ClassSubjectListPaginatedResponse = {
  pagination: {
    next: string | null;
    previous: string | null;
    count: number;  
  };
  data: Array<ClassSubject>;
};

type ClassSubjectListProps = {
  page: string | undefined;
  classID: string | undefined;
  genSubjectID: string | undefined;
};

export default function ClassSubjectList(
  {
    page,
    classID,
    genSubjectID
  }: ClassSubjectListProps
) {
  const { data, error, isLoading } = useSWR<{isOk: boolean, response: ClassSubjectListPaginatedResponse}>(
    HOST+`/api/v1/subjects/class_subjects?page=${page ? page : 1}`,
    fetcher
  );
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  return (
    <>
      {isLoading && <CustomLoading />}
      {data?.response && <div className="class__subjects__container">
        <div className="class__subject__list">
        {
          data.response.data.map(
            (classSubj: ClassSubject) => (
              <ClassSubjectCard
                key={classSubj.id}
                classSubject={classSubj}
              />
            )
          )
        }
        </div>
        {
          data.response.pagination.count > 1 &&
          <div className="class__subject__pagination">
            <PaginationList
              curPage={(page ? Number(page) : 1)}
              currentLink={getFullPath(searchParams, ["classID", "page", "genSubjectID"])}
              maxPage={data.response.pagination.count}
              searchParams={searchParams}
            />
          </div>
        }
      </div>}
    </>
  );
};