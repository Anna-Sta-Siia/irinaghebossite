import "./index.css";

import smallLogo
  from "../../assets/images/logosmall.png";

import irinaApproach
  from "../../assets/images/irina-approach.png";

import {
  bioData,
} from "../../assets/data/dataBio";


function BioView() {
  return (
    <section
      className="bio-view"
      aria-labelledby="bio-view-title"
    >
      {/* ===========================
          CONTENU
      =========================== */}

      <div className="bio-view__copy">

        <img
          className="bio-view__mini-logo"
          src={smallLogo}
          alt=""
          aria-hidden="true"
        />


        <p
          className="bio-view__greeting"
          id="bio-view-title"
        >
          {bioData.greeting}
        </p>


        <div className="bio-view__intro">
          {bioData.paragraphs.map(
            (
              paragraph,
              index
            ) => (
              <p
                key={`${index}-${paragraph}`}
              >
                {paragraph}
              </p>
            )
          )}
        </div>


        {/* ===========================
            PRINCIPES
        =========================== */}

        {bioData.principles?.length >
          0 && (
          <div className="bio-view__principles">

            <p className="bio-view__principles-eyebrow">
              {
                bioData.principlesEyebrow
              }
            </p>


            <h3 className="bio-view__principles-title">
              {
                bioData.principlesTitle
              }
            </h3>


            <ul className="bio-view__principles-list">
              {bioData.principles.map(
                (
                  principle,
                  index
                ) => (
                  <li
                    className="bio-view__principle"
                    key={
                      principle.id
                    }
                  >
                    <span
                      className="bio-view__principle-number"
                      aria-hidden="true"
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="bio-view__principle-title">
                      {
                        principle.title
                      }
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}


        {/* ===========================
            SIGNATURE
        =========================== */}

        {bioData.quote && (
          <p className="bio-view__quote">
            {bioData.quote}
          </p>
        )}


        <p className="bio-view__kicker">
          {bioData.signature}
        </p>
      </div>


      {/* ===========================
          PHOTO
      =========================== */}

      <div className="bio-view__photo-wrap">
        <img
          className="bio-view__photo"
          src={irinaApproach}
          alt={bioData.photoAlt}
        />
      </div>
    </section>
  );
}


export default BioView;