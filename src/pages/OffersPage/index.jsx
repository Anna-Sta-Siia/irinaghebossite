import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./index.css";

import SiteLayout
  from "../../components/SiteLayout";

import Filter
  from "../../components/Filter";

import OfferCard
  from "../../components/OfferCard";

import GiftCardView
  from "../../components/ GiftCardView";

import ContextForm
  from "../../components/ContextForm";


import {
  dataOffers,
} from "../../assets/data/dataOffers";

import {
  dataServices,
} from "../../assets/data/dataServices";

import {
  dataPacks,
} from "../../assets/data/dataPacks";


const VALID_OFFER_VIEWS =
  new Set([
    "du-moment",
    "packs",
    "carte-cadeau",
  ]);


function OffersPage({
  onAddToSelection,
}) {
  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();


  /* ===========================
     ROUTE / VUE ACTIVE
  =========================== */

  const viewFromUrl =
    searchParams.get("vue");


  const currentView =
    VALID_OFFER_VIEWS.has(
      viewFromUrl
    )
      ? viewFromUrl
      : "du-moment";


  /* ===========================
     GLOBAL OVERLAY
     Bio / Avis
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


  const closeGlobalOverlay =
    () => {
      setActiveOverlay(null);
    };


  const toggleApproach = () => {
    setActiveOverlay(
      (currentValue) =>
        currentValue === "bio"
          ? null
          : "bio"
    );
  };


  const toggleReviews = () => {
    setActiveOverlay(
      (currentValue) =>
        currentValue ===
        "reviews"
          ? null
          : "reviews"
    );
  };


  /* ===========================
     CONTACT / PROPOSITION
  =========================== */

  const [
    formRequest,
    setFormRequest,
  ] = useState(null);


  const closeContextForm = () => {
    setFormRequest(null);
  };


  const openContextForm = ({
    type = "contact",
    context = "",
  }) => {
    closeGlobalOverlay();

    setFormRequest({
      type,
      context,
    });
  };


  /* ===========================
     NAVIGATION OFFRES
  =========================== */

  const handleSelectOfferView = (
    offerId
  ) => {
    if (
      !VALID_OFFER_VIEWS.has(
        offerId
      )
    ) {
      return;
    }


    closeGlobalOverlay();
    setFormRequest(null);


    navigate(
      `/offres?vue=${encodeURIComponent(
        offerId
      )}`
    );
  };


  /* ===========================
     RETOUR VERS SERVICES
     DEPUIS UN AVIS
  =========================== */

  const handleViewReviewService = (
    review
  ) => {
    if (
      !review?.serviceId
    ) {
      return;
    }


    closeGlobalOverlay();


    navigate(
      `/services/${review.serviceId}`
    );
  };


  /* ===========================
     DONNÉES
  =========================== */

const activeServices =
  Object.entries(
    dataServices
  ).flatMap(
    ([needId, section]) =>
      section.services
        .filter(
          (service) =>
            service.active !== false
        )
        .map(
          (service) => ({
            ...service,

            needId,

            offerType:
              "service",
          })
        )
  );


const activePacks =
  dataPacks.filter(
    (pack) =>
      pack.active !== false
  );


const momentumItems = [
  ...activeServices,
  ...activePacks.map(
    (pack) => ({
      ...pack,

      offerType:
        "pack",
    })
  ),
].filter(
  (item) =>
    item.momentum === true
);


  /* ===========================
     CTA CARTE
  =========================== */

  const handleOfferCta = (
    item
  ) => {
    if (!item) {
      return;
    }


    const ctaLabel =
      String(
        item.cta ?? ""
      ).toLowerCase();


    if (
      item.bookingEnabled ===
        false ||
      ctaLabel.includes(
        "contact"
      ) ||
      ctaLabel.includes(
        "proposition"
      )
    ) {
      openContextForm({
        type:
          ctaLabel.includes(
            "proposition"
          )
            ? "proposal"
            : "contact",

        context:
          item.title,
      });

      return;
    }


    onAddToSelection?.({
      type:
        item.offerType ??
        "pack",

      id:
        item.id,

      title:
        item.title,

      durationMinutes:
        item.durationMinutes ??
        null,

      bookingDurations:
        item.bookingDurations ??
        null,

      prices:
        item.prices ??
        [],

      onlineAvailable:
        item.onlineAvailable ??
        false,
    });
  };


  /* ===========================
     RENDER CONTENU
  =========================== */

  const renderOffersContent =
    () => {

      /* -----------------------
         DU MOMENT
      ----------------------- */

      if (
        currentView ===
        "du-moment"
      ) {
        return (
          <section className="offers-page__section">

            <div className="offers-page__heading">

              <p className="offers-page__eyebrow">
                À découvrir
              </p>

              <h1 className="offers-page__title">
                Offres du moment
              </h1>

            </div>


            {momentumItems.length >
            0 ? (

              <div className="offers-page__grid">

                {momentumItems.map(
                  (item) => (
                    <OfferCard
                      key={`${item.offerType}-${item.id}`}
                      item={
                        item
                      }
                      onCta={() =>
                        handleOfferCta(
                          item
                        )
                      }
                    />
                  )
                )}

              </div>

            ) : (

              <p className="offers-page__empty">
                Aucune offre du
                moment pour
                l’instant.
              </p>

            )}

          </section>
        );
      }


      /* -----------------------
         PACKS
      ----------------------- */

      if (
        currentView ===
        "packs"
      ) {
        return (
          <section className="offers-page__section">

            <div className="offers-page__heading">

              <p className="offers-page__eyebrow">
                Pour aller plus loin
              </p>

              <h1 className="offers-page__title">
                Les packs
              </h1>

            </div>


            <div className="offers-page__grid">

              {activePacks.map(
                (pack) => {

                  const item = {
                    ...pack,

                    offerType:
                      "pack",
                  };


                  return (
                    <OfferCard
                      key={
                        pack.id
                      }
                      item={
                        item
                      }
                      onCta={() =>
                        handleOfferCta(
                          item
                        )
                      }
                    />
                  );
                }
              )}

            </div>

          </section>
        );
      }


      /* -----------------------
         CARTE CADEAU
      ----------------------- */

      return (
        <section
          className="
            offers-page__section
            offers-page__section--gift
          "
        >

          <GiftCardView />

        </section>
      );
    };


  /* ===========================
     RENDER
  =========================== */

  return (
    <SiteLayout

      /* =======================
         DESKTOP RAIL
      ======================= */

      railProps={{
        currentOfferView:
          currentView,

        onShowOffers:
          handleSelectOfferView,

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
          closeGlobalOverlay,
      }}


      /* =======================
         MOBILE HEADER
      ======================= */

      headerProps={{
        onShowOffers:
          handleSelectOfferView,

        onShowApproach:
          toggleApproach,
      }}


      /* =======================
         GLOBAL OVERLAY
      ======================= */

      overlayProps={{
        activeView:
          activeOverlay,

        onClose:
          closeGlobalOverlay,

        onViewService:
          handleViewReviewService,
      }}
    >

      <div className="offers-page">


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
            FILTER
        ====================== */}

        <div className="offers-page__filter">

          <Filter
            items={
              dataOffers
            }

            currentId={
              currentView
            }

            onSelect={
              handleSelectOfferView
            }

            ariaLabel="Choisir une catégorie d’offres"
          />

        </div>


        {/* ======================
            CONTENU
        ====================== */}

        {
          renderOffersContent()
        }

      </div>

    </SiteLayout>
  );
}


export default OffersPage;