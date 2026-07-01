import { servicesData } from "../../assets/data/servicesData";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

function AllServices({ onBack }) {
  const allServices = Object.values(servicesData).flatMap((section) =>
    section.services.map((service) => ({
      ...service,
      sectionTitle: section.title,
    }))
  );

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

          <p className="all-services__intro">
            Chaque accompagnement répond à un besoin différent. 
          </p>
          <p className="all-services__intro">
             Prenez le temps
            de parcourir ce qui vous parle aujourd’hui.
          </p>

          <div className="all-services__grid">
            {allServices.map((service, index) => (
              <article
                className="all-services__card"
                key={`${service.sectionTitle}-${service.title}`}
                style={{ "--card-index": index }}
              >
              
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                {service.items ? (
                  <div className="all-services__items">
                    {service.items.map((item) => (
                      <div className="all-services__item" key={item.name}>
                        <span>{item.name}</span>

                        <div className="all-services__prices">
                          {item.options ? (
                            item.options.map((option) => (
                              <span key={`${option.label}-${option.price}`}>
                                {option.label} · {option.price}
                              </span>
                            ))
                          ) : (
                            <span>{item.price}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="all-services__price">{service.price}</p>
                )}

                <button className="all-services__cta" type="button">
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

export default AllServices;