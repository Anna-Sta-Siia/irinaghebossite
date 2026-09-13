import { useRef } from "react";

import "./index.css";

import { reviews } from "../../assets/data/reviews";

function ReviewsPanel({
  isOpen,
  onClose,
  onViewService,
}) {
  const trackRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  const scrollCarousel = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard =
      track.querySelector(
        ".reviews-panel__card"
      );

    if (!firstCard) {
      return;
    }

    const styles =
      window.getComputedStyle(track);

    const gap =
      parseFloat(styles.columnGap) ||
      parseFloat(styles.gap) ||
      0;

    const cardWidth =
      firstCard.getBoundingClientRect()
        .width;

    const distance =
      cardWidth + gap;

    const maxScroll =
      track.scrollWidth -
      track.clientWidth;

    let nextPosition;

    if (direction === "next") {
      if (
        track.scrollLeft >=
        maxScroll - 5
      ) {
        nextPosition = 0;
      } else {
        nextPosition = Math.min(
          track.scrollLeft +
            distance,
          maxScroll
        );
      }
    } else {
      if (track.scrollLeft <= 5) {
        nextPosition =
          maxScroll;
      } else {
        nextPosition = Math.max(
          track.scrollLeft -
            distance,
          0
        );
      }
    }

    track.scrollTo({
      left: nextPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="reviews-panel-layer">
      {/* =========================
          CLICK À L'EXTÉRIEUR
      ========================= */}

      <button
        className="reviews-panel__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Fermer les avis"
      />

      {/* =========================
          PANEL
      ========================= */}

      <aside
        className="reviews-panel"
        aria-label="Avis clients"
      >
        <div className="reviews-panel__header">
          <div>
            <p className="reviews-panel__eyebrow">
              Ils ont déjà essayé
            </p>

            <h2 className="reviews-panel__title">
              Quelques mots
            </h2>
          </div>

          <button
            className="reviews-panel__close"
            type="button"
            onClick={onClose}
            aria-label="Fermer les avis"
          >
            ×
          </button>
        </div>

        <div className="reviews-panel__carousel">
          <button
            className="reviews-panel__arrow reviews-panel__arrow--prev"
            type="button"
            onClick={() =>
              scrollCarousel("prev")
            }
            aria-label="Avis précédents"
          >
            ‹
          </button>

          <div
            className="reviews-panel__track"
            ref={trackRef}
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="reviews-panel__card"
              >
                <p className="reviews-panel__card-label">
                  Quelques mots
                </p>

                <blockquote className="reviews-panel__quote">
                  “{review.fullText}”
                </blockquote>

                {review.author && (
                  <p className="reviews-panel__author">
                    — {review.author}
                  </p>
                )}

                <div className="reviews-panel__card-footer">
                  {review.serviceLabel && (
                    <p className="reviews-panel__service">
                      {review.serviceLabel}
                    </p>
                  )}

                  {review.serviceId &&
                    review.needId && (
                      <button
                        className="reviews-panel__service-link"
                        type="button"
                        onClick={() =>
                          onViewService?.(
                            review
                          )
                        }
                      >
                        Voir l’accompagnement
                        <span
                          aria-hidden="true"
                          className="reviews-panel__service-link-arrow"
                        >
                          →
                        </span>
                      </button>
                    )}
                </div>
              </article>
            ))}
          </div>

          <button
            className="reviews-panel__arrow reviews-panel__arrow--next"
            type="button"
            onClick={() =>
              scrollCarousel("next")
            }
            aria-label="Avis suivants"
          >
            ›
          </button>
        </div>
      </aside>
    </div>
  );
}

export default ReviewsPanel;