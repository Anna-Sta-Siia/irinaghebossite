import { useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import { selectorsData } from "../../assets/data/dataSelectors";

import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

function AllServices({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [flippedCards, setFlippedCards] = useState(() => new Set());

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

  const filterIds = [
    "performance",
    "liberte",
    "equilibre",
    "rayonnement",
  ];

  const filters = [
    {
      id: "all",
      label: "Tous",
      icon: null,
    },

    ...selectorsData
      .filter((selector) => filterIds.includes(selector.id))
      .map((selector) => ({
        id: selector.id,
        label:
          selector.id === "performance"
            ? "Performance"
            : selector.id === "liberte"
              ? "Liberté"
              : selector.id === "equilibre"
                ? "Équilibre"
                : "Rayonnement",
        icon: selector.icon,
      })),
  ];

  const filteredServices =
    activeFilter === "all"
      ? allServices
      : allServices.filter(
          (service) => service.sectionId === activeFilter
        );

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

  const selectFilter = (filterId) => {
    setActiveFilter(filterId);

    /*
     * Lors du changement de filtre,
     * toutes les cartes reviennent sur leur face avant.
     */
    setFlippedCards(new Set());
  };

  return (
    <>
      <Header
        onBack={onBack}
        onShowAllServices={() => {}}
      />

      <section className="all-services">
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
                    isActive
                      ? "all-services__filter--active"
                      : ""
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

              return (
                <article
                  className={`all-services__card ${
                    isFlipped
                      ? "all-services__card--flipped"
                      : ""
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
                   
                      <h3 className="all-services__card-title">
                        {service.title}
                      </h3>

                      <p className="all-services__card-description">
                        {service.description}
                      </p>

                      <div className="all-services__front-actions">
                        <button
                          className="all-services__cta"
                          type="button"
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.cta}
                        </button>

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
                      </div>
                    </div>

                    {/* FACE ARRIÈRE */}

                    <div
                      className="all-services__card-face all-services__card-back"
                      id={`all-service-back-${service.cardId}`}
                      aria-hidden={!isFlipped}
                    >
                      <h3 className="all-services__card-title">
                        {service.title}
                      </h3>

                     {service.items?.length ? (
  <div className="all-services__items">
    {service.items.map((item) => (
      <div
        className="all-services__item"
        key={item.name}
      >
        <div className="all-services__item-heading">
          <span className="all-services__item-name">
            {item.name}
          </span>

          {item.detailsUrl && (
            <a
              className="all-services__details-link"
              href={item.detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Découvrir plus de détails sur ${item.name}`}
            >
              <span
                className="all-services__details-tooltip"
                aria-hidden="true"
              >
                Découvrir plus de détails
              </span>

              <span
                className="all-services__details-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          )}
        </div>

        {item.options?.length ? (
          <div className="all-services__prices">
            {item.options.map((option) => (
              <span
                className="all-services__item-price"
                key={`${item.name}-${option.label}-${option.price}`}
              >
                {option.label} · {option.price}
              </span>
            ))}
          </div>
        ) : (
          item.price && (
            <span className="all-services__item-price">
              {item.price}
            </span>
          )
        )}
      </div>
    ))}
  </div>
) : (
  service.price && (
    <p className="all-services__price">
      {service.price}
    </p>
  )
)}

                      {service.items?.length && service.price && (
                        <p className="all-services__price">
                          {service.price}
                        </p>
                      )}

                      <div className="all-services__actions">
                        <button
                          className="all-services__back-cta"
                          type="button"
                          onClick={() => toggleCard(service.cardId)}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.backCta ?? "Revenir"}
                        </button>

                        <button
                          className="all-services__cta"
                          type="button"
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.cta}
                        </button>
                      </div>
                    </div>
                  </div>
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