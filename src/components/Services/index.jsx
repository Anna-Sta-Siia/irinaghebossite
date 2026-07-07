import { dataServices } from "../../assets/data/dataServices";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

function Services({ need, onBack, onShowAllServices }) {
  const current = dataServices[need];

  if (!current) return null;

  return (
    <> <div className="services__air" aria-hidden="true">
        <div className="services__layer--first"></div>
        <div className="services__layer--second"></div>
        </div>
      <Header onBack={onBack} onShowAllServices={onShowAllServices} />
      <section className="services">
        <div className="services__content">
          <h2 className="services__title">{current.title}</h2>
          <div className="services__list">
            {current.services.map((service) => (
              <article className="services__card" key={service.title}>
                <h3 className="services__card-title">{service.title}</h3>

                <p className="services__card-description">
                  {service.description}
                </p>

                {service.items && (
                  <div className="services__items">
                    {service.items.map((item) => (
                      <div className="services__item" key={item.name}>
                        <span className="services__item-name">
                          {item.name}
                        </span>

                        <div className="services__item-prices">
                          {item.options
                            ? item.options.map((option) => (
                                <span
                                  className="services__item-price"
                                  key={`${item.name}-${option.label}`}
                                >
                                  {option.label} · {option.price}
                                </span>
                              ))
                            : item.price && (
                                <span className="services__item-price">
                                  {item.price}
                                </span>
                              )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!service.items && service.price && (
                  <div className="services__meta">
                    <span>{service.price}</span>
                  </div>
                )}

                <button className="services__cta" type="button">
                  {service.cta}
                </button>
              </article>
            ))}
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