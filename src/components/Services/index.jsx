import { useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

function Services({ need, onBack, onShowAllServices }) {
  const [flippedCardsByNeed, setFlippedCardsByNeed] = useState({});
  const [openedOverlaysByNeed, setOpenedOverlaysByNeed] = useState({});

  const current = dataServices[need];

  if (!current) {
    return null;
  }

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

  return (
    <>
      <Header
        onBack={onBack}
        onShowAllServices={onShowAllServices}
      />

      <section className="services">
        {hasOpenedOverlay && (
          <button
            className="services__overlay-page-backdrop"
            type="button"
            onClick={closeAllOverlays}
            aria-label="Fermer les détails"
          ></button>
        )}

        <div className="services__content">
          <h2 className="services__title">{current.title}</h2>

          {current.intro && (
            <p className="services__intro">{current.intro}</p>
          )}

          <div className="services__list">
            {current.services.map((service, index) => {
              const isFlipped = flippedCards.has(service.id);
              const isOverlayOpen = openedOverlays.has(service.id);

              return (
                <article
                  className={`services__card ${
                    isFlipped ? "services__card--flipped" : ""
                  } ${
                    isOverlayOpen ? "services__card--overlay-open" : ""
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
                          onClick={() => toggleCard(service.id)}
                          aria-expanded={isFlipped}
                          aria-controls={`service-back-${service.id}`}
                          tabIndex={isFlipped ? -1 : 0}
                        >
                          {service.flipCta ?? "En savoir plus"}
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
                          onClick={() => toggleOverlay(service.id)}
                          aria-expanded={isOverlayOpen}
                          aria-controls={`service-overlay-${service.id}`}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {service.detailsCta ?? "Voir les détails"}
                        </button>

                        <button
                          className="services__back-cta"
                          type="button"
                          onClick={() => toggleCard(service.id)}
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
  onClick={() => closeOverlay(service.id)}
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
      {service.prices.map((priceItem) => (
        <div
          className="services__price"
          key={`${service.id}-${priceItem.label ?? "tarif"}-${priceItem.price}`}
        >
          {priceItem.label && (
            <span className="services__price-label">
              {priceItem.label}
            </span>
          )}

          <span className="services__price-value">
            {priceItem.price}
          </span>
        </div>
      ))}
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
      href={service.externalRef.url}
      target="_blank"
      rel="noreferrer"
    >
      {service.externalRef.label ?? "Voir en pratique"}
    </a>
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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;