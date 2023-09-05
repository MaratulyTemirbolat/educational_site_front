import "./Footer.scss";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faYoutube, faUbuntu } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer__cont" style={{marginTop: "50px"}}>
      <div className="footer__upper__div">
        <div className="footer__left">
          <div className="footer__comp__logo">
            <h3 className="footer__comp__name">ACADEMY</h3>
            <div className="footer__comp__descr">ЦЕНТР ПОДГОТОВКИ К ЕНТ</div>
          </div>
          <p className="footer__description">
            Ваш помощник при <br /> подготовке к сдаче ЕНТ.
          </p>
          <div className="social__networks__footer">
            <Link href="https://www.youtube.com/">
              <div
                id="twitter__cont"
                className="soc__images"
              >
                <FontAwesomeIcon
                  height={20}
                  fontSize={20}
                  icon={faYoutube}
                  className="icons__soc"
                />
              </div>
            </Link>

            <Link href="https://twitter.com/">
              <div
                id="twitter__cont"
                className="soc__images"
              >
                <FontAwesomeIcon
                  height={20}
                  fontSize={20}
                  icon={faTwitter}
                  className="icons__soc"
                />
              </div>
            </Link>

            <Link href="https://ubuntu.com/">
              <div
                id="twitter__cont"
                className="soc__images"
              >
                <FontAwesomeIcon
                  height={20}
                  fontSize={20}
                  icon={faUbuntu}
                  className="icons__soc"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="footer__right">
          <h3 className="footer__remained__question">Остались вопросы?</h3>
          <ul className="footer__remained__questions__options">
            <li className="footer__option option__location">
              <FontAwesomeIcon
                color="rgb(78, 165, 245)"
                height={25}
                icon={faMap}
              />
              Almaty
            </li>
            <li className="footer__option option__phone">
              <FontAwesomeIcon
                color="rgb(78, 165, 245)"
                height={25}
                icon={faPhone}
              />
              +7-778-628-44-10
            </li>
            <li className="footer__option option__email">
              <FontAwesomeIcon
                color="rgb(78, 165, 245)"
                height={25}
                icon={faEnvelope}
              />
              t_maratuly@kbtu.kz
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__down__div">
        Copyright ©2023 All rights reserved
      </div>
    </div>
  );
};