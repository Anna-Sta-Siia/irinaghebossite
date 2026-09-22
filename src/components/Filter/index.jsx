import "./index.css";

function Filter({
  items = [],
  currentId,
  onSelect,
  allItem = null,
  ariaLabel = "Filtrer le contenu",
  className = "",
}) {
  const renderIcon = (item) => {
    if (item.icon) {
      return (
        <img
          className="filter__icon"
          src={item.icon}
          alt=""
          aria-hidden="true"
        />
      );
    }

    if (item.symbol) {
      return (
        <span
          className="filter__symbol"
          aria-hidden="true"
        >
          {item.symbol}
        </span>
      );
    }

    return null;
  };

  const renderItem = (item) => {
    const isActive =
      currentId === item.id;

    return (
      <button
        key={item.id}
        className={`filter__item ${
          isActive
            ? "filter__item--active"
            : ""
        }`}
        type="button"
        onClick={() =>
          onSelect?.(item.id)
        }
        aria-pressed={isActive}
      >
        {renderIcon(item)}

        <span className="filter__label">
          {item.title}
        </span>
      </button>
    );
  };

  return (
    <nav
      className={`filter ${className}`}
      aria-label={ariaLabel}
    >
      {allItem &&
        renderItem(allItem)}

      {items.map(renderItem)}
    </nav>
  );
}

export default Filter;