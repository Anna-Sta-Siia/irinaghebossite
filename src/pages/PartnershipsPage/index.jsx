import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import SiteLayout
  from "../../components/SiteLayout";

import OfferCard
  from "../../components/OfferCard";

import ContextForm
  from "../../components/ContextForm";

import NotFoundPage
  from "../NotFoundPage";

import {
  partnershipMissions,
} from "../../assets/data/dataPartnerships";

import "./index.css";


/* ===========================
   VALID VIEWS
=========================== */

const VALID_PARTNERSHIP_VIEWS =
  new Set([
    "missions",
    "approche",
    "contact",
  ]);


/* ===========================
   MISSION
   → OFFER CARD
=========================== */

const missionToOfferItem = (
  mission
) => ({
  id:
    mission.id,

  title:
    mission.establishment,

  sectionTitle:
    mission.establishmentType,

  description:
    mission.intervention,

  detailSections: [
    {
      id:
        "result",

      title:
        "Résultat",

      text:
        mission.result,
    },
  ],

  testimonial:
    mission.testimonial,

  flipCta:
    "Découvrir la mission",

  detailsCta:
    "Voir le résultat",

  backCta:
    "Revenir",

  cta:
    "Me contacter",
});


function PartnershipsPage() {
  const navigate =
    useNavigate();


  const [
    searchParams,
  ] =
    useSearchParams();


  /* ===========================
     CURRENT VIEW
  =========================== */

  const requestedView =
    searchParams.get(
      "vue"
    );


  const isInvalidView =
    requestedView &&
    !VALID_PARTNERSHIP_VIEWS.has(
      requestedView
    );


  const currentView =
    requestedView ??
    "missions";


  /* ===========================
     GLOBAL OVERLAY
  =========================== */

  const [
    secondaryOverlay,
    setSecondaryOverlay,
  ] = useState(null);


  /*
    La vue Partenariat est liée
    à l'URL.

    Bio / Avis peuvent néanmoins
    passer temporairement devant.
  */

  const activeOverlay =
    secondaryOverlay ??
    (
      currentView ===
      "approche"
        ? "partnership-approach"
        : null
    );


  const isApproachOpen =
    activeOverlay ===
    "bio";


  const isReviewsOpen =
    activeOverlay ===
    "reviews";


  /* ===========================
     FORM REQUEST
  =========================== */

  const [
    formRequest,
    setFormRequest,
  ] = useState(null);


  /* ===========================
     CARDS
  =========================== */

  const [
    flippedCards,
    setFlippedCards,
  ] = useState(
    () => new Set()
  );


  const [
    openedOverlays,
    setOpenedOverlays,
  ] = useState(
    () => new Set()
  );


  const hasOpenedOverlay =
    openedOverlays.size >
    0;


  /* ===========================
     MISSIONS
  =========================== */

  const visibleMissions =
    useMemo(
      () =>
        partnershipMissions.filter(
          (mission) =>
            mission.active !==
            false
        ),
      []
    );


  /* ===========================
     RESET CARDS
  =========================== */

  const resetMissionCards =
    () => {
      setOpenedOverlays(
        new Set()
      );

      setFlippedCards(
        new Set()
      );
    };


  /* ===========================
     PARTNERSHIP NAVIGATION
  =========================== */

  const showPartnershipView = (
    viewId
  ) => {
    if (
      !VALID_PARTNERSHIP_VIEWS.has(
        viewId
      )
    ) {
      return;
    }


    setSecondaryOverlay(
      null
    );


    setFormRequest(
      null
    );


    resetMissionCards();


    navigate(
      `/partenariats?vue=${encodeURIComponent(
        viewId
      )}`
    );
  };


  /* ===========================
     BIO / QUI JE SUIS
  =========================== */

  const toggleApproach =
    () => {
      setFormRequest(
        null
      );

      resetMissionCards();


      setSecondaryOverlay(
        (currentViewName) =>
          currentViewName ===
          "bio"
            ? null
            : "bio"
      );
    };


  /* ===========================
     REVIEWS
  =========================== */

  const toggleReviews =
    () => {
      setFormRequest(
        null
      );

      resetMissionCards();


      setSecondaryOverlay(
        (currentViewName) =>
          currentViewName ===
          "reviews"
            ? null
            : "reviews"
      );
    };


  /* ===========================
     CLOSE GLOBAL OVERLAY
  =========================== */

  const closeGlobalOverlay =
    () => {
      /*
        Si Bio ou Avis est ouvert
        au-dessus de la vue actuelle,
        on ferme seulement cet overlay.
      */

      if (
        secondaryOverlay
      ) {
        setSecondaryOverlay(
          null
        );

        return;
      }


      /*
        Si l'overlay ouvert est
        "Comment j'interviens",
        fermer revient aux missions.
      */

      if (
        currentView ===
        "approche"
      ) {
        navigate(
          "/partenariats?vue=missions"
        );
      }
    };


  /* ===========================
     APPROACH → CONTACT
  =========================== */

  const handlePartnershipContact =
    () => {
      setSecondaryOverlay(
        null
      );

      setFormRequest(
        null
      );

      resetMissionCards();


      navigate(
        "/partenariats?vue=contact"
      );
    };


  /* ===========================
     CONTEXT FORM
  =========================== */

  const openContextForm = ({
    type = "contact",
    context = "",
  }) => {
    /*
      Si le rail demande directement
      une proposition Partenariat,
      on utilise notre vue dédiée.
    */

    if (
      type === "proposal" &&
      context === "Partenariat"
    ) {
      handlePartnershipContact();

      return;
    }


    setSecondaryOverlay(
      null
    );

    resetMissionCards();


    setFormRequest({
      type,
      context,
    });
  };


  const closeContextForm =
    () => {
      setFormRequest(
        null
      );
    };


  /* ===========================
     PARTNERSHIP CONTACT VIEW
  =========================== */

  const handleClosePartnershipContact =
    () => {
      setFormRequest(
        null
      );

      navigate(
        "/partenariats?vue=missions"
      );
    };


  /* ===========================
     REVIEW → SERVICE
  =========================== */

  const handleViewReviewService = (
    review
  ) => {
    setSecondaryOverlay(
      null
    );


    if (
      review?.serviceId
    ) {
      navigate(
        `/services/${review.serviceId}`
      );

      return;
    }


    navigate(
      "/services"
    );
  };


  /* ===========================
     CARD FLIP
  =========================== */

  const toggleCard = (
    missionId
  ) => {
    setFlippedCards(
      (currentCards) => {
        const nextCards =
          new Set(
            currentCards
          );


        if (
          nextCards.has(
            missionId
          )
        ) {
          nextCards.delete(
            missionId
          );
        } else {
          nextCards.add(
            missionId
          );
        }


        return nextCards;
      }
    );
  };


  /* ===========================
     CARD DETAILS
  =========================== */

  const toggleOverlay = (
    missionId
  ) => {
    setOpenedOverlays(
      (currentOverlays) => {
        const nextOverlays =
          new Set(
            currentOverlays
          );


        if (
          nextOverlays.has(
            missionId
          )
        ) {
          nextOverlays.delete(
            missionId
          );
        } else {
          nextOverlays.add(
            missionId
          );
        }


        return nextOverlays;
      }
    );
  };


  const closeOverlay = (
    missionId
  ) => {
    setOpenedOverlays(
      (currentOverlays) => {
        const nextOverlays =
          new Set(
            currentOverlays
          );


        nextOverlays.delete(
          missionId
        );


        return nextOverlays;
      }
    );
  };


  const closeAllCardOverlays =
    () => {
      setOpenedOverlays(
        new Set()
      );
    };


  /* ===========================
     MISSION CTA
  =========================== */

  const handleMissionContact =
    () => {
      setSecondaryOverlay(
        null
      );

      setFormRequest(
        null
      );

      resetMissionCards();


      navigate(
        "/partenariats?vue=contact"
      );
    };


  /* ===========================
     RAIL INTERACTION
  =========================== */

  const handleRailInteraction =
    () => {
      resetMissionCards();

      setFormRequest(
        null
      );


      if (
        secondaryOverlay
      ) {
        setSecondaryOverlay(
          null
        );
      }
    };


  /* ===========================
     404
  =========================== */

  if (
    isInvalidView
  ) {
    return (
      <NotFoundPage />
    );
  }


  /* ===========================
     RENDER
  =========================== */

  return (
    <SiteLayout

      /* ===========================
         NAVIGATION DESKTOP
      =========================== */

      railProps={{
        currentPartnershipView:
          currentView,

        onShowPartnershipSection:
          showPartnershipView,

        onShowApproach:
          toggleApproach,

        isApproachOpen:
          isApproachOpen,

        onShowReviews:
          toggleReviews,

        isReviewsOpen:
          isReviewsOpen,

        onOpenForm:
          openContextForm,

        onRailInteraction:
          handleRailInteraction,
      }}


      /* ===========================
         HEADER MOBILE
      =========================== */

      headerProps={{
        onShowApproach:
          toggleApproach,
      }}


      /* ===========================
         GLOBAL OVERLAY
      =========================== */

      overlayProps={{
        activeView:
          activeOverlay,

        onClose:
          closeGlobalOverlay,

        onViewService:
          handleViewReviewService,

        onPartnershipContact:
          handlePartnershipContact,
      }}
    >

      <div className="partnerships-page">


        {/* ===========================
            GENERIC CONTEXT FORM
        =========================== */}

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


        {/* ===========================
            MISSIONS
        =========================== */}

        {currentView ===
          "missions" && (
          <section className="partnerships-page__section">

            <header className="partnerships-page__heading">

              <p className="partnerships-page__eyebrow">
                Partenariats
              </p>


              <h1 className="partnerships-page__title">
                Mes missions réalisées
              </h1>


              <p className="partnerships-page__intro">
                Des interventions
                construites en fonction
                de chaque structure,
                de son public et de ses
                objectifs.
              </p>

            </header>


            {/* ===========================
                CARD BACKDROP
            =========================== */}

            {hasOpenedOverlay && (
              <button
                className="partnerships-page__card-backdrop"
                type="button"
                onClick={
                  closeAllCardOverlays
                }
                aria-label="Fermer les détails"
              />
            )}


            {/* ===========================
                CARDS
            =========================== */}

            <div
              className={`partnerships-page__grid ${
                hasOpenedOverlay
                  ? "partnerships-page__grid--overlay-open"
                  : ""
              }`}
            >
              {visibleMissions.map(
                (
                  mission,
                  index
                ) => {
                  const item =
                    missionToOfferItem(
                      mission
                    );


                  const isFlipped =
                    flippedCards.has(
                      mission.id
                    );


                  const isOverlayOpen =
                    openedOverlays.has(
                      mission.id
                    );


                  return (
                    <div
                      className={`partnerships-page__card ${
                        isOverlayOpen
                          ? "partnerships-page__card--overlay-open"
                          : ""
                      }`}
                      key={
                        mission.id
                      }
                    >

                      {/* ===========================
                          DEMO
                      =========================== */}

                      {mission.isDemo && (
                        <span className="partnerships-page__demo">
                          Démonstration
                        </span>
                      )}


                      {/* ===========================
                          OFFER CARD
                      =========================== */}

                      <OfferCard
                        item={
                          item
                        }

                        itemKey={
                          mission.id
                        }

                        index={
                          index
                        }

                        showSectionTitle

                        isFlipped={
                          isFlipped
                        }

                        isOverlayOpen={
                          isOverlayOpen
                        }

                        onFlip={
                          toggleCard
                        }

                        onToggleDetails={
                          toggleOverlay
                        }

                        onCloseDetails={
                          closeOverlay
                        }

                        onCta={
                          handleMissionContact
                        }
                      />

                    </div>
                  );
                }
              )}
            </div>

          </section>
        )}


        {/* ===========================
            CONTACT PARTENARIAT
        =========================== */}

        {currentView ===
          "contact" &&
          !formRequest && (
          <ContextForm
            type="proposal"

            context="Partenariat"

            onClose={
              handleClosePartnershipContact
            }
          />
        )}

      </div>

    </SiteLayout>
  );
}


export default PartnershipsPage;