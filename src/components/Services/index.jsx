import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  dataServices,
} from "../../assets/data/dataServices";

import smallLogo from "../../assets/data/logosmall.png";

import ServicesFilters from "../ServicesFilters";

import "./index.css";

function Services({
  need,
  onSelectNeed,
  onServiceCta,

  focusedServiceId = null,
  onClearFocusedService,
}) {
  const [
    flippedCardsByNeed,
    setFlippedCardsByNeed,
  ] = useState({});

  const [
    openedOverlaysByNeed,
    setOpenedOverlaysByNeed,
  ] = useState({});

  const servicesTopRef =
    useRef(null);

  /* ===========================
     ALL SERVICES
  =========================== */

  const allServices =
    Object.entries(
      dataServices
    ).flatMap(
      ([sectionId, section]) =>
        section.services.map(
          (service, index) => ({
            ...service,

            sectionId,

            sectionTitle:
              section.title,

            cardId:
              service.id ??
              `${sectionId}-${index}`,
          })
        )
    );


  /* ===========================
     CURRENT SECTION
  =========================== */

  const current =
    need === "all"
      ? {
          title:
            "Tous mes accompagnements",

          intro:
            "Chaque accompagnement répond à un besoin différent. Prenez le temps de parcourir ce qui vous parle aujourd’hui.",

          services:
            allServices,
        }
      : dataServices[need];


  const flippedCards =
    flippedCardsByNeed[need] ??
    new Set();


  const openedOverlays =
    openedOverlaysByNeed[
      need
    ] ?? new Set();


  const hasOpenedOverlay =
    openedOverlays.size > 0;


  /* ===========================
     SERVICE FOCUS
  =========================== */

  const visibleServices =
    focusedServiceId
      ? current?.services.filter(
          (service) =>
            (
              service.cardId ??
              service.id
            ) ===
              focusedServiceId ||
            service.id ===
              focusedServiceId
        )
      : current?.services ?? [];


  /* ===========================
     CARD FLIP
  =========================== */

  const toggleCard = (
    serviceId
  ) => {
    setFlippedCardsByNeed(
      (previousState) => {
        const currentSet =
          previousState[need] ??
          new Set();

        const updatedSet =
          new Set(
            currentSet
          );

        if (
          updatedSet.has(
            serviceId
          )
        ) {
          updatedSet.delete(
            serviceId
          );
        } else {
          updatedSet.add(
            serviceId
          );
        }

        return {
          ...previousState,

          [need]:
            updatedSet,
        };
      }
    );
  };


  /* ===========================
     DETAILS OVERLAY
  =========================== */

  const toggleOverlay = (
    serviceId
  ) => {
    setOpenedOverlaysByNeed(
      (previousState) => {
        const currentSet =
          previousState[need] ??
          new Set();

        const updatedSet =
          new Set(
            currentSet
          );

        if (
          updatedSet.has(
            serviceId
          )
        ) {
          updatedSet.delete(
            serviceId
          );
        } else {
          updatedSet.add(
            serviceId
          );
        }

        return {
          ...previousState,

          [need]:
            updatedSet,
        };
      }
    );
  };


  const closeOverlay = (
    serviceId
  ) => {
    setOpenedOverlaysByNeed(
      (previousState) => {
        const currentSet =
          previousState[need] ??
          new Set();

        const updatedSet =
          new Set(
            currentSet
          );

        updatedSet.delete(
          serviceId
        );

        return {
          ...previousState,

          [need]:
            updatedSet,
        };
      }
    );
  };


  const closeAllOverlays =
    () => {
      setOpenedOverlaysByNeed(
        (previousState) => ({
          ...previousState,

          [need]:
            new Set(),
        })
      );
    };


  /* ===========================
     SCROLL ALL
  =========================== */

  useEffect(() => {
    if (need !== "all") {
      return;
    }

    window.requestAnimationFrame(
      () => {
        servicesTopRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",

            block:
              "start",
          }
        );
      }
    );
  }, [need]);


  /* ===========================
     SCROLL SERVICE FOCUSED
  =========================== */

  useEffect(() => {
    if (!focusedServiceId) {
      return;
    }

    window.requestAnimationFrame(
      () => {
        servicesTopRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",

            block:
              "start",
          }
        );
      }
    );
  }, [
    focusedServiceId,
    need,
  ]);


  if (!current) {
    return null;
  }


  return (
    <section
      ref={servicesTopRef}
      className={`services ${
        focusedServiceId
          ? "services--focused"
          : ""
      }`}
    >
      {/* ===========================
          PAGE BACKDROP
      =========================== */}

      {hasOpenedOverlay && (
        <button
          className="services__overlay-page-backdrop"
          type="button"
          onClick={
            closeAllOverlays
          }
          aria-label="Fermer les détails"
        />
      )}


      <div className="services__content">

        {/* ===========================
            TITLE
        =========================== */}

        <h2 className="services__title">
          {current.title}
        </h2>


        {current.intro &&
          !focusedServiceId && (
            <p className="services__intro">
              {current.intro}
            </p>
          )}


        {/* ===========================
            FILTERS
        =========================== */}

        {need === "all" &&
          !focusedServiceId && (
            <ServicesFilters
              currentNeed={
                need
              }

              onSelectNeed={
                onSelectNeed
              }
            />
          )}


        {/* ===========================
            FOCUSED SERVICE RETURN
        =========================== */}

        {focusedServiceId && (
          <div className="services__focus-navigation">
            <button
              className="services__focus-back"
              type="button"
              onClick={
                onClearFocusedService
              }
            >
              <span
                aria-hidden="true"
              >
                ←
              </span>

              Voir tous les accompagnements
              de cette catégorie
            </button>
          </div>
        )}


        {/* ===========================
            SERVICES LIST
        =========================== */}

        <div
          className={`services__list ${
            hasOpenedOverlay
              ? "services__list--overlay-open"
              : ""
          } ${
            focusedServiceId
              ? "services__list--focused"
              : ""
          }`}
        >

          {visibleServices.map(
            (
              service,
              index
            ) => {
              const serviceKey =
                service.cardId ??
                service.id;


              const isFlipped =
                flippedCards.has(
                  serviceKey
                );


              const isOverlayOpen =
                openedOverlays.has(
                  serviceKey
                );


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
                  key={
                    serviceKey
                  }
                  style={{
                    "--service-index":
                      index,
                  }}
                >

                  <div className="services__card-inner">

                    {/* ===========================
                        FACE AVANT
                    =========================== */}

                    <div
                      className="services__card-face services__card-front"

                      aria-hidden={
                        isFlipped
                      }
                    >

                      {need ===
                        "all" &&
                        service.sectionTitle && (
                          <span className="services__card-section">

                            {
                              service.sectionTitle
                            }

                          </span>
                        )}


                      <h3 className="services__card-title">

                        {
                          service.title
                        }

                      </h3>


                      <div className="services__actions">

                        <button
                          className="services__flip-cta"

                          type="button"

                          onClick={() =>
                            toggleCard(
                              serviceKey
                            )
                          }

                          aria-expanded={
                            isFlipped
                          }

                          aria-controls={`service-back-${serviceKey}`}

                          tabIndex={
                            isFlipped
                              ? -1
                              : 0
                          }
                        >
                          {service.flipCta ??
                            "En savoir plus"}
                        </button>


                        <button
                          className="services__cta"

                          type="button"

                          onClick={() =>
                            onServiceCta?.(
                              service
                            )
                          }

                          tabIndex={
                            isFlipped
                              ? -1
                              : 0
                          }
                        >
                          {
                            service.cta
                          }
                        </button>

                      </div>

                    </div>


                    {/* ===========================
                        FACE ARRIÈRE
                    =========================== */}

                    <div
                      className="services__card-face services__card-back"

                      id={`service-back-${serviceKey}`}

                      aria-hidden={
                        !isFlipped
                      }
                    >

                      <p className="services__card-description">

                        {
                          service.description
                        }

                      </p>


                      <div className="services__actions">

                        <button
                          className="services__details-cta"

                          type="button"

                          onClick={() =>
                            toggleOverlay(
                              serviceKey
                            )
                          }

                          aria-expanded={
                            isOverlayOpen
                          }

                          aria-controls={`service-overlay-${serviceKey}`}

                          tabIndex={
                            isFlipped
                              ? 0
                              : -1
                          }
                        >
                          {service.detailsCta ??
                            "Voir les détails"}
                        </button>


                        <button
                          className="services__back-cta"

                          type="button"

                          onClick={() =>
                            toggleCard(
                              serviceKey
                            )
                          }

                          tabIndex={
                            isFlipped
                              ? 0
                              : -1
                          }
                        >
                          {service.backCta ??
                            "Revenir"}
                        </button>

                      </div>

                    </div>

                  </div>


                  {/* ===========================
                      DETAILS OVERLAY
                  =========================== */}

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
                            closeOverlay(
                              serviceKey
                            )
                          }

                          aria-label="Fermer les détails"
                        >
                          ×
                        </button>


                        <h3
                          className="services__overlay-title"

                          id={`service-overlay-title-${serviceKey}`}
                        >
                          {
                            service.title
                          }
                        </h3>


                        <div className="services__overlay-scroll">

                          {service.items && (
                            <div className="services__items">

                              {service.items.map(
                                (
                                  item
                                ) => (
                                  <div
                                    className="services__item"

                                    key={
                                      item.name
                                    }
                                  >

                                    <span className="services__item-name">

                                      {
                                        item.name
                                      }

                                    </span>

                                  </div>
                                )
                              )}

                            </div>
                          )}


                          {service.prices && (
                            <div className="services__prices">

                              {service.prices.map(
                                (
                                  priceItem
                                ) => (
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

                                      {
                                        priceItem.price
                                      }

                                    </span>

                                  </div>
                                )
                              )}

                            </div>
                          )}


                          {service.note && (
                            <p className="services__note">

                              {
                                service.note
                              }

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

                        </div>


                        <button
                          className="services__cta"

                          type="button"

                          onClick={() =>
                            onServiceCta?.(
                              service
                            )
                          }
                        >
                          {
                            service.cta
                          }
                        </button>

                      </div>

                    </div>
                  )}

                </article>
              );
            }
          )}

        </div>


        {/* ===========================
            SIGNATURE
        =========================== */}

        <div
          className="services__signature"

          aria-hidden="true"
        >
          <img
            className="services__signature-logo"

            src={
              smallLogo
            }

            alt=""
          />
        </div>

      </div>

    </section>
  );
}

export default Services;