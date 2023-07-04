"use client";
import "./TopicList.scss";
import { useState } from "react";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import RightArrow from "@/public/icons/common/chevron-right-solid.svg";
import DownArrow from "@/public/icons/common/chevron-down-solid.svg";
import { Topic } from "@/models/subjects.models";
import PaginationList from "@/components/shared/PaginationList/PaginationList";
import { getFullPath } from "@/tools/navigation";

type TopicListProps = {
    topics: {
        pagination: {
            next: string | null;
            previous: string | null;
            count: number;
        },
        data: Array<Topic>,
    },
    isUser: boolean,
    page: number,
    classSubjectId: number,
};

export default function TopicList({
  topics,
  isUser,
  page,
  classSubjectId
}: TopicListProps) {
  const [curID, setCurID] = useState<number>(-1);
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const toggle = (id: number) => {
      if (curID === id) {
        return setCurID(-1);
      }
      setCurID(id);
  }
  return (
    <section className='faq'>
      <div className='container'>
        {topics.data.length == 0 && <h3  className="no-topics">Извините, но темы еще не представлены по данному предмету</h3>}
        {topics.data.map((topic: Topic, index: number) => {
          if (!isUser && index > 5) {
            return "";
          }
          return (
            <div key={topic.id} className='box'>
              <button className='accordion' onClick={() => toggle(topic.id)} >
                <h2>{topic.name}</h2>
                <span>{curID === topic.id ? <Image src={DownArrow} alt="down"/> : <Image src={RightArrow} alt="right" />}</span>
              </button>
              {
                curID === topic.id ? (
                    <div className='text'>
                    <p>{topic.content}</p>
                    {isUser && <Link className="topic__link" href={`/main/topics/${topic.id}`}>Изучить</Link>}
                    </div>
                ) : null
              }
            </div>
          );
        })}
        {
          topics.pagination.count > 1  && 
          <PaginationList
            searchParams={searchParams}
            maxPage={topics.pagination.count}
            curPage={page}
            currentLink={getFullPath(`/main/subjects/${classSubjectId}`, searchParams, ['page'])}
          />
        }
        {!isUser && <h2 className="not-authorized">Остальные темы можно увидеть после авторизации</h2>}
      </div>
    </section>
  );
};