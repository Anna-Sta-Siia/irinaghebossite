import "./index.css";

import smallLogo from "../../assets/data/logosmall.png";
import irinaApproach from "../../assets/data/irina-approach.png";

function MonApproche({
  isOpen,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="mon-approche"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mon-approche-title"
    >
      <button
        className="mon-approche__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Fermer la présentation"
      />

      <div className="mon-approche__modal">
        <button
          className="mon-approche__close"
          type="button"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="mon-approche__copy">
          <img
            className="mon-approche__mini-logo"
            src={smallLogo}
            alt=""
            aria-hidden="true"
          />

          <p
            className="mon-approche__greeting"
            id="mon-approche-title"
          >
            Bonjour, je suis Irina.
          </p>

          <p>
            J’accompagne chaque personne à retrouver
            davantage de mobilité, d’énergie et de confort
            dans son corps.
          </p>

          <p>
            Mon approche associe le mouvement, le soin et
            l’écoute, avec une attention particulière portée
            à chaque personne.
          </p>

          <p className="mon-approche__quote">
            Prendre soin de soi, c’est retrouver la liberté
            d’avancer
          </p>

          <p className="mon-approche__kicker">
            Irina Recovery
          </p>
        </div>

        <div className="mon-approche__photo-wrap">
          <img
            className="mon-approche__photo"
            src={irinaApproach}
            alt="Irina dans une salle de sport"
          />
        </div>
      </div>
    </div>
  );
}

export default MonApproche;
