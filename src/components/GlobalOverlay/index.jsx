import OverlayShell
  from "../OverlayShell";

import BioView
  from "../BioView";

import ReviewsView
  from "../ReviewsView";

import GiftCardView
  from "../ GiftCardView";


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
};


function GlobalOverlay({
  activeView,
  onClose,

  onViewService,
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


  const viewProps =
    activeView === "reviews"
      ? {
          onViewService,
        }
      : {};


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