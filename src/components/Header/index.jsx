import "./index.css";
import logo from "../../assets/data/logobig.png";
import whatsapp from "../../assets/data/WHATSAPP.png";
import facebook from "../../assets/data/FACEBOOK.png";
import insta from "../../assets/data/INSTA.png";
import mail from "../../assets/data/MAIL.png";

function Header({ onBack, onShowAllServices }) {
  return (
    <header className="site-header">
    <div className="site-header__brand">
        <img className="site-header__logo" src={logo} alt="Irina Ghebos" />
      </div>
      <div className="site-header_nav_and_icons">
      <div className="site-header__nav">
        <button className="site-header__link" type="button" onClick={onBack}>
          Besoins
        </button> 
         <button className="site-header__cta" type="button">
          Prendre rendez-vous
        </button>
  <button
  className="site-header__link"
  type="button"
  onClick={onShowAllServices}
>
  Accompagnements
</button>
       
      </div>

      <div className="site-header__icons">
       <div className="site-header__icons_communication">
 <button className="site-header__cta" type="button">
           <img className="site-header__communication" src={whatsapp} alt="Lien vers Whats'App" />
        </button>
       <button className="site-header__cta" type="button">
           <img className="site-header__communication" src={mail} alt="M'écrire un e-mail" />
        </button>
        </div>
        <div className="site-header__icons_reseaux">
 <button className="site-header__cta" type="button">
           <img className="site-header__riseaux" src={insta} alt="Lien vers Instagram" />
        </button>
       <button className="site-header__cta" type="button">
           <img className="site-header__communication" src={facebook} alt="Lien vers Facebook" />
        </button>

        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;