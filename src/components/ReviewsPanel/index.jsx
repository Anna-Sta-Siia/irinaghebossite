import { useRef } from "react";

import "./index.css";

import { reviews } from "../../assets/data/reviews";

function ReviewsPanel({
  isOpen,
  onClose,
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
      /*
        Si on arrive à la fin,
        on revient au début.
      */
      if (
        track.scrollLeft >=
        maxScroll - 5
      ) {
        nextPosition = 0;
      } else {
        nextPosition =
          Math.min(
            track.scrollLeft +
              distance,
            maxScroll
          );
      }
    } else {
      /*
        Si on est au début,
        on repart de la fin.
      */
      if (track.scrollLeft <= 5) {
        nextPosition =
          maxScroll;
      } else {
        nextPosition =
          Math.max(
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

              {review.serviceLabel && (
                <p className="reviews-panel__service">
                  {review.serviceLabel}
                </p>
              )}
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
  );
}

export default ReviewsPanel;