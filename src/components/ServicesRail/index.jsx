import { useEffect, useRef, useState } from "react";
import "./index.css";

import logo from "../../assets/data/logobig.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

import { selectorsData } from "../../assets/data/dataSelectors";

const railMenuItems = [
  { id: "discover", label: "Découvrir" },
  { id: "offers", label: "Offres" },
  { id: "partnerships", label: "Partenariats" },
  {
    id: "appointments",
    label: "Gestion des rendez-vous",
  },
  { id: "reviews", label: "Avis" },
  { id: "contact", label: "Contact" },
];

const VISIBLE_TRIGGER_COUNT = 3;

function ServicesRail({
  currentNeed,
  onShowAllServices,
  onSelectNeed,
  onShowOffers,
  onShowApproach,
  isApproachOpen,
  onShowGiftCard,
  isGiftCardOpen,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const railRef = useRef(null);

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const modifyAppointmentUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20modifier%20mon%20rendez-vous.";

  const cancelAppointmentUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20annuler%20mon%20rendez-vous.";

  const emailUrl =
    "mailto:irinacoachprepa@gmail.com?subject=Demande%20de%20rendez-vous";

  const partnershipEmail = (subject) =>
    `mailto:irinacoachprepa@gmail.com?subject=${encodeURIComponent(
      subject
    )}`;

  const instagramUrl =
    "https://www.instagram.com/irina_recovery/";

  const facebookUrl =
    "https://www.facebook.com/PikaPikaPikatchuuu";

  const closePanels = () => {
    setActiveMenu(null);
  };

  const toggleMenu = (menuId) => {
    setActiveMenu((currentMenu) =>
      currentMenu === menuId ? null : menuId
    );
  };

  const handleSelectNeed = (needId) => {
    closePanels();
    onSelectNeed?.(needId);
  };

  const handleShowAllServices = () => {
    closePanels();
    onShowAllServices?.();
  };

  const handleShowOffer = (offerId) => {
    closePanels();
    onShowOffers?.(offerId);
  };

  const moveCarousel = (direction) => {
    setCarouselIndex((currentIndex) => {
      const itemCount = railMenuItems.length;

      return (
        currentIndex + direction + itemCount
      ) % itemCount;
    });
  };

  const visibleCarouselItems = Array.from(
    { length: VISIBLE_TRIGGER_COUNT },
    (_, offset) =>
      railMenuItems[
        (carouselIndex + offset) %
          railMenuItems.length
      ]
  );

  useEffect(() => {
    if (activeMenu) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      moveCarousel(1);
    }, 4600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeMenu]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        railRef.current &&
        !railRef.current.contains(event.target)
      ) {
        closePanels();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePanels();
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
    <aside
      className="services-rail"
      ref={railRef}
      aria-label="Navigation du site"
    >
      <div className="services-rail__identity-zone">
        <button
          className={`services-rail__identity ${
            isApproachOpen
              ? "services-rail__identity--active"
              : ""
          }`}
          type="button"
          onClick={() => {
            setActiveMenu(null);
            onShowApproach?.();
          }}
          aria-haspopup="dialog"
          aria-expanded={isApproachOpen}
        >
          <img
            className="services-rail__logo"
            src={logo}
            alt="Irina Recovery"
          />

          <span className="services-rail__approach">
            Qui je suis
          </span>
        </button>
      </div>

      <div
        className={`services-rail__body ${
          !activeMenu
            ? "services-rail__body--carousel"
            : ""
        }`}
      >
          <>
          {!activeMenu && (
            <div className="services-rail__carousel-zone">
              <div
                className="services-rail__trigger-carousel"
                aria-label="Navigation principale"
              >
                <div
                  className="services-rail__trigger-track"
                  key={carouselIndex}
                >
                  {visibleCarouselItems.map(
                    (menuItem, position) => (
                      <button
                        className={`services-rail__carousel-trigger ${
                          position === 1
                            ? "services-rail__carousel-trigger--center"
                            : ""
                        }`}
                        type="button"
                        key={`${menuItem.id}-${position}`}
                        onClick={() =>
                          toggleMenu(menuItem.id)
                        }
                      >
                        <span>{menuItem.label}</span>

                        <span
                          className="services-rail__carousel-chevron"
                          aria-hidden="true"
                        >
                          ⌄
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="services-rail__carousel-controls">
                <button
                  className="services-rail__carousel-arrow services-rail__carousel-arrow--up"
                  type="button"
                  onClick={() => moveCarousel(-1)}
                  aria-label="Afficher les éléments précédents"
                >
                  ↑
                </button>

                <button
                  className="services-rail__carousel-arrow services-rail__carousel-arrow--down"
                  type="button"
                  onClick={() => moveCarousel(1)}
                  aria-label="Afficher les éléments suivants"
                >
                  ↓
                </button>
              </div>
            </div>
          )}

          {activeMenu && (
          <nav className="services-rail__nav services-rail__nav--open">
            {/* DÉCOUVRIR */}
            <div
              className={`services-rail__group services-rail__group--discover ${
                activeMenu === "discover"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "discover"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("discover")}
                aria-expanded={activeMenu === "discover"}
                aria-controls="services-rail-discover"
              >
                <span>Découvrir</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "discover" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--discover"
                  id="services-rail-discover"
                >
                  <button
                    className="services-rail__panel-main"
                    type="button"
                    onClick={handleShowAllServices}
                  >
                    Tous les accompagnements
                  </button>

                  <div className="services-rail__panel-list">
                    {selectorsData.map((selector) => (
                      <button
                        className={`services-rail__panel-item ${
                          currentNeed === selector.id
                            ? "services-rail__panel-item--active"
                            : ""
                        }`}
                        type="button"
                        key={selector.id}
                        onClick={() =>
                          handleSelectNeed(selector.id)
                        }
                      >
                        <img
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

            {/* OFFRES */}
            <div
              className={`services-rail__group services-rail__group--offers ${
                activeMenu === "offers"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "offers"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("offers")}
                aria-expanded={activeMenu === "offers"}
                aria-controls="services-rail-offers"
              >
                <span>Offres</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "offers" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--offers"
                  id="services-rail-offers"
                >
                  <button
                    className={`services-rail__text-item ${
                      isGiftCardOpen
                        ? "services-rail__text-item--active"
                        : ""
                    }`}
                    type="button"
                    onClick={() => {
                      closePanels();
                      onShowGiftCard?.();
                    }}
                    aria-haspopup="dialog"
                    aria-expanded={isGiftCardOpen}
                  >
                    <span aria-hidden="true">✦</span>
                    <span>Carte cadeau</span>
                  </button>

                  <button
                    className="services-rail__text-item"
                    type="button"
                    onClick={() =>
                      handleShowOffer("current")
                    }
                  >
                    <span aria-hidden="true">✧</span>
                    <span>Offres du moment</span>
                  </button>

                  <button
                    className="services-rail__text-item"
                    type="button"
                    onClick={() =>
                      handleShowOffer("packs")
                    }
                  >
                    <span aria-hidden="true">◇</span>
                    <span>Packs</span>
                  </button>

                  <button
                    className="services-rail__text-item"
                    type="button"
                    onClick={() =>
                      handleShowOffer("clubs")
                    }
                  >
                    <span aria-hidden="true">○</span>
                    <span>Clubs & partenaires</span>
                  </button>
                </div>
              )}
            </div>

            {/* PARTENARIATS */}
            <div
              className={`services-rail__group services-rail__group--partnerships ${
                activeMenu === "partnerships"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "partnerships"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("partnerships")}
                aria-expanded={activeMenu === "partnerships"}
                aria-controls="services-rail-partnerships"
              >
                <span>Partenariats</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "partnerships" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--partnerships"
                  id="services-rail-partnerships"
                >
                  <a
                    className="services-rail__text-item"
                    href={partnershipEmail(
                      "Collaboration avec un club sportif"
                    )}
                  >
                    <span aria-hidden="true">○</span>
                    <span>Clubs sportifs</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href={partnershipEmail(
                      "Intervention dans une école"
                    )}
                  >
                    <span aria-hidden="true">○</span>
                    <span>Écoles</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href={partnershipEmail(
                      "Collaboration avec une association"
                    )}
                  >
                    <span aria-hidden="true">○</span>
                    <span>Associations</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href={partnershipEmail(
                      "Intervention en maison de retraite"
                    )}
                  >
                    <span aria-hidden="true">○</span>
                    <span>Maisons de retraite</span>
                  </a>
                </div>
              )}
            </div>

            {/* GESTION DES RENDEZ-VOUS */}
            <div
              className={`services-rail__group services-rail__group--appointments ${
                activeMenu === "appointments"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "appointments"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("appointments")}
                aria-expanded={activeMenu === "appointments"}
                aria-controls="services-rail-appointments"
              >
                <span>Gestion des rendez-vous</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "appointments" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--appointments"
                  id="services-rail-appointments"
                >
                  <a
                    className="services-rail__text-item"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true">＋</span>
                    <span>Prendre rendez-vous</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href={modifyAppointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true">↻</span>
                    <span>Modifier un rendez-vous</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href={cancelAppointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true">×</span>
                    <span>Annuler un rendez-vous</span>
                  </a>

                  <a
                    className="services-rail__text-item"
                    href="#conditions-annulation"
                  >
                    <span aria-hidden="true">i</span>
                    <span>Conditions d’annulation</span>
                  </a>
                </div>
              )}
            </div>

            {/* AVIS */}
            <div
              className={`services-rail__group services-rail__group--reviews ${
                activeMenu === "reviews"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "reviews"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("reviews")}
                aria-expanded={activeMenu === "reviews"}
                aria-controls="services-rail-reviews"
              >
                <span>Avis</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "reviews" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--reviews"
                  id="services-rail-reviews"
                >
                  <button
                    className="services-rail__text-item"
                    type="button"
                  >
                    <span aria-hidden="true">“</span>
                    <span>Les avis</span>
                  </button>

                  <button
                    className="services-rail__text-item"
                    type="button"
                  >
                    <span aria-hidden="true">✎</span>
                    <span>Laisser votre avis</span>
                  </button>
                </div>
              )}
            </div>

            {/* CONTACT */}
            <div
              className={`services-rail__group services-rail__group--contact ${
                activeMenu === "contact"
                  ? "services-rail__group--active"
                  : ""
              }`}
            >
              <button
                className={`services-rail__trigger ${
                  activeMenu === "contact"
                    ? "services-rail__trigger--active"
                    : ""
                }`}
                type="button"
                onClick={() => toggleMenu("contact")}
                aria-expanded={activeMenu === "contact"}
                aria-controls="services-rail-contact"
              >
                <span>Contact</span>
                <span
                  className="services-rail__chevron"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {activeMenu === "contact" && (
                <div
                  className="services-rail__floating-panel services-rail__floating-panel--contact"
                  id="services-rail-contact"
                >
                  <a
                    className="services-rail__panel-item"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={whatsapp}
                      alt=""
                      aria-hidden="true"
                    />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    className="services-rail__panel-item"
                    href={emailUrl}
                  >
                    <img
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
          )}
          </>
      </div>

      <div className="services-rail__bottom">
     

        <a
          className="services-rail__appointment"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prendre rendez-vous
        </a>

        <div className="services-rail__socials">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={insta} alt="" aria-hidden="true" />
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={facebook} alt="" aria-hidden="true" />
          </a>
        </div>

        <div className="services-rail__legal">
          <a href="#mentions-legales">Mentions légales</a>
          <a href="#conditions-generales">CGV</a>
          <a href="#confidentialite">Confidentialité</a>
        </div>

        <p className="services-rail__copyright">
          © {new Date().getFullYear()} Irina Recovery
        </p>
      </div>
    </aside>
  );
}

export default ServicesRail;
