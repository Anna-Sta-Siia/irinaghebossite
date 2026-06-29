import "./index.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__air" aria-hidden="true">
        <div className="hero__layer hero__layer--blue"></div>
        <div className="hero__layer hero__layer--ivory"></div>
      </div>

      <div className="hero__content">
        <p className="hero__intro">
          Et si vous preniez un instant pour vous ?
        </p>

        <h1 className="hero__title">
          De quoi auriez-vous besoin aujourd&apos;hui ?
        </h1>
      </div>

      <button className="hero__button" type="button">
  <span className="hero__button-text">Je découvre</span>
</button>
    </section>
  );
}

export default Hero;