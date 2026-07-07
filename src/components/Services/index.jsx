 import { useState } from "react";
import { dataServices } from "../../assets/data/dataServices";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

function Services({ need, onBack, onShowAllServices }) {
  /*
   * Pour chaque parcours, on conserve un Set contenant
   * les identifiants des cartes actuellement retournées.
   *
   * Exemple :
   * {
   *   performance: Set(["accompagnement-sportif", "boxe"]),
   *   liberte: Set(["techniques-corporelles"])
   * }
   */
  const [flippedCardsByNeed, setFlippedCardsByNeed] = useState({});

  const current = dataServices[need];

  if (!current) {
    return null;
  }

  const flippedCards = flippedCardsByNeed[need] ?? new Set();

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

  return (
    <>
      <Header
        onBack={onBack}
        onShowAllServices={onShowAllServices}
      />
      <section className="services">
        <div className="services__content">
          <h2 className="services__title">{current.title}</h2>

          {current.intro && (
            <p className="services__intro">{current.intro}</p>
          )}

          <div className="services__list">
            {current.services.map((service) => {
              const isFlipped = flippedCards.has(service.id);

              return (
                <article
                  className={`services__card ${
                    isFlipped ? "services__card--flipped" : ""
                  }`}
                  key={service.id}
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

                      <p className="services__card-description">
                        {service.description}
                      </p>

                      <div className="services__actions">
                        <button
                          className="services__cta"
                          type="button"
                        >
                          {service.cta}
                        </button>

                        <button
                          className="services__flip-cta"
                          type="button"
                          onClick={() => toggleCard(service.id)}
                          aria-expanded={isFlipped}
                          aria-controls={`service-back-${service.id}`}
                        >
                          {service.flipCta ?? "En savoir plus"}
                        </button>
                      </div>
                    </div>

                    {/* FACE ARRIÈRE */}
                    <div
                      className="services__card-face services__card-back"
                      id={`service-back-${service.id}`}
                      aria-hidden={!isFlipped}
                    >

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

                              {item.options ? (
                                <div className="services__item-prices">
                                  {item.options.map((option) => (
                                    <span
                                      className="services__item-price"
                                      key={`${item.name}-${option.label}-${option.price}`}
                                    >
                                      {option.label} · {option.price}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                item.price && (
                                  <span className="services__item-price">
                                    {item.price}
                                  </span>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {service.price && (
                        <div className="services__meta">
                          <span>{service.price}</span>
                        </div>
                      )}

                      <div className="services__actions">
                        <button
                          className="services__back-cta"
                          type="button"
                          onClick={() => toggleCard(service.id)}
                        >
                          {service.backCta ?? "Revenir"}
                        </button>

                        <button
                          className="services__cta"
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