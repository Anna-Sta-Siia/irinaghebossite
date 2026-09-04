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

  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const openSelection = () => {
    setIsSelectionOpen(true);
  };

  const closeSelection = () => {
    setIsSelectionOpen(false);
  };

  const toggleSelection = () => {
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

    if (
      ctaLabel.includes(
        "proposition"
      )
    ) {
      openContextForm({
        type: "proposal",
        context: service.title,
      });

      return;
    }

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
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
                  <p className="services-page__selection-empty">
                    Votre sélection est encore vide.
                  </p>
                </div>
              </div>
            </div>

            <button
              className="services-page__top-button"
              type="button"
              onClick={toggleReviews}
              aria-expanded={isReviewsOpen}
            >
              Ils ont déjà essayé…
            </button>

            <button
              className="services-page__top-button"
              type="button"
              onClick={() =>
                onSelectNeed?.("all")
              }
            >
              Découvrir tous les accompagnements
            </button>
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