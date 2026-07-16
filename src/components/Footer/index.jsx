import "./index.css";

import logo from "../../assets/data/logosmall.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

function Footer({
  onShowLegal,
  onShowTerms,
  onShowPrivacy,
  onShowCancellation,
}) {
  const whatsappUrl =
    "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.";

  const emailUrl =
    "mailto:irinacoachprepa@gmail.com?subject=Demande%20de%20rendez-vous";

  const instagramUrl =
    "https://www.instagram.com/irina_recovery/";

  const facebookUrl =
    "https://www.facebook.com/PikaPikaPikatchuuu";

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        {/* ===========================
            COLONNE GAUCHE
        =========================== */}

        <div className="site-footer__navigation">
          <section className="site-footer__group">
            <h2 className="site-footer__group-title">
              Contact
            </h2>

            <div className="site-footer__links">
              <a
                className="site-footer__link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="site-footer__link-icon"
                  src={whatsapp}
                  alt=""
                  aria-hidden="true"
                />

                <span>WhatsApp</span>
              </a>

              <a
                className="site-footer__link"
                href={emailUrl}
              >
                <img
                  className="site-footer__link-icon"
                  src={mail}
                  alt=""
                  aria-hidden="true"
                />

                <span>E-mail</span>
              </a>
            </div>
          </section>

          <section className="site-footer__group">
            <h2 className="site-footer__group-title">
              Mon univers
            </h2>

            <div className="site-footer__links">
              <a
                className="site-footer__link"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="site-footer__link-icon"
                  src={insta}
                  alt=""
                  aria-hidden="true"
                />

                <span>Instagram</span>
              </a>

              <a
                className="site-footer__link"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="site-footer__link-icon"
                  src={facebook}
                  alt=""
                  aria-hidden="true"
                />

                <span>Facebook</span>
              </a>
            </div>
          </section>

          <section className="site-footer__group">
            <h2 className="site-footer__group-title">
              Votre rendez-vous
            </h2>

            <div className="site-footer__links">
              <a
                className="site-footer__text-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>

              <button
                className="site-footer__text-link"
                type="button"
                onClick={onShowCancellation}
              >
                Modifier ou annuler
              </button>

              <button
                className="site-footer__text-link"
                type="button"
                onClick={onShowCancellation}
              >
                Conditions d’annulation
              </button>
            </div>
          </section>
        </div>

        {/* ===========================
            CENTRE — IDENTITÉ
        =========================== */}

        <div className="site-footer__identity">
          <img
            className="site-footer__logo"
            src={logo}
            alt="Irina Recovery"
          />

          <p className="site-footer__quote">
            <span>
              Être en paix avec soi-même,
            </span>

            <span className="site-footer__quote-second">
              tout en continuant à grandir
            </span>
          </p>
        </div>

        {/* ===========================
            CTA DROITE
        =========================== */}

        <div className="site-footer__appointment">
          <p className="site-footer__appointment-title">
            Commençons par un échange
          </p>

          <p className="site-footer__appointment-text">
            Prenons le temps de comprendre ce dont vous avez besoin.
          </p>

          <a
            className="site-footer__appointment-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>

      {/* ===========================
          BAS DE PAGE
      =========================== */}

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Irina Recovery
        </p>

        <div className="site-footer__legal">
          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowLegal}
          >
            Mentions légales
          </button>

          <span aria-hidden="true">·</span>

          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowTerms}
          >
            Conditions générales de vente
          </button>

          <span aria-hidden="true">·</span>

          <button
            className="site-footer__legal-link"
            type="button"
            onClick={onShowPrivacy}
          >
            Politique de confidentialité
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;