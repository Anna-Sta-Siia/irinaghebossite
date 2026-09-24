import {
  partnershipApproach,
} from "../../assets/data/dataPartnerships";

import "./index.css";


function PartnershipApproachView({
  onContact,
}) {
  const {
    eyebrow,
    title,
    intro,
    paragraphs = [],
    steps = [],
    closing,
    cta,
  } = partnershipApproach;


  return (
    <section className="partnership-approach-view">

      <div className="partnership-approach-view__scroll">

        {/* ===========================
            HEADER
        =========================== */}

        <header className="partnership-approach-view__header">

          {eyebrow && (
            <p className="partnership-approach-view__eyebrow">
              {eyebrow}
            </p>
          )}


          <h2
            className="partnership-approach-view__title"
            id="partnership-approach-title"
          >
            {title}
          </h2>


          {intro && (
            <p className="partnership-approach-view__intro">
              {intro}
            </p>
          )}

        </header>


        {/* ===========================
            INTRODUCTION
        =========================== */}

        {paragraphs.length > 0 && (
          <div className="partnership-approach-view__intro-text">

            {paragraphs.map(
              (
                paragraph,
                index
              ) => (
                <p
                  key={`partnership-paragraph-${index}`}
                >
                  {paragraph}
                </p>
              )
            )}

          </div>
        )}


        {/* ===========================
            STEPS
        =========================== */}

        {steps.length > 0 && (
          <div className="partnership-approach-view__steps">

            {steps.map(
              (step) => (
                <article
                  className="partnership-approach-view__step"
                  key={step.id}
                >
                  <span className="partnership-approach-view__step-number">
                    {step.number}
                  </span>


                  <div className="partnership-approach-view__step-content">

                    <h3 className="partnership-approach-view__step-title">
                      {step.title}
                    </h3>


                    <p className="partnership-approach-view__step-text">
                      {step.text}
                    </p>

                  </div>
                </article>
              )
            )}

          </div>
        )}


        {/* ===========================
            CLOSING
        =========================== */}

        {closing && (
          <blockquote className="partnership-approach-view__closing">
            {closing}
          </blockquote>
        )}


        {/* ===========================
            CTA
        =========================== */}

        {cta && (
          <div className="partnership-approach-view__actions">

            <button
              className="partnership-approach-view__cta"
              type="button"
              onClick={
                onContact
              }
            >
              {cta}
            </button>

          </div>
        )}

      </div>
    </section>
  );
}


export default PartnershipApproachView;