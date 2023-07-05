"use client";

import "./TestsList.scss";
import { 
  useState,
  useEffect
} from "react";
import {
  useRouter,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import Link from "next/link";

import { UseUser, useUserStore } from "@/store/user.store";
import { QuizListItem } from "@/models/tests.models";
import { PageNumberPagination } from "@/models/general.models";
import { fetchMyQuizes } from "@/services/tests.services";
import PaginationList from "@/components/shared/PaginationList/PaginationList";
import { getFullPath } from "@/tools/navigation";
import TestListItem from "../TestListItem/TestListItem";

type TestsListProps = {
  page?: number;
};

export default function TestsList({
  page = 1
}: TestsListProps) {
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser,
  ]);
  const [quizes, setQuizes] = useState<Array<QuizListItem>>([]);
  const [pagination, setPagination] = useState<PageNumberPagination>(
    {next: null, previous: null, count: 1}
  );
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!user) fetchUser();
    if (!user) router.push("/login");
  }, [user]);

  useEffect(()=> {
      fetchMyQuizes(page)
      .then(resp => {
        if (resp.isOk) {
          setQuizes(resp.response.data);
          setPagination(resp.response.pagination);
        }
      })
  }, [page]);

  return (
    <>
      <div className="tests__list__container">
        <div className="tests__list__wrapper">
          {quizes.length > 0 ? <h1>Ваши тесты</h1> : <h1>У вас нет прошедших тестов</h1>}
          <div className="tests__lists">
            {quizes.map(quizItem => (
              <Link
                key={quizItem.id}
                href={`/main/tests/${quizItem.id}`}
              >
                <TestListItem quizItem={quizItem}/>
              </Link>
            ))}
          </div>

          {pagination.count > 1 && <div className="tests__pagination">
            <PaginationList
              curPage={page}
              currentLink={getFullPath("/main/tests", searchParams, ["page"])}
              maxPage={pagination.count}
              searchParams={searchParams}
            />
          </div>}
        </div>
      </div>

    </>
  );
};