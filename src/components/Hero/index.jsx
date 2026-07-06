import "./index.css";

function Hero({ onDiscover }) {
  return (
    <section className="hero">
      <div className="hero__air" aria-hidden="true">
        <div className="hero__layer hero__layer--blue"></div>
        <div className="hero__layer hero__layer--ivory"></div>
      </div>

      <div className="hero__content">
        <div className="hero__intro">
        <p className="hero__intro_first">
  Je sais d&apos;où je viens
</p>

<p className="hero__intro_second">
  Je sais ce que j&apos;ai traversé
</p>

<p className="hero__intro_third">
  Je sais où je veux aller
</p>
</div>
<div className="hero__title">
 <p className="hero__title_first">
  Et vous,
  </p>
  <p className="hero__title_second">
  vers où avez-vous envie d&apos;avancer aujourd&apos;hui ?
</p>
</div>
      </div>
      <div className="hero__button">
      <button type="button" onClick={onDiscover}>
        <span className="hero__button-text">Je commence</span>
      </button>
      </div>
    </section>
  );
}

export default Hero;