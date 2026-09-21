import "./index.css";
import body from "./assets/body-silhouette.svg";
import jambes from "./assets/body-jambes.svg";
import red from "./assets/energy-red.svg";
import gold from "./assets/energy-gold.svg";
import points from "./assets/energy-points.svg";
import circle from "./assets/body-circle.svg";

function BodyPaths() {
  return (
    <div className="body-paths" aria-hidden="true">
      <div className="body-paths__glow" />
      <img className="body-paths__layer body-paths__layer--body" src={body} alt="" />
      <img className="body-paths__layer body-paths__layer--jambes" src={jambes} alt="" />
      <img className="body-paths__layer body-paths__layer--red" src={red} alt="" />
      <img className="body-paths__layer body-paths__layer--gold" src={gold} alt="" />
      <img className="body-paths__layer body-paths__layer--points" src={points} alt="" />
      <img className="body-paths__layer body-paths__layer--circle" src={circle} alt="" />
    </div>
  );
}

export default BodyPaths;
