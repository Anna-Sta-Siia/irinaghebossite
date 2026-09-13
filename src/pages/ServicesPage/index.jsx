import {
  useEffect,
  useState,
} from "react";

import "./index.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServicesRail from "../../components/ServicesRail";
import Services from "../../components/Services";
import GiftCardMock from "../../components/GiftCardMock";
import ContextForm from "../../components/ContextForm";
import MonApproche from "../../components/MonApproche";
import ReviewsPanel from "../../components/ReviewsPanel";

function ServicesPage({
  need,
  onSelectNeed,
  onShowOffers,

  selection,
  onAddToSelection,
  onRemoveFromSelection,
  onClearSelection,
}) {
  const [isApproachOpen, setIsApproachOpen] =
    useState(false);

  const [isGiftCardOpen, setIsGiftCardOpen] =
    useState(false);

  const [isSelectionOpen, setIsSelectionOpen] =
    useState(false);

  const [isReviewsOpen, setIsReviewsOpen] =
    useState(false);

  const [formRequest, setFormRequest] =
    useState(null);

 const openSelection = () => {
  setIsReviewsOpen(false);
  setIsApproachOpen(false);
  setIsGiftCardOpen(false);
  setFormRequest(null);

  setIsSelectionOpen(true);
};;

  const closeSelection = () => {
    setIsSelectionOpen(false);
  };

  const toggleSelection = () => {
  setIsReviewsOpen(false);
  setIsApproachOpen(false);
  setIsGiftCardOpen(false);
  setFormRequest(null);

  setIsSelectionOpen(
    (currentValue) => !currentValue
  );
};

  const handleSelectionBlur = (event) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget
      )
    ) {
      closeSelection();
    }
  };

  const closeApproach = () => {
    setIsApproachOpen(false);
  };

  const closeGiftCard = () => {
    setIsGiftCardOpen(false);
  };

  const closeReviews = () => {
    setIsReviewsOpen(false);
  };

