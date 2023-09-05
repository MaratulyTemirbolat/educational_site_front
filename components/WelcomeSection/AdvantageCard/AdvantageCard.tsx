import "./AdvantageCard.css";
type AdanvatageCardProps = {
  imgLink: string;
  titleText: string;
  contentText: string;
};

export default function AdvantageCard({
  imgLink,
  titleText,
  contentText
}: AdanvatageCardProps
) {
  return (
    <div
      className="
        adavantage__card__div
        p-7
        box-border
        rounded-xl
        transition-all
        duration-700
        hover:bg-custom-special-blue
        hover:text-white
      ">
      <div
        className="
          advantage__card__up
          flex items-center justify-between
        ">
        <img
          className="
            min-[1100px]:w-[70px]
            max-[900px]:w-[60px]
            max-[500px]:w-[50px]
            max-[400px]:w-[40px]
          "
          src={imgLink}
          alt="image link"
        />
        <div
          className="
            advantage__card__title
            w-full text-center
            font-bold text-xl
            max-[400px]:text-[18px]
          "
        >{titleText}</div>
      </div>
      <div
        className="
          advantage__card__down
          text-justify my-2
        ">
        {contentText}
      </div>
    </div>
  );
};