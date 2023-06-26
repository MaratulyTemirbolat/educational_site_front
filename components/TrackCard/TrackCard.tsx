import "./TrackCard.scss";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CardButton from "../shared/Buttons/CardButton/CardButton";

type TrackCardParameters = {
    id: number;
    img: any;
    name: string;
    rating: number;
};

export default function TrackCard({ id, img, name, rating}: TrackCardParameters) {
  return (
    <div className="track__card__cont">
      <div className="track__card__upper">
        <div className="track__image__wrapper">
          <Image src={img} alt="Image"/>
        </div>
        <div className="track__info">
          <div className="track__name">{name}</div>
          <div className="stars__rating">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            ({rating.toFixed(1)})
          </div>
        </div>
      </div>
      <div className="track__card__lower">
        <div className="button__wrapper">
          <Link href={`/courses/${id}/classes`}>
            <CardButton text="Просмотреть курсы" />
          </Link>
        </div>
      </div>
    </div>
  ); 
};