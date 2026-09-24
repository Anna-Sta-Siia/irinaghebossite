import OverlayShell
  from "../OverlayShell";

import BioView
  from "../BioView";

import ReviewsView
  from "../ReviewsView";

import GiftCardView
  from "../GiftCardView";

import PartnershipApproachView
  from "../PartnershipApproachView";


const overlayViews = {
  bio: {
    component:
      BioView,

    labelledBy:
      "bio-view-title",
  },


  reviews: {
    component:
      ReviewsView,

    labelledBy:
      "reviews-view-title",
  },


  "gift-card": {
    component:
      GiftCardView,

    labelledBy:
      "gift-card-view-title",
  },


  "partnership-approach": {
    component:
      PartnershipApproachView,

    labelledBy:
      "partnership-approach-title",
  },
};


function GlobalOverlay({
  activeView,

  onClose,

  onViewService,

  onPartnershipContact,
}) {
  if (!activeView) {
    return null;
  }


  const viewConfig =
    overlayViews[
      activeView
    ];


  if (!viewConfig) {
    return null;
  }


  const ActiveView =
    viewConfig.component;


  let viewProps = {};


  /* ===========================
     REVIEWS
  =========================== */

  if (
    activeView ===
    "reviews"
  ) {
    viewProps = {
      onViewService,
    };
  }


  /* ===========================
     PARTNERSHIP APPROACH
  =========================== */

  if (
    activeView ===
    "partnership-approach"
  ) {
    viewProps = {
      onContact:
        onPartnershipContact,
    };
  }


  return (
    <OverlayShell
      isOpen={true}

      onClose={
        onClose
      }

      labelledBy={
        viewConfig.labelledBy
      }
    >
      <ActiveView
        {...viewProps}
      />
    </OverlayShell>
  );
}


export default GlobalOverlay;