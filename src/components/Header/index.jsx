import "./index.css";
import logo from "../../assets/data/logobig.png";

function Header({ onBack, onShowAllServices }) {
  return (
    <header className="site-header">
 
      <div className="site-header__side site-header__side--left">
        <button className="site-header__link" type="button" onClick={onBack}>
          Besoins
        </button>
  <button
  className="site-header__link"
  type="button"
  onClick={onShowAllServices}
>
  Accompagnements
</button>
       
      </div>

      <div className="site-header__brand">
        <img className="site-header__logo" src={logo} alt="Irina Ghebos" />
      </div>

      <div className="site-header__side site-header__side--right">
      
 <button className="site-header__cta" type="button">
          Échanger
        </button>
        <button className="site-header__cta" type="button">
          Prendre rendez-vous
        </button>
      </div>
    </header>
  );
}

export default Header;