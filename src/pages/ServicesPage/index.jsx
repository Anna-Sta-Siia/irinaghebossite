import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./index.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServicesRail from "../../components/ServicesRail";
import Services from "../../components/Services";
import PageSignature from "../../components/PageSignature";
import ContextForm from "../../components/ContextForm";
import GlobalOverlay from "../../components/GlobalOverlay";
import BookingFlow from "../../components/BookingFlow";
import NotFoundPage from "../NotFoundPage";
import { findServiceBySlug } from "../../utils/serviceRouting";
const VALID_NEEDS = new Set([
  "force",
  "liberte",
  "silhouette",
  "visage",
  "unknown",
  "all",
]);
function ServicesPage({
  onShowOffers,

  selection,
  onAddToSelection,
  onRemoveFromSelection,
  onClearSelection,
}) {

  const navigate = useNavigate();

  const { serviceSlug } =
    useParams();

  const [searchParams] =
    useSearchParams();

  const serviceFromRoute =
    findServiceBySlug(serviceSlug);

  const needFromUrl =
    searchParams.get("besoin");

  const need =
    serviceFromRoute?.needId ??
    (
      needFromUrl &&
      VALID_NEEDS.has(needFromUrl)
        ? needFromUrl
        : "all"
    );
  /* ===========================
     STATES
  =========================== */

const [
  activeOverlay,
  setActiveOverlay,
] = useState(null);


const isApproachOpen =
  activeOverlay === "bio";

const isReviewsOpen =
  activeOverlay ===
  "reviews";

  const isGiftCardOpen =
  activeOverlay ===
  "gift-card";


  const [
    isSelectionOpen,
    setIsSelectionOpen,
  ] = useState(false);


  const [
    isBookingOpen,
    setIsBookingOpen,
  ] = useState(false);

  const [
    formRequest,
    setFormRequest,
  ] = useState(null);

  const [
    focusedServiceId,
    setFocusedServiceId,
  ] = useState(null);


  /* ===========================
     NAVIGATION NORMALE
  =========================== */

 const updateNeedInUrl = (
    nextNeed
  ) => {
    if (
      !nextNeed ||
      nextNeed === "all"
    ) {
      navigate("/services");
      return;
    }

    navigate(
      `/services?besoin=${encodeURIComponent(
        nextNeed
      )}`
    );
  };


const handleSelectNeed = (
  nextNeed
) => {
  setFocusedServiceId(null);

  updateNeedInUrl(
    nextNeed
  );
};

  /* ===========================
   FERMETURE UNIQUE
=========================== */
const closeGlobalOverlay = () => {
  setActiveOverlay(null);
};


  /* ===========================
     SELECTION
  =========================== */
const openSelection = () => {
  closeGlobalOverlay();
  setIsBookingOpen(false);
  setFormRequest(null);

  setIsSelectionOpen(true);
};


  const closeSelection = () => {
    setIsSelectionOpen(false);
  };


const toggleSelection = () => {
  closeGlobalOverlay();
  setIsBookingOpen(false);
  setFormRequest(null);

  setIsSelectionOpen(
    (currentValue) =>
      !currentValue
  );
};


  const handleSelectionBlur = (
    event
  ) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget
      )
    ) {
      closeSelection();
    }
  };


/* ===========================
   BIO / APPROCHE
=========================== */


const toggleApproach = () => {
  setIsSelectionOpen(false);
  setIsBookingOpen(false);
  setFormRequest(null);

  setActiveOverlay(
    (currentView) =>
      currentView === "bio"
        ? null
        : "bio"
  );
};


 /* ===========================
   CARTE CADEAU
=========================== */
const toggleGiftCard = () => {
  setIsSelectionOpen(false);
  setIsBookingOpen(false);
  setFormRequest(null);

  setActiveOverlay(
    (currentView) =>
      currentView ===
      "gift-card"
        ? null
        : "gift-card"
  );
};

/* ===========================
   AVIS
=========================== */

const toggleReviews = () => {
  setIsSelectionOpen(false);
  setIsBookingOpen(false);
  setFormRequest(null);

  setActiveOverlay(
    (currentView) =>
      currentView ===
      "reviews"
        ? null
        : "reviews"
  );
};


  /* ===========================
     BOOKING
  =========================== */

  const closeBooking = () => {
    setIsBookingOpen(false);
  };


