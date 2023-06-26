import "./page.scss";

import TrackCard from "@/components/TrackCard/TrackCard";
import ENTImage from "@/public/images/courses/c1.png";

export default function CoursesPage() {
  return (
    <section id="track__page">
      <div className="track__upper">
        <h1 id="tracks__title" style={{textAlign: "center"}}>Образовательные <br /> направления</h1>
      </div>
      <div className="tracks__list">
        <TrackCard
          id={1}
          name="Подготовка к ЕНТ"
          img={ENTImage}
          rating={5.0}
        />
        <TrackCard
          id={2}
          name="Подготовка к IELTS"
          img={ENTImage}
          rating={4.9}
        />
      </div>
    </section>
  );
};
