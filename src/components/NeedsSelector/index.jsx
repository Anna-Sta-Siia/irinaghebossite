import "./index.css";
import { selectorsData } from "../../assets/data/dataSelectors";

function NeedSelector({ onSelect }) {
  return (
    <section className="needs">
      <div className="needs__air" aria-hidden="true">
        <div className="needs__layer--first"></div>
        <div className="needs__layer--second"></div>
      </div>

      <div className="needs__content">
       
        <div className="needs__cloud">
          {selectorsData.map((selector) => (
            <button
              key={selector.id}
              className={`needs__button needs__button--${selector.id}`}
              type="button"
              onClick={() => onSelect(selector.id)}
            >
              <img
                className="needs__icon"
                src={selector.icon}
                alt=""
                aria-hidden="true"
              />

              <div className="needs__text">
                <h3 className="needs__button-title">
                  {selector.title}
                </h3>

                <p className="needs__button-description">
                  {selector.precisions}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NeedSelector;