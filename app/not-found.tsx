import "./notfound.scss";

import Link from "next/link";

export default async function CustomNotFountPage() {
  return (
  <div className="not-found-page">
    <h1 className="not-found-h1">404 - Страница не найдена</h1>
    <p className="zoom-area">Кажется вы потерялись...</p>
    <section className="error-container">
      <span className="four"><span className="screen-reader-text">4</span></span>
      <span className="zero"><span className="screen-reader-text">0</span></span>
      <span className="four"><span className="screen-reader-text">4</span></span>
    </section>
    <div className="link-container">
      <Link className="more-link" href="/">Вернуться на главную ^_^</Link>
    </div>
  </div>
  );
};