import smallLogo from "../../assets/images/logosmall.png";

import "./index.css";

function PageSignature() {
  return (
    <div
      className="page-signature"
      aria-hidden="true"
    >
      <img
        className="page-signature__logo"
        src={smallLogo}
        alt=""
      />
    </div>
  );
}

export default PageSignature;