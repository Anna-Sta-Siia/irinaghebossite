import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  dataServices,
} from "../../assets/data/dataServices";

import ServicesFilters from "../ServicesFilters";
import OfferCard from "../OfferCard";

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
        section.services
          .filter(
            (service) =>
              service.active !== false
          )
          .map(
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
      : dataServices[need]
        ? {
            ...dataServices[need],

            services:
              dataServices[
                need
              ].services.filter(
                (service) =>
                  service.active !==
                  false
              ),
          }
        : null;

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
          new Set(currentSet);

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
          new Set(currentSet);

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
          new Set(currentSet);

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

              Voir tous les
              accompagnements de cette
              catégorie
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
                <OfferCard
                  key={serviceKey}

                  item={service}

                  itemKey={
                    serviceKey
                  }

                  index={index}

                  showSectionTitle={
                    need === "all"
                  }

                  isFlipped={
                    isFlipped
                  }

                  isOverlayOpen={
                    isOverlayOpen
                  }

                  onFlip={
                    toggleCard
                  }

                  onToggleDetails={
                    toggleOverlay
                  }

                  onCloseDetails={
                    closeOverlay
                  }

                  onCta={
                    onServiceCta
                  }
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default Services;