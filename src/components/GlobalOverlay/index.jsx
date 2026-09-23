import OverlayShell
  from "../OverlayShell";

import BioView
  from "../BioView";


const overlayViews = {
  bio: {
    component: BioView,
    labelledBy:
      "bio-view-title",
  },
};


function GlobalOverlay({
  activeView,
  onClose,
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


  return (
    <OverlayShell
      isOpen={true}
      onClose={onClose}
      labelledBy={
        viewConfig.labelledBy
      }
    >
      <ActiveView />
    </OverlayShell>
  );
}


export default GlobalOverlay;