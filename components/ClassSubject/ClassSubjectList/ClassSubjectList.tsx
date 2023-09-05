"use client";
import "./ClassSubjectList.scss";

import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { useSearchParams, ReadonlyURLSearchParams, useRouter } from "next/navigation";

import CustomLoading from "@/app/loading";

import { HOST } from "@/services/index";
import { fetcher } from "@/services/helpers/fetcher";
import { getFullPath } from "@/tools/navigation";
import { useClassGenSubjectStore } from "@/store/subjects.store";
import { ClassSubject } from "@/models/subjects.models";
import ClassSubjectCard from "../ClassSubjectCard/ClassSubjectCard";
import PaginationList from "@/components/shared/PaginationList/PaginationList";
import FilterModal from "../ClassSubjectFilter/ClassSubjectFilter";

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
  }: ClassSubjectListProps
) {
  const router = useRouter();
  const [classID, genSubjectID] = useClassGenSubjectStore((state) => [
    state.classID,
    state.genSubjectID
  ])
  const getBackLink: string = useMemo<string>(() => {
    return HOST+`/api/v1/subjects/class_subjects?page=${page ? page : 1}${classID ? `&class_id=${classID}`: ""}${genSubjectID ? `&subject_id=${genSubjectID}`: ""}`;
  }, [page, classID, genSubjectID]);
  const { data, error, isLoading } = useSWR<{isOk: boolean, response: ClassSubjectListPaginatedResponse}>(
    getBackLink,
    fetcher
  );
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  useEffect(() => {
    if (data && !data.isOk) router.push("/main/subjects");
  }, [data?.isOk]);
  return (
    <>
      {isLoading && <CustomLoading />}
      {data?.isOk && <div className="class__subjects__container">
        <div className="upper__part__class__subject">
          <div className="class__subject__filter__wrapper">
            <FilterModal />
          </div>
          
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
        </div>
        {
          data.response.pagination.count > 1 &&
          <div className="class__subject__pagination">
            <PaginationList
              curPage={(page ? Number(page) : 1)}
              currentLink={getFullPath("/main/subjects", searchParams, ["classID", "page", "genSubjectID"])}
              maxPage={data.response.pagination.count}
              searchParams={searchParams}
            />
          </div>
        }
      </div>}
    </>
  );
};