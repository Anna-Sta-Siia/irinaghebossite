import "./index.css";
import logo from "../../assets/data/logo.webp";

function Header({ onBack }) {
  return (
    <header className="site-header">
      

      <div className="site-header__brand">
        <img className="site-header__logo" src={logo} alt="Irina Gebos" />
        <p className="site-header__tagline">Guider · Inspirer</p>
      </div>
<button className="site-header__back" type="button" onClick={onBack}>
        ← Retour
      </button>
      <button className="site-header__cta" type="button">
        Prendre rendez-vous
      </button>
    </header>
  );
}

export default Header;