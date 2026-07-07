import { useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

function AllServices({ onBack }) {
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

  return (
    <>
      <Header onBack={onBack} onShowAllServices={() => {}} />

      <section className="all-services">
        
        <div className="all-services__content">
          <h2 className="all-services__title">
            Tous mes accompagnements
          </h2>

          <div className="all-services__intro">
            <p>Chaque accompagnement répond à un besoin différent</p>

            <p>
              Prenez le temps de parcourir ce qui vous parle aujourd’hui
            </p>
          </div>

          <div className="all-services__list">
            {allServices.map((service, index) => {
              const isFlipped = flippedCards.has(service.cardId);

              return (
                <article
                  className={`all-services__card ${
                    isFlipped ? "all-services__card--flipped" : ""
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

                      <p className="all-services__card-description">
                        {service.description}
                      </p>

                      <div className="all-services__front-actions">
                        <button
                          className="all-services__cta"
                          type="button"
                        >
                          {service.cta}
                        </button>

                        <button
                          className="all-services__flip-cta"
                          type="button"
                          onClick={() => toggleCard(service.cardId)}
                          aria-expanded={isFlipped}
                          aria-controls={`all-service-back-${service.cardId}`}
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
                              <span className="all-services__item-name">
                                {item.name}
                              </span>

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
                        >
                          {service.backCta ?? "Revenir"}
                        </button>

                        <button
                          className="all-services__cta"
                          type="button"
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