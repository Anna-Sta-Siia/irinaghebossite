import "./index.css";
import logo from "../../assets/data/logosmall.webp";
function Footer() {
  return (
    <footer className="site-footer">
         <div className="site-footer__brand">
              <img className="site-footer__logo" src={logo} alt="Irina Ghebos" />
            </div>
      <p>Revenir à soi, à travers le corps,la respiration  et le mouvement</p>
      <div className="site-footer_cta_buttons">  
        <button className="site-footer__cta" type="button">
          Mon instagram
        </button>   
        <button className="site-footer__cta" type="button">
          Échanger
        </button>
        <button className="site-footerr__cta" type="button">
          Prendre rendez-vous
        </button>
      
      </div>
    </footer>
  );
}

export default Footer;