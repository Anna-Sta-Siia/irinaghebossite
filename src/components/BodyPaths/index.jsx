import "./index.css";
import bodyOutline from "./assets/body-outline.svg";
import energyRed from "./assets/energy-red.svg";
import energyGold from "./assets/energy-gold.svg";

function BodyPaths() {
  return (
    <div className="body-paths" aria-hidden="true">
      <div className="body-paths__glow" />
      <img className="body-paths__layer body-paths__layer--body" src={bodyOutline} alt="" />
      <img className="body-paths__layer body-paths__layer--red" src={energyRed} alt="" />
      <img className="body-paths__layer body-paths__layer--gold" src={energyGold} alt="" />
    </div>
  );
}

export default BodyPaths;
