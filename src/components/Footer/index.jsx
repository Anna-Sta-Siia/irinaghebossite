import "./index.css";
import logo from "../../assets/data/logosmall.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

function Footer() {
  return (
    <footer className="site-footer">
           <div className="site-footer__side--left">
            <div className="site-footer__side--left_communication">
      <button className="site-footer__cta" type="button">
                <img className="site-footer__communication" src={whatsapp} alt="Lien vers Whats'App" />
             </button>
            <button className="site-footer__cta" type="button">
                <img className="site-footer__communication" src={mail} alt="M'écrire un e-mail" />
             </button>
             </div>
             <div className="site-footer__side--left--right_riseaux">
      <button className="site-footer__cta" type="button">
                <img className="site-footer__riseaux" src={insta} alt="Lien vers Instagram" />
             </button>
            <button className="site-footer__cta" type="button">
                <img className="site-footer__communication" src={facebook} alt="Lien vers Facebook" />
             </button>
     
             </div>
           </div>
      <p className="site-footer_slogan">
        <span className="site-footer_slogan_first_step">
          Être en paix avec soi-même,
        </span>

        <span className="site-footer_slogan_second_step">
          tout en continuant à grandir
        </span>

      </p>
 <div className="site-footer__brand">
        <img
          className="site-footer__logo"
          src={logo}
          alt="Irina Ghebos"
        />
      </div>
    </footer>
  );
}

export default Footer;