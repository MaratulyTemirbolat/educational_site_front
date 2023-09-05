import "./WelcomSection.css";
import Image from "next/image";

import AboutImg from "@/public/images/about.jpg";
import AdvantageCard from "./AdvantageCard/AdvantageCard";

type AdvantageCardType = {
  imgLink: string;
  titleText: string;
  contentText: string;
};

const advantageCardsData: Array<AdvantageCardType> = [
  {
    imgLink: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    titleText: "Онлайн курсы",
    contentText: "Учиться можно откуда угодно, нужен только стабильный интернет, смартфон или ноутбук. Это особенно удобно для работающих людей, которым нужно пройти дополнительное обучение. Вебинар можно посмотреть в дороге или в перерывах на работе."
  },
  {
    imgLink: "https://img.icons8.com/ios/80/000000/diploma.png",
    titleText: "Доступное образование для всех",
    contentText: "Еще одним плюсом онлайн-обучения можно считать доступность для людей с ограничениями по здоровью и для тех, кто живет далеко от университетов.",
  },
  {
    imgLink: "https://img.icons8.com/ios/80/000000/athlete.png",
    titleText: "Быстрая связь с преподавателем",
    contentText: "Это преимущество электронного обучения перед очными и заочными программами. Необязательно ждать следующей лекции, чтобы задать вопрос. Можно сразу же оставить его в чате или на обучающей платформе."
  },
];

export default function WelcomSection() {
  return (
    <>
    <section
      className="
        welcome__section
        h-[90vh] w-full
        flex flex-col justify-center
        box-border
        pl-[5%] pr-[5%]
      "
    >
      <div
        className="section__container"
      >
        <h1
            className="
            welcome__title
            w-[100%] 
            min-[1100px]:text-[40px] font-bold text-start uppercase
            max-[1100px]:text-[35px] max-[900px]:text-[30px] max-[800px]:text-[30px]
            max-[700px]:text-[25px] max-[600px]:text-[20px] max-[500px]:text-[15px]
            "
        >Добро пожаловать в ACADEMY</h1>
        <p
            className="
            welcome__preparation
            w-[100%]
            min-[1100px]:text-[40px] font-bold text-center uppercase
            max-[1100px]:text-[35px] max-[900px]:text-[30px] max-[800px]:text-[30px]
            max-[700px]:text-[25px] max-[600px]:text-[20px] max-[500px]:text-[15px]
            "
        >Подготовься к ЕНТ ВМЕСТЕ</p>
        <p
            className="
            welcome__preparation
            w-[100%]
            min-[1100px]:text-[40px] font-bold text-end uppercase
            max-[1100px]:text-[35px] max-[900px]:text-[30px] max-[800px]:text-[30px]
            max-[700px]:text-[25px] max-[600px]:text-[20px] max-[500px]:text-[15px]
            "
        >Онлайн подготовка</p>
      </div>
    </section>

    <section
      className="
        advantage__section
        flex w-full justify-center gap-5
        py-20 px-10
        box-border
      ">
      <div
        className="
          w-2/4 max-[904px]:hidden

        ">
        <Image className="w-full" src={AboutImg} alt=""/>
      </div>
      <div
        className="
          advantage__section__right
          flex flex-col gap-10
          min-[904px]:py-20
          max-[904px]:w-full
          box-border
          w-1/2
        ">
        <div
          className="
            advatage__section__heading
            text-4xl font-bold
            max-[904px]:text-center
            max-[700px]:text-[30px] max-[500px]:text-[25px]
          ">
            Достоинства нашей платформы
        </div>
        <div
          className="
            advantage__cards
            flex flex-col gap-10
          ">
            {advantageCardsData.map(
              (cardData: AdvantageCardType, ind: number) => (
                <AdvantageCard
                  key={ind}
                  imgLink={cardData.imgLink}
                  titleText={cardData.titleText}
                  contentText={cardData.contentText}
                />
              ))}
        </div>
      </div>
    </section>
    </>
  );
};