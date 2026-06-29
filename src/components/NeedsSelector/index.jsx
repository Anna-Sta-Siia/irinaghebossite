import "./index.css";


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

        <div className="needs__cloud">
  <button
    className="needs__button needs__button--energy"
    type="button"
    onClick={() => onSelect("energy")}
  >
    Retrouver de l'énergie
  </button>

  <button
    className="needs__button needs__button--body"
    type="button"
    onClick={() => onSelect("body")}
  >
    Me sentir mieux dans mon corps
  </button>

  <button
    className="needs__button needs__button--tension"
    type="button"
    onClick={() => onSelect("tension")}
  >
    Relâcher les tensions
  </button>

  <button
    className="needs__button needs__button--confidence"
    type="button"
    onClick={() => onSelect("confidence")}
  >
    Retrouver confiance
  </button>

  <button
    className="needs__button needs__button--support"
    type="button"
    onClick={() => onSelect("support")}
  >
    Être accompagné(e) dans mon évolution
  </button>

  <button
    className="needs__button needs__button--unknown"
    type="button"
    onClick={() => onSelect("unknown")}
  >
    Je ne sais pas encore
  </button>
</div>
      </div>
    </section>
  );
}

export default NeedSelector;