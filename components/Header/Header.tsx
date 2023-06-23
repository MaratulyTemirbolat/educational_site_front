import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header__cont">
        <div className="header__left">
          <h1>ACADEMY</h1>
          <h2>ЦЕНТ ПОДГОТОВКИ К ЕНТ</h2>
        </div>
        <div className="header__right">
          <Link href="https://www.facebook.com/">
            <div id="facebook__cont" className="soc__images">
                <FontAwesomeIcon
                  height={20}
                  icon={faFacebookF}
                  className="icons__soc"
                  id="facebook__icon"
                />
            </div>
          </Link>
          <Link href="https://twitter.com/">
            <div id="twitter__cont" className="soc__images">
                <FontAwesomeIcon
                  height={20}
                  icon={faTwitter}
                  className="icons__soc"
                  id="twitter__icon"
                />
            </div>
          </Link>
          <Link href="https://www.youtube.com/">
            <div className="soc__images">
                <FontAwesomeIcon
                  height={20}
                  icon={faYoutube}
                  className="icons__soc"
                  id="youtube__icon"
                />
            </div>
          </Link>
        </div>
    </div>
  );
};

export default Header;