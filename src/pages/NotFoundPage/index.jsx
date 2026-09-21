import { Link } from "react-router-dom";
import "./index.css";

function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__air" aria-hidden="true">
        <div className="not-found__layer not-found__layer--first"></div>
        <div className="not-found__layer not-found__layer--second"></div>
      </div>

      <div className="not-found__content">
        <p className="not-found__code">404</p>

        <h1 className="not-found__title">
          Ce chemin ne mène nulle part…
        </h1>

        <p className="not-found__text">
          La page que vous cherchez n’existe pas ou a peut-être changé
          d’adresse.
        </p>

        <div className="not-found__actions">
          <Link
            to="/"
            className="not-found__button not-found__button--primary"
          >
            Revenir à l’accueil
          </Link>

          <Link
            to="/services"
            className="not-found__button not-found__button--secondary"
          >
            Découvrir les accompagnements
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;