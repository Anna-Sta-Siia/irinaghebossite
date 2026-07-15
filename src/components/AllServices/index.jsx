import { useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import { selectorsData } from "../../assets/data/dataSelectors";

import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

function AllServices({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [flippedCards, setFlippedCards] = useState(() => new Set());
  const [openedOverlays, setOpenedOverlays] = useState(() => new Set());

  const allServices = Object.entries(dataServices).flatMap(
    ([sectionId, section]) =>
      section.services.map((service, index) => ({
        ...service,
        sectionId,
        sectionTitle: section.title,
        cardId:
          service.id ??
          `${sectionId}-${service.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}-${index}`,
      }))
  );

  const filters = [
    {
      id: "all",
      label: "Tous",
      icon: null,
    },
    ...selectorsData.map((selector) => ({
      id: selector.id,
      label: selector.title,
      icon: selector.icon,
    })),
  ];

  const filteredServices =
    activeFilter === "all"
      ? allServices
      : allServices.filter(
          (service) => service.sectionId === activeFilter
        );

  const hasOpenedOverlay = openedOverlays.size > 0;

  const toggleCard = (cardId) => {
    setFlippedCards((previousCards) => {
      const updatedCards = new Set(previousCards);

      if (updatedCards.has(cardId)) {
        updatedCards.delete(cardId);
      } else {
        updatedCards.add(cardId);
      }

      return updatedCards;
    });
  };

  const toggleOverlay = (cardId) => {
    setOpenedOverlays((previousOverlays) => {
      const updatedOverlays = new Set(previousOverlays);

      if (updatedOverlays.has(cardId)) {
        updatedOverlays.delete(cardId);
      } else {
        updatedOverlays.add(cardId);
      }

      return updatedOverlays;
    });
  };

  const closeOverlay = (cardId) => {
    setOpenedOverlays((previousOverlays) => {
      const updatedOverlays = new Set(previousOverlays);

      updatedOverlays.delete(cardId);

      return updatedOverlays;
    });
  };

  const closeAllOverlays = () => {
    setOpenedOverlays(new Set());
  };

  const selectFilter = (filterId) => {
    setActiveFilter(filterId);
    setFlippedCards(new Set());
    setOpenedOverlays(new Set());
  };

  return (
    <>
      <Header
        onBack={onBack}
        onShowAllServices={() => {}}
      />

      <section className="all-services">
        {hasOpenedOverlay && (
          <button
            className="all-services__overlay-page-backdrop"
            type="button"
            onClick={closeAllOverlays}
            aria-label="Fermer les détails"
          ></button>
        )}

        <div className="all-services__content">
          <h2 className="all-services__title">
            Tous mes accompagnements
          </h2>

          <div className="all-services__intro">
            <p>
              Chaque accompagnement répond à un besoin différent
            </p>

            <p>
              Prenez le temps de parcourir ce qui vous parle aujourd’hui
            </p>
          </div>

          <div
            className="all-services__filters"
            aria-label="Filtrer les accompagnements"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  className={`all-services__filter ${
                    isActive ? "all-services__filter--active" : ""
                  }`}
                  type="button"
                  key={filter.id}
                  onClick={() => selectFilter(filter.id)}
                  aria-pressed={isActive}
                >
                  {filter.icon && (
                    <img
                      className="all-services__filter-icon"
                      src={filter.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  )}

                  <span className="all-services__filter-label">
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="all-services__list"
            key={activeFilter}
          >
            {filteredServices.map((service, index) => {
              const isFlipped = flippedCards.has(service.cardId);
              const isOverlayOpen = openedOverlays.has(service.cardId);

              return (
                <article
                  className={`all-services__card ${
                    isFlipped ? "all-services__card--flipped" : ""
                  } ${
                    isOverlayOpen ? "all-services__card--overlay-open" : ""
                  }`}
                  key={service.cardId}
                  style={{ "--card-index": index }}
                >
                  <div className="all-services__card-inner">
                    {/* FACE AVANT */}
                    <div
                      className="all-services__card-face all-services__card-front"
                      aria-hidden={isFlipped}
                    >
                      <span className="all-services__section">
                        {service.sectionTitle}
                      </span>

                      <h3 className="all-services__card-title">
                        {service.title}
                      </h3>

                      <div className="all-services__actions">
                        <button
                          className="all-services__flip-cta"
                          type="button"
                          onClick={() => toggleCard(service.cardId)}
                          aria-expanded={isFlipped}
                          aria-controls={`all-service-back-${service.cardId}`}
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.flipCta ?? "En savoir plus"}
                        </button>

                        <button
                          className="all-services__cta"
                          type="button"
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.cta}
                        </button>
                      </div>
                    </div>

                    {/* FACE ARRIÈRE */}
                    <div
                      className="all-services__card-face all-services__card-back"
                      id={`all-service-back-${service.cardId}`}
                      aria-hidden={!isFlipped}
                    >
                      <p className="all-services__card-description">
                        {service.description}
                      </p>

                      <div className="all-services__actions">
                        <button
                          className="all-services__details-cta"
                          type="button"
                          onClick={() => toggleOverlay(service.cardId)}
                          aria-expanded={isOverlayOpen}
                          aria-controls={`all-service-overlay-${service.cardId}`}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.detailsCta ?? "Voir les détails"}
                        </button>

                        <button
                          className="all-services__back-cta"
                          type="button"
                          onClick={() => toggleCard(service.cardId)}
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
                      className="all-services__card-overlay"
                      id={`all-service-overlay-${service.cardId}`}
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby={`all-service-overlay-title-${service.cardId}`}
                    >
                      <div className="all-services__card-overlay-panel">
                        <button
                          className="all-services__overlay-close"
                          type="button"
                          onClick={() => closeOverlay(service.cardId)}
                          aria-label="Fermer les détails"
                        >
                          ×
                        </button>

                        <h3
                          className="all-services__overlay-title"
                          id={`all-service-overlay-title-${service.cardId}`}
                        >
                          {service.title}
                        </h3>

                        <div className="all-services__overlay-scroll">
                          {service.items && (
                            <div className="all-services__items">
                              {service.items.map((item) => (
                                <div
                                  className="all-services__item"
                                  key={item.name}
                                >
                                  <span className="all-services__item-name">
                                    {item.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {service.prices && (
                            <div className="all-services__prices">
                              {service.prices.map((priceItem) => (
                                <div
                                  className="all-services__price"
                                  key={`${service.cardId}-${
                                    priceItem.label ?? "tarif"
                                  }-${priceItem.price}`}
                                >
                                  {priceItem.label && (
                                    <span className="all-services__price-label">
                                      {priceItem.label}
                                    </span>
                                  )}

                                  <span className="all-services__price-value">
                                    {priceItem.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {service.note && (
                            <p className="all-services__note">
                              {service.note}
                            </p>
                          )}

                          {service.externalRef?.url && (
                            <a
                              className="all-services__details-link"
                              href={service.externalRef.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {service.externalRef.label ?? "Voir en pratique"}
                            </a>
                          )}
                        </div>

                        <button
                          className="all-services__cta"
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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AllServices;