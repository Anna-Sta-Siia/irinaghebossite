import logo from "../../assets/data/logobig.png";
import {
  LINKS_PAGE_URL,
  linksPageData,
} from "../../assets/data/linksPage";
import QrCodeCard from "../QrCodeCard";
import "./index.css";

const iconByName = {
  calendar: "◷",
  message: "✉",
  instagram: "◎",
  website: "⌂",
};

function LinksPage() {
  return (
    <main className="links-page">
      <div className="links-page__glow links-page__glow--one" />
      <div className="links-page__glow links-page__glow--two" />

      <section className="links-page__card">
        <header className="links-page__header">
          <img
            className="links-page__logo"
            src={logo}
            alt="Irina Recovery"
          />

          <p className="links-page__kicker">
            {linksPageData.title}
          </p>

          <h1 className="links-page__title">
            {linksPageData.subtitle}
          </h1>
        </header>

        <div className="links-page__links">
          {linksPageData.links.map((link) => (
            <a
              className="links-page__link"
              href={link.href}
              key={link.id}
              target={
                link.external
                  ? "_blank"
                  : undefined
              }
              rel={
                link.external
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              <span
                className="links-page__link-icon"
                aria-hidden="true"
              >
                {iconByName[link.icon]}
              </span>

              <span className="links-page__link-copy">
                <strong>{link.label}</strong>
                <small>{link.description}</small>
              </span>

              {link.badge && (
                <span className="links-page__badge">
                  {link.badge}
                </span>
              )}

              <span
                className="links-page__arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        <aside className="links-page__notice">
          <span aria-hidden="true">✦</span>
          <p>{linksPageData.workInProgress}</p>
        </aside>

        <QrCodeCard
          url={LINKS_PAGE_URL}
          compact
        />

        <footer className="links-page__footer">
          <span>
            © {new Date().getFullYear()} Irina Recovery
          </span>
        </footer>
      </section>
    </main>
  );
}

export default LinksPage;
