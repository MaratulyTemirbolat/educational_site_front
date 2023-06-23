"use client"; 
import "./Navigation.scss";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGraduationCap,
  faHouse,
  faBook,
  faPeopleGroup,
  faTag,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import UserIMG from "@/public/icons/people/Avatar_A.svg";
import LogoutIMG from "@/public/icons/common/right-from-bracket-solid.svg";
import { UseUser, useUserStore } from "@/store/user.store";

export default function Navigation() {
  const [user, clear] = useUserStore((state: UseUser) => [
    state.user,
    state.clear,
  ]);
  const [isUser, setIsUser] = useState<boolean>(false);
  
  const signOutHandle = () => {
    if (user) clear();
  }

  useEffect(() => {setIsUser(user? true : false);}, [user]);
  return (
    <section>
      <input type="checkbox" id="fake__checkbox" />
      <label
        id="fake__label"
        htmlFor="fake__checkbox"
      >
        <div className="bar__wrapper">
          <FontAwesomeIcon
            icon={faBars}
            id="bars__img"
          />
        </div>
      </label>

      <nav className="navigation__content left__up">
        <div className="upper__part__navigation">
          <div className="header__navigation">
            <div className="img__container">
              <FontAwesomeIcon
                icon={faGraduationCap}
                id="graduation__img"
              />
            </div>
            Academy
          </div>

          <div className="navigation__links">
              <div className="links__title">
                Меню
              </div>
              <div className="links">
                <Link href="/">
                  <div className="link">
                      <div className="link__img">
                        <FontAwesomeIcon
                          icon={faHouse}
                        />
                      </div>
                      Главная
                  </div>
                </Link>
              </div>
              <div className="links">
                <Link href="/">
                  <div className="link">
                      <div className="link__img">
                        <FontAwesomeIcon
                          icon={faBook}
                        />
                      </div>
                      Курсы
                  </div>
                </Link>
              </div>
              <div className="links">
                <Link href="/">
                  <div className="link">
                      <div className="link__img">
                        <FontAwesomeIcon
                          icon={faPeopleGroup}
                        />
                      </div>
                      Команда
                  </div>
                </Link>
              </div>
              <div className="links">
                <Link href="/">
                  <div className="link">
                      <div className="link__img">
                        <FontAwesomeIcon
                          icon={faTag}
                        />
                      </div>
                      Цены
                  </div>
                </Link>
              </div>
              <div className="links">
                <Link href="/">
                  <div className="link">
                      <div className="link__img">
                        <FontAwesomeIcon
                          icon={faAddressBook}
                        />
                      </div>
                      Контакты
                  </div>
                </Link>
              </div>
          </div>
        </div>
        <div className="bottom__part__nav">
          { isUser && <div className="auth__user__div">
            <div className="user__logo">
              <Image src={UserIMG} alt="User Image"/>
            </div>
            <div className="user__info">
              <div className="user__full__name">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="user__email">
                {user?.email}
              </div>
            </div>
            <Link href="#" onClick={() => signOutHandle()}>
              <Image
                src={LogoutIMG}
                width={20}
                alt="logout"
              />
            </Link>
          </div>}

          {!isUser && <div className="reg__login__cont">
            <Link href="/login">Авторизоваться</Link>
            <span className="is__visible">|</span>
            <Link href="/register">Зарегестрироваться</Link>
          </div>}
        </div>
      </nav>
    </section>
  );
};