const openBooking = () => {
  if (!selection?.length) {
    return;
  }

  setIsSelectionOpen(false);
  closeGlobalOverlay();
  setFormRequest(null);

  setIsBookingOpen(true);
};

  const handleBookingConfirmed = (
    booking
  ) => {
    console.log(
      "Réservation simulée :",
      booking
    );
  };


  /* ===========================
     FORMULAIRES
  =========================== */

  const closeContextForm = () => {
    setFormRequest(null);
  };


const openContextForm = ({
  type = "contact",
  context = "",
}) => {
  closeGlobalOverlay();

  setIsSelectionOpen(false);
  setIsBookingOpen(false);

  setFormRequest({
    type,
    context,
  });
};


  /* ===========================
     FERMER TOUS LES PANELS
  =========================== */

const closeMainOverlays = () => {
  closeGlobalOverlay();

  closeSelection();
  closeBooking();
  closeContextForm();
};

  /* ===========================
     OUVRIR UNE PRESTATION
     DEPUIS UN AVIS
  =========================== */

const handleViewReviewService = (
  review
) => {
  if (
    !review?.serviceId ||
    !review?.needId
  ) {
    return;
  }


  closeGlobalOverlay();

  setIsSelectionOpen(false);
  setIsBookingOpen(false);
  setFormRequest(null);


  navigate(
    `/services/${review.serviceId}`
  );
};


  /* ===========================
     CTA SERVICES
  =========================== */

  const handleServiceCta = (
    service
  ) => {
    const ctaLabel = String(
      service.cta ?? ""
    ).toLowerCase();

    if (
      ctaLabel.includes(
        "contact"
      ) ||
      ctaLabel.includes(
        "proposition"
      ) ||
      service.bookingEnabled ===
        false
    ) {
      openContextForm({
        type:
          ctaLabel.includes(
            "proposition"
          )
            ? "proposal"
            : "contact",

        context:
          service.title,
      });

      return;
    }

    onAddToSelection?.({
      type: "service",

      id:
        service.id,

      title:
        service.title,

      durationMinutes:
        service.durationMinutes ??
        null,

      bookingDurations:
        service.bookingDurations ??
        null,

      prices:
        service.prices ??
        [],

      onlineAvailable:
        service.onlineAvailable ??
        false,
    });

    
    closeGlobalOverlay();
    setIsBookingOpen(false);
    setFormRequest(null);

    setIsSelectionOpen(true);
  };


  /* ===========================
     BODY SCROLL LOCK
  =========================== */

