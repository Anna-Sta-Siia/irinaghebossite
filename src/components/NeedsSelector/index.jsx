import { useState } from "react";
import "./index.css";
import { selectorsData } from "../../assets/data/dataSelectors";

function NeedSelector({ onSelect }) {
  const [flippedIds, setFlippedIds] = useState(() => new Set());

  const handleFlip = (id) => {
    setFlippedIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }

      return nextIds;
    });
  };

  return (
    <section className="needs">
      <div className="needs__air" aria-hidden="true">
        <div className="needs__layer needs__layer--first"></div>
        <div className="needs__layer needs__layer--second"></div>
      </div>

      <div className="needs__content">
        <div className="needs__cloud">
          {selectorsData.map((selector, index) => {
            const isFlipped = flippedIds.has(selector.id);

            return (
              <article
                key={selector.id}
                className={`needs__path-card needs__path-card--${selector.id} ${
                  isFlipped ? "needs__path-card--flipped" : ""
                }`}
                style={{ "--card-index": index }}
              >
                <div className="needs__path-inner">
                  {/* FACE AVANT */}
                  <div
                    className="needs__face needs__face--front"
                    aria-hidden={isFlipped}
                  >
                    <div className="needs__front-content">
                      <img
                        className="needs__icon"
                        src={selector.icon}
                        alt=""
                        aria-hidden="true"
                      />

                      <button
                        type="button"
                        className="needs__discover"
                        onClick={() => handleFlip(selector.id)}
                        aria-expanded={isFlipped}
                        tabIndex={isFlipped ? -1 : 0}
                      >
                        {selector.flipCta}
                      </button>
                    </div>
                  </div>

                  {/* FACE ARRIÈRE */}
                  <div
                    className="needs__face needs__face--back"
                    aria-hidden={!isFlipped}
                  >
                    <div className="needs__back-content">
                      <h3 className="needs__title">
                        {selector.title}
                      </h3>

                      <span
                        className="needs__line"
                        aria-hidden="true"
                      ></span>

                      <div className="needs__actions">
                        <button
                          type="button"
                          className="needs__choose"
                          onClick={() => onSelect(selector.id)}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {selector.cta}
                        </button>

                        <button
                          type="button"
                          className="needs__back-button"
                          onClick={() => handleFlip(selector.id)}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {selector.backCta}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NeedSelector;