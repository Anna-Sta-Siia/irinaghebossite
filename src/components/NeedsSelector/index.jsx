import "./index.css";

const needs = [
  { id: "energy", label: "Retrouver de l’énergie" },
  { id: "body", label: "Me sentir mieux dans mon corps" },
  { id: "tension", label: "Relâcher les tensions" },
  { id: "confidence", label: "Retrouver confiance" },
  { id: "support", label: "Être accompagné(e) dans mon évolution" },
  { id: "unknown", label: "Je ne sais pas encore" },
];

function NeedSelector({ onSelect}) {
  return (
    <section className="needs">
        <div className="needs__air" aria-hidden="true">
        <div className="needs__layer hero__layer--blue"></div>
        <div className="needs__layer hero__layer--ivory"></div>
      </div>
      <div className="needs__content">
        <p className="needs__intro">Aujourd’hui,</p>

        <h2 className="needs__title">j’aimerais...</h2>

        <ul className="needs__list">
          {needs.map((need, index) => (
  <li
    className="needs__item"
    key={need.id}
    style={{ "--item-index": index }}
  >
    <button
      className="needs__button"
      type="button"
      onClick={() => onSelect(need.id)}
    >
      {need.label}
    </button>
  </li>
))}
        
        </ul>
      </div>
    </section>
  );
}

export default NeedSelector;