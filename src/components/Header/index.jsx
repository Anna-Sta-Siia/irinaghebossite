import { useEffect, useRef, useState } from "react";
import "./index.css";

import logo from "../../assets/data/logobig.png";

import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

import { selectorsData } from "../../assets/data/dataSelectors";

function Header({
  onShowApproach,
  onShowAllServices,
  onShowOffers,
  onSelectNeed,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const headerRef = useRef(null);

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const emailUrl =
    "mailto:irinacoachprepa@gmail.com?subject=Demande%20de%20rendez-vous";

  const instagramUrl =
    "https://www.instagram.com/irina_recovery/";

  const facebookUrl =
    "https://www.facebook.com/PikaPikaPikatchuuu";

  const toggleMenu = (menuId) => {
    setActiveMenu((currentMenu) =>
      currentMenu === menuId ? null : menuId
    );
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const handleShowApproach = () => {
    closeMenu();
    onShowApproach?.();
  };

  const handleShowAllServices = () => {
    closeMenu();
    onShowAllServices?.();
  };

  const handleSelectNeed = (needId) => {
    closeMenu();
    onSelectNeed?.(needId);
  };

  const handleShowOffer = (offerId) => {
    closeMenu();
    onShowOffers?.(offerId);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div className="site-header-shell">
      <header
        className="site-header"
        ref={headerRef}
      >
        {/* ===========================
            NAVIGATION GAUCHE
        =========================== */}

        <nav
          className="site-header__side site-header__side--left"
          aria-label="Navigation principale gauche"
        >
          {/* DÉCOUVRIR */}

          <div className="site-header__menu site-header__menu--discover">
            <button
              className={`site-header__nav-trigger ${
                activeMenu === "discover"
                  ? "site-header__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("discover")}
              aria-expanded={activeMenu === "discover"}
              aria-controls="header-discover-menu"
            >
              <span>Découvrir</span>

              <span
                className="site-header__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "discover" && (
              <div
                className="site-header__dropdown site-header__dropdown--discover"
                id="header-discover-menu"
              >
                <button
                  className="site-header__dropdown-main"
                  type="button"
                  onClick={handleShowAllServices}
                >
                  Tous les accompagnements
                </button>

                <div className="site-header__dropdown-list">
                  {selectorsData.map((selector) => (
                    <button
                      className="site-header__dropdown-item"
                      type="button"
                      key={selector.id}
                      onClick={() =>
                        handleSelectNeed(selector.id)
                      }
                    >
                      <img
                        className="site-header__dropdown-icon"
                        src={selector.icon}
                        alt=""
                        aria-hidden="true"
                      />

                      <span>{selector.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MON UNIVERS */}

          <div className="site-header__menu site-header__menu--universe">
            <button
              className={`site-header__nav-trigger ${
                activeMenu === "universe"
                  ? "site-header__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("universe")}
              aria-expanded={activeMenu === "universe"}
              aria-controls="header-universe-menu"
            >
              <span>Mon univers</span>

              <span
                className="site-header__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "universe" && (
              <div
                className="site-header__dropdown site-header__dropdown--small site-header__dropdown--left"
                id="header-universe-menu"
              >
                <a
                  className="site-header__dropdown-item"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-header__contact-icon"
                    src={insta}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>Instagram</span>
                </a>

                <a
                  className="site-header__dropdown-item"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-header__contact-icon"
                    src={facebook}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>Facebook</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* ===========================
            IDENTITÉ CENTRALE
        =========================== */}

        <div className="site-header__identity">
          <button
            className="site-header__logo-button"
            type="button"
            onClick={handleShowApproach}
            aria-label="Découvrir l’approche d’Irina"
          >
            <img
              className="site-header__logo"
              src={logo}
              alt="Irina Recovery"
            />
          </button>

          <button
            className="site-header__approach"
            type="button"
            onClick={handleShowApproach}
          >
            Mon approche
          </button>
        </div>

        {/* ===========================
            NAVIGATION DROITE
        =========================== */}

        <nav
          className="site-header__side site-header__side--right"
          aria-label="Navigation principale droite"
        >
          {/* OFFRES */}

          <div className="site-header__menu site-header__menu--offers">
            <button
              className={`site-header__nav-trigger ${
                activeMenu === "offers"
                  ? "site-header__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("offers")}
              aria-expanded={activeMenu === "offers"}
              aria-controls="header-offers-menu"
            >
              <span>Offres</span>

              <span
                className="site-header__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "offers" && (
              <div
                className="site-header__dropdown site-header__dropdown--right"
                id="header-offers-menu"
              >
                <button
                  className="site-header__dropdown-item"
                  type="button"
                  onClick={() =>
                    handleShowOffer("gift-card")
                  }
                >
                  <span
                    className="site-header__offer-symbol"
                    aria-hidden="true"
                  >
                    ✦
                  </span>

                  <span>Carte cadeau</span>
                </button>

                <button
                  className="site-header__dropdown-item"
                  type="button"
                  onClick={() =>
                    handleShowOffer("current")
                  }
                >
                  <span
                    className="site-header__offer-symbol"
                    aria-hidden="true"
                  >
                    ✧
                  </span>

                  <span>Offres du moment</span>
                </button>

                <button
                  className="site-header__dropdown-item"
                  type="button"
                  onClick={() =>
                    handleShowOffer("packs")
                  }
                >
                  <span
                    className="site-header__offer-symbol"
                    aria-hidden="true"
                  >
                    ◇
                  </span>

                  <span>Packs</span>
                </button>

                <button
                  className="site-header__dropdown-item"
                  type="button"
                  onClick={() =>
                    handleShowOffer("clubs")
                  }
                >
                  <span
                    className="site-header__offer-symbol"
                    aria-hidden="true"
                  >
                    ○
                  </span>

                  <span>Clubs & partenaires</span>
                </button>
              </div>
            )}
          </div>

          {/* CONTACT */}

          <div className="site-header__menu site-header__menu--contact">
            <button
              className={`site-header__nav-trigger ${
                activeMenu === "contact"
                  ? "site-header__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("contact")}
              aria-expanded={activeMenu === "contact"}
              aria-controls="header-contact-menu"
            >
              <span>Contact</span>

              <span
                className="site-header__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "contact" && (
              <div
                className="site-header__dropdown site-header__dropdown--small site-header__dropdown--right"
                id="header-contact-menu"
              >
                <a
                  className="site-header__dropdown-item"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-header__contact-icon"
                    src={whatsapp}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>WhatsApp</span>
                </a>

                <a
                  className="site-header__dropdown-item"
                  href={emailUrl}
                  onClick={closeMenu}
                >
                  <img
                    className="site-header__contact-icon"
                    src={mail}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>E-mail</span>
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* ===========================
          CTA ENTRE HEADER ET SECTION
      =========================== */}

      <div className="site-header__appointment-row">
        <a
          className="site-header__appointment"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prendre rendez-vous
        </a>
      </div>
    </div>
  );
}

export default Header;