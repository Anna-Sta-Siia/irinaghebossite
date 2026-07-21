import { useEffect, useRef, useState } from "react";
import "./index.css";

import logo from "../../assets/data/logosmall.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

function Footer({
  onShowLegal,
  onShowTerms,
  onShowPrivacy,
  onShowCancellation,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const footerRef = useRef(null);

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

  const handleCancellation = () => {
    closeMenu();
    onShowCancellation?.();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        footerRef.current &&
        !footerRef.current.contains(event.target)
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
    <footer
      className="site-footer"
      ref={footerRef}
    >
      <div className="site-footer__main">
        {/* ===========================
            NAVIGATION
        =========================== */}

        <div className="site-footer__navigation">
          {/* CONTACT */}

          <div className="site-footer__menu">
            <button
              className={`site-footer__nav-trigger ${
                activeMenu === "contact"
                  ? "site-footer__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("contact")}
              aria-expanded={activeMenu === "contact"}
              aria-controls="footer-contact-menu"
            >
              <span>Contact</span>

              <span
                className="site-footer__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "contact" && (
              <div
                className="site-footer__dropdown"
                id="footer-contact-menu"
              >
                <a
                  className="site-footer__dropdown-item"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-footer__dropdown-icon"
                    src={whatsapp}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>WhatsApp</span>
                </a>

                <a
                  className="site-footer__dropdown-item"
                  href={emailUrl}
                  onClick={closeMenu}
                >
                  <img
                    className="site-footer__dropdown-icon"
                    src={mail}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>E-mail</span>
                </a>
              </div>
            )}
          </div>

          {/* MON UNIVERS */}

          <div className="site-footer__menu">
            <button
              className={`site-footer__nav-trigger ${
                activeMenu === "universe"
                  ? "site-footer__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("universe")}
              aria-expanded={activeMenu === "universe"}
              aria-controls="footer-universe-menu"
            >
              <span>Mon univers</span>

              <span
                className="site-footer__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "universe" && (
              <div
                className="site-footer__dropdown"
                id="footer-universe-menu"
              >
                <a
                  className="site-footer__dropdown-item"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-footer__dropdown-icon"
                    src={insta}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>Instagram</span>
                </a>

                <a
                  className="site-footer__dropdown-item"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <img
                    className="site-footer__dropdown-icon"
                    src={facebook}
                    alt=""
                    aria-hidden="true"
                  />

                  <span>Facebook</span>
                </a>
              </div>
            )}
          </div>

          {/* VOTRE RENDEZ-VOUS */}

          <div className="site-footer__menu">
            <button
              className={`site-footer__nav-trigger ${
                activeMenu === "appointment"
                  ? "site-footer__nav-trigger--active"
                  : ""
              }`}
              type="button"
              onClick={() => toggleMenu("appointment")}
              aria-expanded={activeMenu === "appointment"}
              aria-controls="footer-appointment-menu"
            >
              <span>Votre rendez-vous</span>

              <span
                className="site-footer__chevron"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeMenu === "appointment" && (
              <div
                className="site-footer__dropdown site-footer__dropdown--appointment"
                id="footer-appointment-menu"
              >
                <a
                  className="site-footer__dropdown-action"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  Prendre rendez-vous
                </a>

                <button
                  className="site-footer__dropdown-action"
                  type="button"
                  onClick={handleCancellation}
                >
                  Modifier ou annuler
                </button>

                <button
                  className="site-footer__dropdown-action"
                  type="button"
                  onClick={handleCancellation}
                >
                  Conditions d’annulation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===========================
            IDENTITÉ CENTRALE
        =========================== */}

        <div className="site-footer__identity">
          <img
            className="site-footer__logo"
            src={logo}
            alt="Irina Recovery"
          />

          <p className="site-footer__quote">
            <span>Être en paix avec soi-même,</span>
            <span>tout en continuant à grandir</span>
          </p>
        </div>

        {/* ===========================
            CTA
        =========================== */}

        <div className="site-footer__appointment">
          <p className="site-footer__appointment-title">
            Commençons par un échange
          </p>

          <p className="site-footer__appointment-text">
            Prenons le temps de comprendre ce dont vous avez besoin.
          </p>

          <a
            className="site-footer__appointment-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>

      {/* ===========================
          BAS DE PAGE
      =========================== */}

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Irina Recovery
        </p>

        <div className="site-footer__legal">
          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowLegal}
          >
            Mentions légales
          </button>

          <span aria-hidden="true">·</span>

          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowTerms}
          >
            Conditions générales de vente
          </button>

          <span aria-hidden="true">·</span>

          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowPrivacy}
          >
            Politique de confidentialité
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;