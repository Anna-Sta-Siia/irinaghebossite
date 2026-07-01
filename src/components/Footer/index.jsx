import "./index.css";
import logo from "../../assets/data/logosmall.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <img
          className="site-footer__logo"
          src={logo}
          alt="Irina Ghebos"
        />
      </div>

      <p className="site-footer_slogan">
        <span className="site-footer_slogan_zero_step">
          Revenir à soi,
        </span>

        <span className="site-footer_slogan_first_step">
          à travers le corps,
        </span>

        <span className="site-footer_slogan_second_step">
          la respiration
        </span>

        <span className="site-footer_slogan_third_step">
          et le mouvement
        </span>
      </p>

      <div className="site-footer_cta_buttons">
        <button className="site-footer__cta" type="button">
          Mon Instagram
        </button>

        <button className="site-footer__cta" type="button">
          Échanger
        </button>

        <button className="site-footer__cta" type="button">
          Prendre rendez-vous
        </button>
      </div>
    </footer>
  );
}

export default Footer;