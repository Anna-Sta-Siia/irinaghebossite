function OfferCard({
  item,
  itemKey,
  index = 0,

  showSectionTitle = false,

  isFlipped = false,
  isOverlayOpen = false,

  onFlip,
  onToggleDetails,
  onCloseDetails,
  onCta,
}) {
  return (
    <article
      className={`services__card ${
        isFlipped
          ? "services__card--flipped"
          : ""
      } ${
        isOverlayOpen
          ? "services__card--overlay-open"
          : ""
      }`}
      style={{
        "--service-index": index,
      }}
    >
      <div className="services__card-inner">
        {/* ===========================
            FACE AVANT
        =========================== */}

        <div
          className="services__card-face services__card-front"
          aria-hidden={isFlipped}
        >
          {showSectionTitle &&
            item.sectionTitle && (
              <span className="services__card-section">
                {item.sectionTitle}
              </span>
            )}

          <h3 className="services__card-title">
            {item.title}
          </h3>

          <div className="services__actions">
            <button
              className="services__flip-cta"
              type="button"
              onClick={() =>
                onFlip?.(itemKey)
              }
              aria-expanded={isFlipped}
              aria-controls={`offer-card-back-${itemKey}`}
              tabIndex={
                isFlipped ? -1 : 0
              }
            >
              {item.flipCta ??
                "En savoir plus"}
            </button>

            <button
              className="services__cta"
              type="button"
              onClick={() =>
                onCta?.(item)
              }
              tabIndex={
                isFlipped ? -1 : 0
              }
            >
              {item.cta}
            </button>
          </div>
        </div>

        {/* ===========================
            FACE ARRIÈRE
        =========================== */}

        <div
          className="services__card-face services__card-back"
          id={`offer-card-back-${itemKey}`}
          aria-hidden={!isFlipped}
        >
          <p className="services__card-description">
            {item.description}
          </p>

          <div className="services__actions">
            <button
              className="services__details-cta"
              type="button"
              onClick={() =>
                onToggleDetails?.(
                  itemKey
                )
              }
              aria-expanded={
                isOverlayOpen
              }
              aria-controls={`offer-card-overlay-${itemKey}`}
              tabIndex={
                isFlipped ? 0 : -1
              }
            >
              {item.detailsCta ??
                "Voir les détails"}
            </button>

            <button
              className="services__back-cta"
              type="button"
              onClick={() =>
                onFlip?.(itemKey)
              }
              tabIndex={
                isFlipped ? 0 : -1
              }
            >
              {item.backCta ??
                "Revenir"}
            </button>
          </div>
        </div>
      </div>

      {/* ===========================
          DETAILS OVERLAY
      =========================== */}

      {isOverlayOpen && (
        <div
          className="services__card-overlay"
          id={`offer-card-overlay-${itemKey}`}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`offer-card-overlay-title-${itemKey}`}
        >
          <div className="services__card-overlay-panel">
            <button
              className="services__overlay-close"
              type="button"
              onClick={() =>
                onCloseDetails?.(
                  itemKey
                )
              }
              aria-label="Fermer les détails"
            >
              ×
            </button>

            <h3
              className="services__overlay-title"
              id={`offer-card-overlay-title-${itemKey}`}
            >
              {item.title}
            </h3>

            <div className="services__overlay-scroll">
              {item.items &&
                item.items.length >
                  0 && (
                  <div className="services__items">
                    {item.items.map(
                      (detailItem) => (
                        <div
                          className="services__item"
                          key={
                            detailItem.name
                          }
                        >
                          <span className="services__item-name">
                            {
                              detailItem.name
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

              {item.prices &&
                item.prices.length >
                  0 && (
                  <div className="services__prices">
                    {item.prices.map(
                      (
                        priceItem,
                        priceIndex
                      ) => (
                        <div
                          className="services__price"
                          key={`${itemKey}-${priceItem.label ?? "tarif"}-${priceItem.price ?? priceIndex}`}
                        >
                          {priceItem.label && (
                            <span className="services__price-label">
                              {
                                priceItem.label
                              }
                            </span>
                          )}

                          {priceItem.price && (
                            <span className="services__price-value">
                              {
                                priceItem.price
                              }
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}

              {item.note && (
                <p className="services__note">
                  {item.note}
                </p>
              )}

              {item.externalRef
                ?.url && (
                <a
                  className="services__details-link"
                  href={
                    item.externalRef
                      .url
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.externalRef
                    .label ??
                    "Voir en pratique"}
                </a>
              )}
            </div>

            <button
              className="services__cta"
              type="button"
              onClick={() =>
                onCta?.(item)
              }
            >
              {item.cta}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default OfferCard;