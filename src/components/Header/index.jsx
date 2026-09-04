import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./index.css";

import logo from "../../assets/data/logobig.png";

import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

import { selectorsData } from "../../assets/data/dataSelectors";

function Header({
  onShowAllServices,
  onShowOffers,
  onSelectNeed,
  onShowApproach,
  onShowGiftCard,

  selection = [],
  onRemoveSelection,
  onFinalizeSelection,
}) {
  const [activeMenu, setActiveMenu] =
    useState(null);

  const headerRef = useRef(null);

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const emailUrl =
    "mailto:irinacoachprepa@gmail.com?subject=Demande%20de%20rendez-vous";

  const instagramUrl =
    "https://www.instagram.com/irina_recovery/";

  const facebookUrl =
    "https://www.facebook.com/PikaPikaPikatchuuu";

  const selectionCount =
    selection.length;

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const toggleMenu = (menuId) => {
    setActiveMenu((currentMenu) =>
      currentMenu === menuId
        ? null
        : menuId
    );
  };

  const handleShowAllServices = () => {
    closeMenu();

    if (onShowAllServices) {
      onShowAllServices();
      return;
    }

    onSelectNeed?.("all");
  };

  const handleSelectNeed = (
    needId
  ) => {
    closeMenu();
    onSelectNeed?.(needId);
  };

  const handleShowOffer = (
    offerId
  ) => {
    closeMenu();
    onShowOffers?.(offerId);
  };

  const handleShowApproach = () => {
    closeMenu();
    onShowApproach?.();
  };

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target
        )
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (
        event.key === "Escape"
      ) {
        closeMenu();
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

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
        {/* ======================
            GAUCHE
        ====================== */}

        <div className="site-header__left">
          <div className="site-header__identity">
            <button
              className="site-header__logo-button"
              type="button"
              onClick={
                handleShowApproach
              }
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
              onClick={
                handleShowApproach
              }
            >
              Mon approche
            </button>
          </div>

          <div className="site-header__left-navigation">
            {/* MON UNIVERS */}

            <HeaderMenu
              id="universe"
              label="Mon univers"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              side="left"
            >
              <a
                className="site-header__dropdown-item"
                href={
                  instagramUrl
                }
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

                <span>
                  Instagram
                </span>
              </a>

              <a
                className="site-header__dropdown-item"
                href={
                  facebookUrl
                }
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

                <span>
                  Facebook
                </span>
              </a>
            </HeaderMenu>

            {/* CONTACT */}

            <HeaderMenu
              id="contact"
              label="Contact"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              side="left"
            >
              <a
                className="site-header__dropdown-item"
                href={
                  whatsappUrl
                }
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

                <span>
                  WhatsApp
                </span>
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

                <span>
                  E-mail
                </span>
              </a>
            </HeaderMenu>
          </div>
        </div>

        {/* ======================
            DROITE
        ====================== */}

        <div className="site-header__right">
          {/* MA SÉLECTION */}

          <div className="site-header__selection-wrap">
            <HeaderMenu
              id="selection"
              label={
                selectionCount > 0
                  ? `Ma sélection · ${selectionCount}`
                  : "Ma sélection"
              }
              activeMenu={
                activeMenu
              }
              toggleMenu={
                toggleMenu
              }
              side="right"
              compact
              selection
            >
              {selectionCount === 0 ? (
                <p className="site-header__selection-empty">
                  Votre sélection est
                  encore vide.
                </p>
              ) : (
                <>
                  <div className="site-header__selection-list">
                    {selection.map(
                      (item) => (
                        <div
                          className="site-header__selection-item"
                          key={
                            item.id
                          }
                        >
                          <div>
                            <strong>
                              {
                                item.title
                              }
                            </strong>

                            {item.price && (
                              <span>
                                {
                                  item.price
                                }
                              </span>
                            )}
                          </div>

                          {onRemoveSelection && (
                            <button
                              type="button"
                              onClick={() =>
                                onRemoveSelection(
                                  item.id
                                )
                              }
                            >
                              Retirer
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    className="site-header__selection-finalize"
                    type="button"
                    onClick={
                      onFinalizeSelection
                    }
                  >
                    Finaliser ma
                    sélection
                  </button>
                </>
              )}
            </HeaderMenu>
          </div>

          {/* ACTIONS PRINCIPALES */}

          <div className="site-header__primary-navigation">
            {/* DÉCOUVRIR */}

            <HeaderMenu
              id="discover"
              label="Découvrir"
              activeMenu={
                activeMenu
              }
              toggleMenu={
                toggleMenu
              }
              side="right"
            >
              <button
                className="site-header__dropdown-main"
                type="button"
                onClick={
                  handleShowAllServices
                }
              >
                Tous les accompagnements
              </button>

              <div className="site-header__dropdown-list">
                {selectorsData.map(
                  (selector) => (
                    <button
                      className="site-header__dropdown-item"
                      type="button"
                      key={
                        selector.id
                      }
                      onClick={() =>
                        handleSelectNeed(
                          selector.id
                        )
                      }
                    >
                      <img
                        className="site-header__dropdown-icon"
                        src={
                          selector.icon
                        }
                        alt=""
                        aria-hidden="true"
                      />

                      <span>
                        {
                          selector.title
                        }
                      </span>
                    </button>
                  )
                )}
              </div>
            </HeaderMenu>

            {/* OFFRES */}

            <HeaderMenu
              id="offers"
              label="Offres"
              activeMenu={
                activeMenu
              }
              toggleMenu={
                toggleMenu
              }
              side="right"
            >
           <button
  className="site-header__dropdown-item"
  type="button"
  onClick={() => {
    closeMenu();
    onShowGiftCard?.();
  }}
>
                <span
                  className="site-header__offer-symbol"
                  aria-hidden="true"
                >
                  ✦
                </span>

                <span>
                  Carte cadeau
                </span>
              </button>

              <button
                className="site-header__dropdown-item"
                type="button"
                onClick={() =>
                  handleShowOffer(
                    "current"
                  )
                }
              >
                <span
                  className="site-header__offer-symbol"
                  aria-hidden="true"
                >
                  ✧
                </span>

                <span>
                  Offres du moment
                </span>
              </button>

              <button
                className="site-header__dropdown-item"
                type="button"
                onClick={() =>
                  handleShowOffer(
                    "packs"
                  )
                }
              >
                <span
                  className="site-header__offer-symbol"
                  aria-hidden="true"
                >
                  ◇
                </span>

                <span>
                  Packs
                </span>
              </button>

              <button
                className="site-header__dropdown-item"
                type="button"
                onClick={() =>
                  handleShowOffer(
                    "clubs"
                  )
                }
              >
                <span
                  className="site-header__offer-symbol"
                  aria-hidden="true"
                >
                  ○
                </span>

                <span>
                  Clubs &
                  partenaires
                </span>
              </button>
            </HeaderMenu>

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
      </header>
    </div>
  );
}


/* ===========================
   MENU FLOTTANT RÉUTILISABLE
=========================== */

function HeaderMenu({
  id,
  label,
  activeMenu,
  toggleMenu,
  children,
  side = "right",
  compact = false,
  selection = false,
}) {
  const isOpen =
    activeMenu === id;

  return (
    <div
      className={`site-header__menu site-header__menu--${side} ${
        compact
          ? "site-header__menu--compact"
          : ""
      } ${
        selection
          ? "site-header__menu--selection"
          : ""
      }`}
    >
      <button
        className={`site-header__nav-trigger ${
          isOpen
            ? "site-header__nav-trigger--active"
            : ""
        }`}
        type="button"
        onClick={() =>
          toggleMenu(id)
        }
        aria-expanded={isOpen}
        aria-controls={`header-${id}-menu`}
      >
        <span>
          {label}
        </span>

        <span
          className="site-header__chevron"
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>

      <div
        className={`site-header__floating-panel ${
          isOpen
            ? "site-header__floating-panel--open"
            : ""
        }`}
        id={`header-${id}-menu`}
        aria-hidden={!isOpen}
      >
        <div className="site-header__floating-panel-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Header;
