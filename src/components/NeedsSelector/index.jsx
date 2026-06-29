import "./index.css";

const needs = [
  "Retrouver de l’énergie",
  "Me sentir mieux dans mon corps",
  "Relâcher les tensions",
  "Retrouver confiance",
  "Être accompagné(e) dans mon évolution",
  "Je ne sais pas encore",
];

function NeedSelector() {
  return (
    <section className="needs">
      <div className="needs__content">
        <p className="needs__intro">Aujourd’hui,</p>

        <h2 className="needs__title">j’aimerais...</h2>

        <ul className="needs__list">
          {needs.map((need, index) => (
            <li
              className="needs__item"
              key={need}
              style={{ "--item-index": index }}
            >
              <button className="needs__button" type="button">
                {need}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default NeedSelector;