const toggleReviews = () => {
  setIsSelectionOpen(false);
  setIsApproachOpen(false);
  setIsGiftCardOpen(false);
  setFormRequest(null);

  setIsReviewsOpen(
    (currentValue) => !currentValue
  );
};

  const closeContextForm = () => {
    setFormRequest(null);
  };

  const closeMainOverlays = () => {
    closeApproach();
    closeGiftCard();
    closeSelection();
    closeReviews();
    closeContextForm();
  };

  const toggleApproach = () => {
    setIsGiftCardOpen(false);
    setIsSelectionOpen(false);
    setIsReviewsOpen(false);
    setFormRequest(null);

    setIsApproachOpen(
      (currentValue) => !currentValue
    );
  };

  const toggleGiftCard = () => {
    setIsApproachOpen(false);
    setIsSelectionOpen(false);
    setIsReviewsOpen(false);
    setFormRequest(null);

    setIsGiftCardOpen(
      (currentValue) => !currentValue
    );
  };

  const openContextForm = ({
    type = "contact",
    context = "",
  }) => {
    setIsApproachOpen(false);
    setIsGiftCardOpen(false);
    setIsSelectionOpen(false);
    setIsReviewsOpen(false);

    setFormRequest({
      type,
      context,
    });
  };

  const handleServiceCta = (service) => {
    const ctaLabel = String(
      service.cta ?? ""
    ).toLowerCase();

    /* ===========================
       CONTACT / PROPOSITION
    =========================== */

    if (
      ctaLabel.includes("contact") ||
      ctaLabel.includes("proposition") ||
      service.bookingEnabled === false
    ) {
      openContextForm({
        type:
          ctaLabel.includes("proposition")
            ? "proposal"
            : "contact",

        context: service.title,
      });

      return;
    }

    /* ===========================
       SERVICE RÉSERVABLE
    =========================== */

    onAddToSelection?.({
      type: "service",

      id: service.id,

      title: service.title,

      durationMinutes:
        service.durationMinutes ?? null,

      bookingDurations:
        service.bookingDurations ?? null,

      prices:
        service.prices ?? [],

      onlineAvailable:
        service.onlineAvailable ?? false,
    });

    setIsReviewsOpen(false);
setIsApproachOpen(false);
setIsGiftCardOpen(false);
setFormRequest(null);

setIsSelectionOpen(true);
  };

  const hasMainOverlay =
    isApproachOpen ||
    isGiftCardOpen ||
    Boolean(formRequest);

  useEffect(() => {
    if (!hasMainOverlay) {
      return undefined;
    }

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement.style.overflow =
      "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeApproach();
        closeGiftCard();
        closeContextForm();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [hasMainOverlay]);

  return (
    <div className="services-page">
      {/* ======================
          OVERLAYS / PANELS
      ====================== */}

      <MonApproche
        isOpen={isApproachOpen}
        onClose={closeApproach}
      />

      <ReviewsPanel
        isOpen={isReviewsOpen}
        onClose={closeReviews}
      />

      {isGiftCardOpen && (
        <div
          className="services-page__gift-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-gift-card-title"
        >
          <button
            className="services-page__gift-backdrop"
            type="button"
            onClick={closeGiftCard}
            aria-label="Fermer la carte cadeau"
          />

          <div className="services-page__gift-modal">
            <button
              className="services-page__gift-close"
              type="button"
              onClick={closeGiftCard}
              aria-label="Fermer"
            >
              ×
            </button>

            <h2
              className="services-page__gift-sr-title"
              id="services-gift-card-title"
            >
              Carte cadeau Pack Découverte
            </h2>

            <div className="services-page__gift-scroll-shell">
              <div className="services-page__gift-scroll">
                <GiftCardMock />
              </div>
            </div>
          </div>
        </div>
      )}

      {formRequest && (
        <ContextForm
          type={formRequest.type}
          context={formRequest.context}
          onClose={closeContextForm}
        />
      )}

      {/* ======================
          NAVIGATION DESKTOP
      ====================== */}

      <div className="services-page__desktop-navigation">
        <ServicesRail
          currentNeed={need}
          onSelectNeed={onSelectNeed}
          onShowOffers={onShowOffers}
          onShowApproach={toggleApproach}
          isApproachOpen={isApproachOpen}
          onShowGiftCard={toggleGiftCard}
          isGiftCardOpen={isGiftCardOpen}
          onOpenForm={openContextForm}
          onRailInteraction={closeMainOverlays}
        />
      </div>

      {/* ======================
          HEADER MOBILE
      ====================== */}

      <div className="services-page__mobile-header">
        <Header
          onSelectNeed={onSelectNeed}
          onShowOffers={onShowOffers}
          onShowApproach={toggleApproach}
          onShowGiftCard={toggleGiftCard}
        />
      </div>

      {/* ======================
          CONTENU PRINCIPAL
      ====================== */}

      <main className="services-page__main">
        <div className="services-page__appointment-top">
          <div className="services-page__top-actions">
            {/* ======================
                VOTRE SÉLECTION
            ====================== */}

            <div
              className="services-page__selection"
              onMouseEnter={openSelection}
              onMouseLeave={closeSelection}
              onFocusCapture={openSelection}
              onBlurCapture={handleSelectionBlur}
            >
              <button
                className={`services-page__top-button services-page__selection-trigger ${
                  isSelectionOpen
                    ? "services-page__selection-trigger--open"
                    : ""
                }`}
                type="button"
                onClick={toggleSelection}
                aria-expanded={isSelectionOpen}
                aria-controls="services-selection-panel"
              >
                <span>
                  Votre sélection

                  {selection.length > 0 && (
                    <span className="services-page__selection-count">
                      {selection.length}
                    </span>
                  )}
                </span>

                <span
                  className="services-page__selection-chevron"
                  aria-hidden="true"
                >
                  ⌃
                </span>
              </button>

              <div
                id="services-selection-panel"
                className={`services-page__selection-panel ${
                  isSelectionOpen
                    ? "services-page__selection-panel--open"
                    : ""
                }`}
                aria-hidden={!isSelectionOpen}
              >
                <div className="services-page__selection-panel-inner">
                  {selection.length === 0 ? (
                    <p className="services-page__selection-empty">
                      Votre sélection est encore vide.
                    </p>
                  ) : (
                    <>
                      <div className="services-page__selection-list">
                        {selection.map((item) => {
                          const firstPrice =
                            item.prices?.[0];

                          return (
                            <article
                              className="services-page__selection-item"
                              key={`${item.type}-${item.id}`}
                            >
                              <div className="services-page__selection-item-content">
                                <strong className="services-page__selection-item-title">
                                  {item.title}
                                </strong>

                                {item.bookingDurations?.length >
                                1 ? (
                                  <span className="services-page__selection-item-meta">
                                    Plusieurs formats disponibles
                                  </span>
                                ) : (
                                  <>
                                    {item.durationMinutes && (
                                      <span className="services-page__selection-item-meta">
                                        {
                                          item.durationMinutes
                                        }{" "}
                                        min
                                      </span>
                                    )}

                                    {firstPrice?.price && (
                                      <span className="services-page__selection-item-price">
                                        {
                                          firstPrice.price
                                        }
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>

                              <button
                                className="services-page__selection-remove"
                                type="button"
                                onClick={() =>
                                  onRemoveFromSelection?.(
                                    item.id,
                                    item.type
                                  )
                                }
                                aria-label={`Retirer ${item.title} de la sélection`}
                              >
                                ×
                              </button>
                            </article>
                          );
                        })}
                      </div>

                      <div className="services-page__selection-footer">
                        <button
                          className="services-page__selection-clear"
                          type="button"
                          onClick={onClearSelection}
                        >
                          Vider
                        </button>

                        <button
                          className="services-page__selection-finalize"
                          type="button"
                        >
                          Finaliser ma sélection
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ======================
                AVIS
            ====================== */}

            <button
              className="services-page__top-button"
              type="button"
              onClick={toggleReviews}
              aria-expanded={isReviewsOpen}
            >
              Ils ont déjà essayé…
            </button>

            {/* ======================
                TOUS LES ACCOMPAGNEMENTS
            ====================== */}

            {need !== "all" && (
              <button
                className="services-page__top-button"
                type="button"
                onClick={() =>
                  onSelectNeed?.("all")
                }
              >
                Découvrir tous les accompagnements
              </button>
            )}
          </div>
        </div>

        <Services
          need={need}
          onSelectNeed={onSelectNeed}
          onServiceCta={handleServiceCta}
        />
      </main>

      {/* ======================
          FOOTER MOBILE
      ====================== */}

      <div className="services-page__mobile-footer">
        <Footer />
      </div>
    </div>
  );
}

export default ServicesPage;