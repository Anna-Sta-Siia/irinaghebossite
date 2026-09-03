import {
  useEffect,
  useRef,
  useState,
} from "react";

import { dataServices } from "../../assets/data/dataServices";
import smallLogo from "../../assets/data/logosmall.png";

import "./index.css";

function Services({
  need,
  onSelectNeed,
  onServiceCta,
}) {
  const [flippedCardsByNeed, setFlippedCardsByNeed] =
    useState({});

  const [openedOverlaysByNeed, setOpenedOverlaysByNeed] =
    useState({});

  const servicesTopRef = useRef(null);

  const allServices = Object.entries(
    dataServices
  ).flatMap(([sectionId, section]) =>
    section.services.map((service, index) => ({
      ...service,
      sectionId,
      sectionTitle: section.title,
      cardId:
        service.id ??
        `${sectionId}-${index}`,
    }))
  );

  const current =
    need === "all"
      ? {
          title: "Tous mes accompagnements",
          intro:
            "Chaque accompagnement répond à un besoin différent. Prenez le temps de parcourir ce qui vous parle aujourd’hui.",
          services: allServices,
        }
      : dataServices[need];

  const flippedCards =
    flippedCardsByNeed[need] ?? new Set();

  const openedOverlays =
    openedOverlaysByNeed[need] ?? new Set();

  const hasOpenedOverlay =
    openedOverlays.size > 0;

  const toggleCard = (serviceId) => {
    setFlippedCardsByNeed((previousState) => {
      const currentSet =
        previousState[need] ?? new Set();

      const updatedSet =
        new Set(currentSet);

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
      const currentSet =
        previousState[need] ?? new Set();

      const updatedSet =
        new Set(currentSet);

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
      const currentSet =
        previousState[need] ?? new Set();

      const updatedSet =
        new Set(currentSet);

      updatedSet.delete(serviceId);

      return {
        ...previousState,
        [need]: updatedSet,
      };
    });
  };

  const closeAllOverlays = () => {
    setOpenedOverlaysByNeed(
      (previousState) => ({
        ...previousState,
        [need]: new Set(),
      })
    );
  };

  useEffect(() => {
    if (need !== "all") {
      return;
    }

    window.requestAnimationFrame(() => {
      servicesTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [need]);

  if (!current) {
    return null;
  }

  return (
    <section
      ref={servicesTopRef}
      className="services"
    >
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
  const serviceKey =
    service.cardId ?? service.id;

  const isFlipped =
    flippedCards.has(serviceKey);

  const isOverlayOpen =
    openedOverlays.has(serviceKey);

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
                  key={serviceKey}
                  style={{ "--service-index": index }}
                >
                  <div className="services__card-inner">
                    {/* FACE AVANT */}

                    <div
                      className="services__card-face services__card-front"
                      aria-hidden={isFlipped}
                    >
                      {need === "all" &&
                        service.sectionTitle && (
                          <span className="services__card-section">
                            {service.sectionTitle}
                          </span>
                        )}

                      <h3 className="services__card-title">
                        {service.title}
                      </h3>

                      <div className="services__actions">
                        <button
                          className="services__flip-cta"
                          type="button"
                          onClick={() =>
                            toggleCard(serviceKey)
                          }
                          aria-expanded={isFlipped}
                          aria-controls={`service-back-${serviceKey}`}
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.flipCta ??
                            "En savoir plus"}
                        </button>

                        <button
                          className="services__cta"
                          type="button"
                          onClick={() =>
                            onServiceCta?.(service)
                          }
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.cta}
                        </button>
                      </div>
                    </div>

                    {/* FACE ARRIÈRE */}

                    <div
                      className="services__card-face services__card-back"
                      id={`service-back-${serviceKey}`}
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
                            toggleOverlay(serviceKey)
                          }
                          aria-expanded={isOverlayOpen}
                          aria-controls={`service-overlay-${serviceKey}`}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.detailsCta ??
                            "Voir les détails"}
                        </button>

                        <button
                          className="services__back-cta"
                          type="button"
                          onClick={() =>
                            toggleCard(serviceKey)
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
                      id={`service-overlay-${serviceKey}`}
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby={`service-overlay-title-${serviceKey}`}
                    >
                      <div className="services__card-overlay-panel">
                        <button
                          className="services__overlay-close"
                          type="button"
                          onClick={() =>
                            closeOverlay(serviceKey)
                          }
                          aria-label="Fermer les détails"
                        >
                          ×
                        </button>

                        <h3
                          className="services__overlay-title"
                          id={`service-overlay-title-${serviceKey}`}
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
                                    key={`${serviceKey}-${priceItem.label ?? "tarif"}-${priceItem.price}`}
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
                          onClick={() =>
                            onServiceCta?.(service)
                          }
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

          {need !== "all" &&
            current.more && (
            <div className="services__more">
              <button
                className="services__more-cta"
                type="button"
                onClick={() =>
                  onSelectNeed?.("all")
                }
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
  );
}

export default Services;
