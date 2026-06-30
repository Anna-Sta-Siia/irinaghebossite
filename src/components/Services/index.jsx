import { servicesData } from "../../assets/data/servicesData";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

function Services({ need, onBack }) {
  const current = servicesData[need];

  if (!current) return null;

  return (
    <>
      <Header onBack={onBack} />

      <section className="services">
        <div className="services__content">
          <h2 className="services__title">{current.title}</h2>

          <p className="services__intro">{current.intro}</p>

          <div className="services__list">
            {current.services.map((service) => (
              <article className="services__card" key={service.title}>
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                {service.items ? (
                  <div className="services__items">
                    {service.items.map((item) => (
                      <div className="services__item" key={item.name}>
                        <span className="services__item-name">
                          {item.name}
                        </span>

                        <div className="services__item-prices">
                          {item.options ? (
                            item.options.map((option) => (
                              <span
                                className="services__item-price"
                                key={`${option.label}-${option.price}`}
                              >
                                {option.label} · {option.price}
                              </span>
                            ))
                          ) : (
                            <span className="services__item-price">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;