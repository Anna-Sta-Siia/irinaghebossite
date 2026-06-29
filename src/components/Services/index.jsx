import { servicesData } from "../../assets/data/servicesData";
import "./index.css";

function Services({ need }) {
  const current = servicesData[need];

  if (!current) return null;

  return (
    <section className="services">
      <div className="services__content">
        <p className="services__eyebrow">Accompagnement</p>

        <h2 className="services__title">{current.title}</h2>

        <p className="services__intro">{current.intro}</p>

        <div className="services__list">
          {current.services.map((service) => (
            <article className="services__card" key={service.title}>
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="services__meta">
                <span>{service.duration}</span>
                <span>{service.price}</span>
              </div>

              <button className="services__cta" type="button">
                {service.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;