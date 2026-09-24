import {
  useRef,
} from "react";

import "./index.css";

import {
  reviews,
} from "../../assets/data/dataReviews";


function ReviewsView({
  onViewService,
}) {
  const trackRef =
    useRef(null);


  const scrollCarousel = (
    direction
  ) => {
    const track =
      trackRef.current;

    if (!track) {
      return;
    }


    const firstCard =
      track.querySelector(
        ".reviews-view__card"
      );

    if (!firstCard) {
      return;
    }


    const styles =
      window.getComputedStyle(
        track
      );


    const gap =
      parseFloat(
        styles.columnGap
      ) ||
      parseFloat(
        styles.gap
      ) ||
      0;


    const cardWidth =
      firstCard
        .getBoundingClientRect()
        .width;


    const distance =
      cardWidth + gap;


    const maxScroll =
      track.scrollWidth -
      track.clientWidth;


    let nextPosition;


    if (
      direction === "next"
    ) {
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
      if (
        track.scrollLeft <= 5
      ) {
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
    <section
      className="reviews-view"
      aria-labelledby="reviews-view-title"
    >
      {/* ===========================
          HEADER
      =========================== */}

      <header className="reviews-view__header">
        <p className="reviews-view__eyebrow">
          Ils ont déjà essayé
        </p>

        <h2
          className="reviews-view__title"
          id="reviews-view-title"
        >
          Quelques mots
        </h2>

        <p className="reviews-view__intro">
          Des expériences partagées
          après un accompagnement
          avec Irina.
        </p>
      </header>


      {/* ===========================
          CAROUSEL
      =========================== */}

      <div className="reviews-view__carousel">

        <button
          className="
            reviews-view__arrow
            reviews-view__arrow--prev
          "
          type="button"
          onClick={() =>
            scrollCarousel(
              "prev"
            )
          }
          aria-label="Avis précédents"
        >
          ‹
        </button>


        <div
          className="reviews-view__track"
          ref={trackRef}
        >
          {reviews.map(
            (review) => (
              <article
                key={
                  review.id
                }
                className="reviews-view__card"
              >
                <p className="reviews-view__card-label">
                  Quelques mots
                </p>


                <blockquote className="reviews-view__quote">
                  “
                  {
                    review.fullText
                  }
                  ”
                </blockquote>


                {review.author && (
                  <p className="reviews-view__author">
                    —{" "}
                    {
                      review.author
                    }
                  </p>
                )}


                <div className="reviews-view__card-footer">

                  {review.serviceLabel && (
                    <p className="reviews-view__service">
                      {
                        review.serviceLabel
                      }
                    </p>
                  )}


                  {review.serviceId &&
                    review.needId && (
                      <button
                        className="reviews-view__service-link"
                        type="button"
                        onClick={() =>
                          onViewService?.(
                            review
                          )
                        }
                      >
                        Voir
                        l’accompagnement

                        <span
                          className="reviews-view__service-link-arrow"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    )}
                </div>
              </article>
            )
          )}
        </div>


        <button
          className="
            reviews-view__arrow
            reviews-view__arrow--next
          "
          type="button"
          onClick={() =>
            scrollCarousel(
              "next"
            )
          }
          aria-label="Avis suivants"
        >
          ›
        </button>
      </div>
    </section>
  );
}


export default ReviewsView;