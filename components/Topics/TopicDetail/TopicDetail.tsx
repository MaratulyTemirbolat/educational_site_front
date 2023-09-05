"use client";
import "./TopicDetail.scss";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUserStore, UseUser } from "@/store/user.store";
import { useTestStore, TestStore } from "@/store/tests.store";
import { fetchTopic } from "@/services/subjects.services";
import { TopicDetailed } from "@/models/subjects.models";
import InformMessage from "@/components/shared/InformMessage/InformMessage";
import { generateQuiz, TOPIC_QUIZ_TYPE } from "@/services/tests.services";

type TopicDetailProps = {
  id: number;
};

const getEmbededId = (link: string): string => {
  return link.substring(link.indexOf("v=")+2);
};

export default function TopicDetail({
  id
}: TopicDetailProps) {
  const [user, fetchUser] = useUserStore((state: UseUser) => [
    state.user,
    state.fetchUser
  ]);
  const [generatedQuiz, setQuiz] = useTestStore((state: TestStore) => [
    state.generatedQuiz,
    state.setQuiz
  ]);
  const router = useRouter();
  const [topic, setTopic] = useState<TopicDetailed | null>(null);
  const [informMsg, setInformMsg] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const isUser: boolean = useMemo((): boolean => user ? true : false, [user]);

  useEffect(() => {
    if (!user) fetchUser();
    if (!user) router.push("/login");
    if (id) {
        fetchTopic(id)
        .then(resp => {
          if (resp.isOk) setTopic(resp.response.data);
          else {
            if (resp.response.detail) setInformMsg(resp.response.detail);
            else setInformMsg(resp.response.response);
            setIsError(true);
            alert(resp.response.detail + "\nВы будете перенаправлены обратно на страницу предметов");
            router.push("/main/subjects");
          }
        });
    }
  }, [id]);

  const handleTestRegister = () => {
    if (generatedQuiz) {
      setInformMsg(
        "У вас уже имеется активный тест. Сначала завершите его."
      );
      setIsError(true);
      const res: boolean = confirm(
        "У вас уже имеется активный тест. Сначала завершите его."
        + "\nПерейти на активный тест?"
      );
      if (res) router.push("/main/tests/taketest");
    } else {
      if (topic){
        generateQuiz(
          `Тест по теме '${topic?.name}'`,
          TOPIC_QUIZ_TYPE,
          null,
          null,
          topic.id
        ).then(res => {
          if (res.isOk) {
            setQuiz(res.response.data);
            router.push("/main/tests/taketest");
          }
        })
      }
    }
  };

  return (
    <>
      <div className="topic__detail__div">
        {
          isUser && 
          topic &&
          <div className="topic__detail__wrapper">
            <h1 className="topic__detail__header">{topic.name}</h1>
            <div className="topic__description">
              <div className="description__title">Информация о теме</div>
              <div className="topic__desc__parts">
                <div className="topic__desc__left__part">
                    <p className="topic__descr__row">
                        Тема для предмета:
                        <span>
                        <Link href={`/main/subjects/${topic.attached_subect_class.id}`}>{topic.attached_subect_class.name}</Link>
                        </span>
                    </p>
                    <p className="topic__descr__row">
                        Статус:
                        <span className={`status ${topic.is_deleted ? "deleted" : "active"}`}>{topic.is_deleted ? "Неактивный" : "Активный"}</span>
                    </p>  
                </div>
                <div className="topic__descr__right__part">
                    <p className="topic__descr__row">
                        Дата и время создания:
                        <span>{topic.datetime_created}</span>
                    </p>
                    <p className="topic__descr__row">
                        Дата и время последнего изменения:
                        <span>{topic.datetime_updated}</span>
                    </p>            
                </div>
              </div>
            </div>
            <div className="topic__content">
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 1</h2>
                <p className="paragraph__content">{topic.content}</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 2</h2>
                <p className="paragraph__content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet temporibus, atque, debitis possimus libero dolorem quae incidunt expedita provident consequatur deleniti deserunt dolor quos dicta ullam praesentium repudiandae maxime consequuntur!</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 3</h2>
                <p className="paragraph__content">{topic.content}</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 4</h2>
                <p className="paragraph__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab aliquid rem dolorem? Eveniet, rerum. Velit illum id, repellendus accusamus voluptatibus dolores nam placeat! Accusantium alias consequuntur consequatur accusamus quod!</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 5</h2>
                <p className="paragraph__content">{topic.content}</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 6</h2>
                <p className="paragraph__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab aliquid rem dolorem? Eveniet, rerum. Velit illum id, repellendus accusamus voluptatibus dolores nam placeat! Accusantium alias consequuntur consequatur accusamus quod!</p>
              </div>
              <div className="content__paragraph">
                <h2 className="paragraph__title">Параграф 7</h2>
                <p className="paragraph__content">{topic.content}</p>
              </div>
            </div>
            <div className="topic__video">
              <h2 className="topic__video__title">Видеоматериал к теме</h2>
              <iframe
                src={`https://www.youtube.com/embed/${getEmbededId(topic.video_url)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
            <Link
              className="go__back__link"
              href={`/main/subjects/${topic.attached_subect_class.id}`}
            >
              Вернуться назад
            </Link>
            <button
              className="go__back__link"
              onClick={handleTestRegister}
            >
              Пройти тест
            </button>
          </div>
        }
      </div>

      {
        informMsg &&
        <InformMessage
          msg={informMsg}
          isError={isError}
          handleClose={() => setInformMsg("")}
        />
      }
    </>
  );
};