const hasLegacyOverlay =
  isBookingOpen ||
  Boolean(formRequest);


  useEffect(() => {
    if (!hasLegacyOverlay) {
      return undefined;
    }

    const previousBodyOverflow =
      document.body.style
        .overflow;

    const previousHtmlOverflow =
      document.documentElement
        .style.overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement
      .style.overflow =
      "hidden";

const handleEscape = (
  event
) => {
  if (
    event.key ===
    "Escape"
  ) {
    closeContextForm();
    closeBooking();
    closeSelection();
  }
};

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style
        .overflow =
        previousBodyOverflow;

      document.documentElement
        .style.overflow =
        previousHtmlOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [hasLegacyOverlay]);


  if (
    serviceSlug &&
    !serviceFromRoute
  ) {
    return <NotFoundPage />;
  }


  /* ===========================
     RENDER
  =========================== */

  return (
    <div className="services-page">

      {/* ======================
          OVERLAYS / PANELS
      ====================== */}

<GlobalOverlay
  activeView={
    activeOverlay
  }

  onClose={
    closeGlobalOverlay
  }

  onViewService={
    handleViewReviewService
  }
/>



      <BookingFlow
        isOpen={
          isBookingOpen
        }

        selection={
          selection
        }

        onClose={
          closeBooking
        }

        onConfirmed={
          handleBookingConfirmed
        }

        onClearSelection={
          onClearSelection
        }
      />

      {/* ======================
          CONTEXT FORM
      ====================== */}

      {formRequest && (
        <ContextForm
          type={
            formRequest.type
          }

          context={
            formRequest.context
          }

          onClose={
            closeContextForm
          }
        />
      )}


      {/* ======================
          NAVIGATION DESKTOP
      ====================== */}

      <div className="services-page__desktop-navigation">

<ServicesRail
  currentNeed={need}

  onSelectNeed={
    handleSelectNeed
  }

  onShowOffers={
    onShowOffers
  }

  onShowApproach={
    toggleApproach
  }

  isApproachOpen={
    isApproachOpen
  }

  onShowGiftCard={
    toggleGiftCard
  }

  isGiftCardOpen={
    isGiftCardOpen
  }

  onShowReviews={
    toggleReviews
  }

  isReviewsOpen={
    isReviewsOpen
  }

  onOpenForm={
    openContextForm
  }

  onRailInteraction={
    closeMainOverlays
  }
/>

      </div>


      {/* ======================
          HEADER MOBILE
      ====================== */}

      <div className="services-page__mobile-header">

        <Header
          onSelectNeed={
            handleSelectNeed
          }

          onShowOffers={
            onShowOffers
          }

          onShowApproach={
            toggleApproach
          }

          onShowGiftCard={
            toggleGiftCard
          }
        />

      </div>


      {/* ======================
          CONTENU PRINCIPAL
      ====================== */}

      <main className="services-page__main">

        {/* ======================
            ACTIONS TOP
        ====================== */}

        <div className="services-page__appointment-top">

          <div className="services-page__top-actions">


            {/* ======================
                VOTRE SELECTION
            ====================== */}

            <div
              className="services-page__selection"

              onMouseEnter={
                openSelection
              }

              onMouseLeave={
                closeSelection
              }

              onFocusCapture={
                openSelection
              }

              onBlurCapture={
                handleSelectionBlur
              }
            >

              <button
                className={`services-page__top-button services-page__selection-trigger ${
                  isSelectionOpen
                    ? "services-page__selection-trigger--open"
                    : ""
                }`}

                type="button"

                onClick={
                  toggleSelection
                }

                aria-expanded={
                  isSelectionOpen
                }

                aria-controls="services-selection-panel"
              >

                <span>

                  Votre sélection

                  {selection.length >
                    0 && (
                    <span className="services-page__selection-count">

                      {
                        selection.length
                      }

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


              {/* ======================
                  PANEL SELECTION
              ====================== */}

              <div
                id="services-selection-panel"

                className={`services-page__selection-panel ${
                  isSelectionOpen
                    ? "services-page__selection-panel--open"
                    : ""
                }`}

                aria-hidden={
                  !isSelectionOpen
                }
              >

                <div className="services-page__selection-panel-inner">

                  {selection.length ===
                  0 ? (

                    <p className="services-page__selection-empty">

                      Votre sélection est
                      encore vide.

                    </p>

                  ) : (

                    <>

                      <div className="services-page__selection-list">

                        {selection.map(
                          (item) => {

                            const firstPrice =
                              item
                                .prices?.[0];


                            return (
                              <article
                                className="services-page__selection-item"

                                key={`${item.type}-${item.id}`}
                              >

                                <div className="services-page__selection-item-content">

                                  <strong className="services-page__selection-item-title">

                                    {
                                      item.title
                                    }

                                  </strong>


                                  {item
                                    .bookingDurations
                                    ?.length >
                                  1 ? (

                                    <span className="services-page__selection-item-meta">

                                      Plusieurs
                                      formats
                                      disponibles

                                    </span>

                                  ) : (

                                    <>

                                      {item
                                        .durationMinutes && (

                                        <span className="services-page__selection-item-meta">

                                          {
                                            item
                                              .durationMinutes
                                          }{" "}
                                          min

                                        </span>

                                      )}


                                      {firstPrice
                                        ?.price && (

                                        <span className="services-page__selection-item-price">

                                          {
                                            firstPrice
                                              .price
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
                          }
                        )}

                      </div>


                      <div className="services-page__selection-footer">

                        <button
                          className="services-page__selection-clear"

                          type="button"

                          onClick={
                            onClearSelection
                          }
                        >
                          Vider
                        </button>


                        <button
                          className="services-page__selection-finalize"

                          type="button"

                          onClick={
                            openBooking
                          }
                        >
                          Finaliser ma
                          sélection
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

              onClick={
                toggleReviews
              }

              aria-expanded={
                isReviewsOpen
              }
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

                onClick={() => {
                  closeMainOverlays();

                  handleSelectNeed(
                    "all"
                  );
                }}
              >
                Découvrir tous les
                accompagnements
              </button>

            )}

          </div>

        </div>


        {/* ======================
            SERVICES
        ====================== */}

        <Services
          need={
            need
          }

          onSelectNeed={
            handleSelectNeed
          }

          onServiceCta={
            handleServiceCta
          }

          focusedServiceId={
            serviceFromRoute?.id ??
            focusedServiceId
          }

          onClearFocusedService={() => {
            if (serviceFromRoute) {
              navigate(
                `/services?besoin=${serviceFromRoute.needId}`
              );

              return;
            }

            setFocusedServiceId(
              null
            );
          }}
        />
 <PageSignature />
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