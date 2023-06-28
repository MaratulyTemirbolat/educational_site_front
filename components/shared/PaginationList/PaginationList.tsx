"use client";
import "./PaginationList.scss";
import Link from "next/link";
import { ReadonlyURLSearchParams } from "next/navigation";

import { getPagePath } from "@/tools/navigation";
import { getNumbersArray } from "@/tools/collections";

type PaginationListProps = {
  curPage: number;
  currentLink: string;
  maxPage: number;
  searchParams: ReadonlyURLSearchParams;
};

export default function PaginationList(
  {
    curPage,
    currentLink,
    maxPage,
    searchParams
  }: PaginationListProps
) {
  return (
    <div className="pagination__buttons">
      {
        curPage > 1 &&
        <div className="prev__link__div">
          <Link
            className="pagination__link"
            href={getPagePath(currentLink, curPage-1, searchParams)}
          >Предыдущий</Link>    
        </div> 
      }
        <div className="main__links__div">
            {getNumbersArray(maxPage).map((num: number, indx: number) => {
            if (curPage - 2 <= num && curPage + 2 >= num){
                return (
                <Link
                    className={
                    `pagination__link
                    ${num == curPage ? "active__page" : ""}
                    `
                    }
                    href={getPagePath(currentLink, num, searchParams)}
                    key={indx}
                >{num}</Link>
                );
            }
            })}
        </div>
        {
          curPage < maxPage &&
          <div className="next__link__div">
            <Link
              className="pagination__link"
              href={getPagePath(currentLink, curPage + 1, searchParams)}
            >Следующий</Link>
          </div>
        }
    </div>
  );
};