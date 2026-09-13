import "./index.css";

import { selectorsData } from "../../assets/data/dataSelectors";

function ServicesFilters({
  currentNeed,
  onSelectNeed,
}) {
  return (
    <nav
      className="services-filters"
      aria-label="Filtrer les accompagnements"
    >
      <button
        className={`services-filters__item ${
          currentNeed === "all"
            ? "services-filters__item--active"
            : ""
        }`}
        type="button"
        onClick={() => onSelectNeed?.("all")}
      >
        <span className="services-filters__all-icon">
          ✦
        </span>

        <span>
          Tous
        </span>
      </button>

      {selectorsData.map((selector) => (
        <button
          key={selector.id}
          className={`services-filters__item ${
            currentNeed === selector.id
              ? "services-filters__item--active"
              : ""
          }`}
          type="button"
          onClick={() =>
            onSelectNeed?.(selector.id)
          }
        >
          <img
            className="services-filters__icon"
            src={selector.icon}
            alt=""
            aria-hidden="true"
          />

          <span>
            {selector.title}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default ServicesFilters;