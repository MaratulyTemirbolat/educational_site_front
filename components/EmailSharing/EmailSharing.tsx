"use client";

import "./EmailSharing.scss";
import SearchInput from "../shared/SearchInput/SearchInput";
export default function EmailSharing() {
  return (
    <section className="email__sharing__div">
      <h2 className="email__sharing__title">Подпишитесь и получайте новости о нас</h2>
      <div className="input__email__sharing">
        <SearchInput name="email__sharing" placeholderText="Введите свою почту" handleInput={() => {}}/>
      </div>
    </section>
  );
};