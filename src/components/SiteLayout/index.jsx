import "./index.css";
import {
  useNavigate,
} from "react-router-dom";

import Header
  from "../Header";

import Footer
  from "../Footer";

import ServicesRail
  from "../ServicesRail";

import PageSignature
  from "../PageSignature";

import GlobalOverlay
  from "../GlobalOverlay";


function SiteLayout({
  children,

  railProps = {},
  headerProps = {},
  overlayProps = {},

  showSignature = true,
}) {
  const navigate =
    useNavigate();


  const handleShowOffers = (
    offerId
  ) => {
    overlayProps.onClose?.();

    navigate(
      `/offres?vue=${encodeURIComponent(
        offerId
      )}`
    );
  };


  return (
    <div className="site-layout">

      <GlobalOverlay
        {...overlayProps}
      />


      <div className="site-layout__desktop-navigation">
        <ServicesRail
          {...railProps}

          onShowOffers={
            handleShowOffers
          }
        />
      </div>


      <div className="site-layout__mobile-header">
        <Header
          {...headerProps}

          onShowOffers={
            handleShowOffers
          }
        />
      </div>


      <main className="site-layout__main">

        {children}


        {showSignature && (
          <div className="site-layout__desktop-signature">
            <PageSignature />
          </div>
        )}

      </main>


      <div className="site-layout__mobile-footer">
        <Footer />
      </div>

    </div>
  );
}

export default SiteLayout;