import { useState } from "react";
import "./index.css";

import logo from "../../assets/data/logobig.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

function Header({ onBack, onShowAllServices }) {
  const [isLogoFlipped, setIsLogoFlipped] = useState(false);

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const emailUrl =
    "mailto:irinacoachprepa@gmail.com?subject=Demande%20de%20rendez-vous";

  const instagramUrl =
    "https://www.instagram.com/irina_recovery/";

  const facebookUrl =
    "https://www.facebook.com/PikaPikaPikatchuuu";

  const openLogoBio = () => {
    setIsLogoFlipped(true);
  };

  const closeLogoBio = (event) => {
    event.stopPropagation();
    setIsLogoFlipped(false);
  };

  const toggleLogoBio = () => {
    setIsLogoFlipped((currentValue) => !currentValue);
  };

  return (
    <header className="site-header">
      <div
        className={`site-header__brand ${
          isLogoFlipped ? "site-header__brand--flipped" : ""
        }`}
        onMouseEnter={openLogoBio}
        onMouseLeave={() => setIsLogoFlipped(false)}
      >
        <div className="site-header__brand-inner">
          {/* FACE AVANT */}

          <button
            className="site-header__brand-face site-header__brand-front"
            type="button"
            onClick={toggleLogoBio}
            aria-label="Découvrir Irina Recovery"
            aria-expanded={isLogoFlipped}
          >
            <img
              className="site-header__logo"
              src={logo}
              alt="Irina Recovery"
            />
          </button>

          {/* FACE ARRIÈRE */}

          <div
            className="site-header__brand-face site-header__brand-back"
            aria-hidden={!isLogoFlipped}
          >
            <p className="site-header__bio-name">
              Irina Recovery
            </p>

            <p className="site-header__bio-speciality">
              Technique corporelle manuelle
            </p>

            <p className="site-header__bio-text">
  9 ANS D'EXPERIENCE
  <br />
  TECHNIQUE CORPOREL MANUEL
</p>

            <button
              className="site-header__bio-back"
              type="button"
              onClick={closeLogoBio}
              tabIndex={isLogoFlipped ? 0 : -1}
            >
              Revenir
            </button>
          </div>
        </div>
      </div>

      <div className="site-header_nav_and_icons">
        <nav
          className="site-header__nav"
          aria-label="Navigation principale"
        >
          <button
            className="site-header__link"
            type="button"
            onClick={onBack}
          >
            Besoins
          </button>

          <a
            className="site-header__cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prendre rendez-vous
          </a>

          <button
            className="site-header__link"
            type="button"
            onClick={onShowAllServices}
          >
            Accompagnements
          </button>
        </nav>

        <div className="site-header__icons">
          <div className="site-header__icons_communication">
            <a
              className="site-header__icon-link"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter Irina sur WhatsApp"
            >
              <img
                className="site-header__communication"
                src={whatsapp}
                alt=""
                aria-hidden="true"
              />
            </a>

            <a
              className="site-header__icon-link"
              href={emailUrl}
              aria-label="Écrire un e-mail à Irina"
            >
              <img
                className="site-header__communication"
                src={mail}
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="site-header__icons_reseaux">
            <a
              className="site-header__icon-link"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le compte Instagram d’Irina Recovery"
            >
              <img
                className="site-header__reseaux"
                src={insta}
                alt=""
                aria-hidden="true"
              />
            </a>

            <a
              className="site-header__icon-link"
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le compte Facebook d’Irina"
            >
              <img
                className="site-header__reseaux"
                src={facebook}
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;