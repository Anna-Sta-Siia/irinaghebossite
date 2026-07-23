import { useEffect, useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import "./index.css";
import ServicesRail from "../ServicesRail";
import Header from "../Header";
import Footer from "../Footer";
import smallLogo from "../../assets/data/logosmall.png";
import irinaApproach from "../../assets/data/irina-approach.png";
import GiftCardMock from "../GiftCardMock";


function Services({
  need,
  onBack,
  onShowAllServices,
  onSelectNeed,
  onShowOffers,
}) {
  const [flippedCardsByNeed, setFlippedCardsByNeed] = useState({});
  const [openedOverlaysByNeed, setOpenedOverlaysByNeed] = useState({});
  const [isApproachOpen, setIsApproachOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const current = dataServices[need];

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const flippedCards = flippedCardsByNeed[need] ?? new Set();
  const openedOverlays = openedOverlaysByNeed[need] ?? new Set();
  const hasOpenedOverlay = openedOverlays.size > 0;


  const toggleCard = (serviceId) => {
    setFlippedCardsByNeed((previousState) => {
      const currentSet = previousState[need] ?? new Set();
      const updatedSet = new Set(currentSet);

      if (updatedSet.has(serviceId)) {
        updatedSet.delete(serviceId);
      } else {
        updatedSet.add(serviceId);
      }

      return {
        ...previousState,
        [need]: updatedSet,
      };
    });
  };

  const toggleOverlay = (serviceId) => {
    setOpenedOverlaysByNeed((previousState) => {
      const currentSet = previousState[need] ?? new Set();
      const updatedSet = new Set(currentSet);

      if (updatedSet.has(serviceId)) {
        updatedSet.delete(serviceId);
      } else {
        updatedSet.add(serviceId);
      }

      return {
        ...previousState,
        [need]: updatedSet,
      };
    });
  };

  const closeOverlay = (serviceId) => {
    setOpenedOverlaysByNeed((previousState) => {
      const currentSet = previousState[need] ?? new Set();
      const updatedSet = new Set(currentSet);

      updatedSet.delete(serviceId);

      return {
        ...previousState,
        [need]: updatedSet,
      };
    });
  };

  const closeAllOverlays = () => {
    setOpenedOverlaysByNeed((previousState) => ({
      ...previousState,
      [need]: new Set(),
    }));
  };

  const toggleApproach = () => {
    closeAllOverlays();
    setIsGiftCardOpen(false);
    setIsApproachOpen((currentValue) => !currentValue);
  };

  const closeApproach = () => {
    setIsApproachOpen(false);
  };

  const toggleGiftCard = () => {
    closeAllOverlays();
    setIsApproachOpen(false);
    setIsGiftCardOpen((currentValue) => !currentValue);
  };

  const closeGiftCard = () => {
    setIsGiftCardOpen(false);
  };

  const hasMainOverlay =
    isApproachOpen || isGiftCardOpen;

  useEffect(() => {
    if (!hasMainOverlay) {
      return undefined;
    }

    const previousBodyOverflow =
      document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeApproach();
        closeGiftCard();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [hasMainOverlay]);

  if (!current) {
    return null;
  }

  return (
    <div className="services-page">
      <div className="services-page__desktop-navigation">
        <ServicesRail
          currentNeed={need}
          onShowAllServices={onShowAllServices}
          onSelectNeed={onSelectNeed}
          onShowOffers={onShowOffers}
          onShowApproach={toggleApproach}
          isApproachOpen={isApproachOpen}
          onShowGiftCard={toggleGiftCard}
          isGiftCardOpen={isGiftCardOpen}
        />
      </div>

      <div className="services-page__mobile-header">
        <Header
          onBack={onBack}
          onShowAllServices={onShowAllServices}
          onSelectNeed={onSelectNeed}
        />
      </div>

      <section
        className={`services ${
          hasMainOverlay
            ? "services--main-overlay-open"
            : ""
        }`}
      >
        <a
          className="services__appointment-top"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prendre rendez-vous
        </a>

        {isApproachOpen && (
          <div
            className="services__approach-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-approach-title"
          >
            <button
              className="services__approach-backdrop"
              type="button"
              onClick={closeApproach}
              aria-label="Fermer la présentation"
            />

            <div className="services__approach-modal">
              <button
                className="services__approach-close"
                type="button"
                onClick={closeApproach}
                aria-label="Fermer"
              >
                ×
              </button>

              <div className="services__approach-copy">
                <img
                  className="services__approach-mini-logo"
                  src={smallLogo}
                  alt=""
                  aria-hidden="true"
                />

                <p className="services__approach-kicker">
                  Irina Recovery
                </p>

                <h2
                  className="services__approach-title"
                  id="services-approach-title"
                >
                  Qui je suis
                </h2>

                <p>
                  Bonjour, je suis Irina.
                </p>

                <p>
                  J’accompagne chaque personne à retrouver
                  davantage de mobilité, d’énergie et de confort
                  dans son corps.
                </p>

                <p>
                  Mon approche associe le mouvement, le soin et
                  l’écoute, avec une attention particulière portée
                  à chaque personne.
                </p>

                <p className="services__approach-quote">
                  Prendre soin de soi, c’est retrouver la liberté
                  d’avancer.
                </p>
              </div>

              <div className="services__approach-photo-wrap">
                <img
                  className="services__approach-photo"
                  src={irinaApproach}
                  alt="Irina dans une salle de sport"
                />
              </div>
            </div>
          </div>
        )}

        {isGiftCardOpen && (
          <div
            className="services__gift-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-gift-card-title"
          >
            <button
              className="services__gift-backdrop"
              type="button"
              onClick={closeGiftCard}
              aria-label="Fermer la carte cadeau"
            />

            <div className="services__gift-modal">
              <button
                className="services__gift-close"
                type="button"
                onClick={closeGiftCard}
                aria-label="Fermer"
              >
                ×
              </button>

              <h2
                className="services__gift-sr-title"
                id="services-gift-card-title"
              >
                Carte cadeau Pack Découverte
              </h2>

              <div className="services__gift-scroll">
                <GiftCardMock />
              </div>
            </div>
          </div>
        )}

        {hasOpenedOverlay && (
          <button
            className="services__overlay-page-backdrop"
            type="button"
            onClick={closeAllOverlays}
            aria-label="Fermer les détails"
          />
        )}

        <div className="services__content">
          <h2 className="services__title">
            {current.title}
          </h2>

          {current.intro && (
            <p className="services__intro">
              {current.intro}
            </p>
          )}


          <div
            className={`services__list ${
              hasOpenedOverlay
                ? "services__list--overlay-open"
                : ""
            }`}
          >
            {current.services.map((service, index) => {
              const isFlipped = flippedCards.has(service.id);
              const isOverlayOpen = openedOverlays.has(service.id);

              return (
                <article
                  className={`services__card ${
                    isFlipped
                      ? "services__card--flipped"
                      : ""
                  } ${
                    isOverlayOpen
                      ? "services__card--overlay-open"
                      : ""
                  }`}
                  key={service.id}
                  style={{ "--service-index": index }}
                >
                  <div className="services__card-inner">
                    {/* FACE AVANT */}

                    <div
                      className="services__card-face services__card-front"
                      aria-hidden={isFlipped}
                    >
                      <h3 className="services__card-title">
                        {service.title}
                      </h3>

                      <div className="services__actions">
                        <button
                          className="services__flip-cta"
                          type="button"
                          onClick={() =>
                            toggleCard(service.id)
                          }
                          aria-expanded={isFlipped}
                          aria-controls={`service-back-${service.id}`}
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.flipCta ??
                            "En savoir plus"}
                        </button>

                        <button
                          className="services__cta"
                          type="button"
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.cta}
                        </button>
                      </div>
                    </div>

                    {/* FACE ARRIÈRE */}

                    <div
                      className="services__card-face services__card-back"
                      id={`service-back-${service.id}`}
                      aria-hidden={!isFlipped}
                    >
                      <p className="services__card-description">
                        {service.description}
                      </p>

                      <div className="services__actions">
                        <button
                          className="services__details-cta"
                          type="button"
                          onClick={() =>
                            toggleOverlay(service.id)
                          }
                          aria-expanded={isOverlayOpen}
                          aria-controls={`service-overlay-${service.id}`}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.detailsCta ??
                            "Voir les détails"}
                        </button>

                        <button
                          className="services__back-cta"
                          type="button"
                          onClick={() =>
                            toggleCard(service.id)
                          }
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.backCta ?? "Revenir"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD OVERLAY LOCAL */}

                  {isOverlayOpen && (
                    <div
                      className="services__card-overlay"
                      id={`service-overlay-${service.id}`}
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby={`service-overlay-title-${service.id}`}
                    >
                      <div className="services__card-overlay-panel">
                        <button
                          className="services__overlay-close"
                          type="button"
                          onClick={() =>
                            closeOverlay(service.id)
                          }
                          aria-label="Fermer les détails"
                        >
                          ×
                        </button>

                        <h3
                          className="services__overlay-title"
                          id={`service-overlay-title-${service.id}`}
                        >
                          {service.title}
                        </h3>

                        <div className="services__overlay-scroll">
                          {service.items && (
                            <div className="services__items">
                              {service.items.map((item) => (
                                <div
                                  className="services__item"
                                  key={item.name}
                                >
                                  <span className="services__item-name">
                                    {item.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {service.prices && (
                            <div className="services__prices">
                              {service.prices.map(
                                (priceItem) => (
                                  <div
                                    className="services__price"
                                    key={`${service.id}-${priceItem.label ?? "tarif"}-${priceItem.price}`}
                                  >
                                    {priceItem.label && (
                                      <span className="services__price-label">
                                        {
                                          priceItem.label
                                        }
                                      </span>
                                    )}

                                    <span className="services__price-value">
                                      {priceItem.price}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {service.note && (
                            <p className="services__note">
                              {service.note}
                            </p>
                          )}

                          {service.externalRef?.url && (
                            <a
                              className="services__details-link"
                              href={
                                service.externalRef.url
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              {service.externalRef.label ??
                                "Voir en pratique"}
                            </a>
                          )}

                          {service.testimonial && (
                            <blockquote className="services__overlay-testimonial">
                              <span className="services__overlay-testimonial-label">
                                {service.testimonial.label ??
                                  "Quelques mots"}
                              </span>

                              <p className="services__overlay-testimonial-text">
                                « {service.testimonial.text} »
                              </p>
                            </blockquote>
                          )}

                        </div>

                        <button
                          className="services__cta"
                          type="button"
                        >
                          {service.cta}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {current.more && (
            <div className="services__more">
              <button
                className="services__more-cta"
                type="button"
                onClick={onShowAllServices}
              >
                {current.more.cta}
              </button>
            </div>
          )}

          <div
            className="services__signature"
            aria-hidden="true"
          >
            <img
              className="services__signature-logo"
              src={smallLogo}
              alt=""
            />
          </div>
        </div>
      </section>

      <div className="services-page__mobile-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Services;