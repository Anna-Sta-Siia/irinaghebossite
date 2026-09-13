import "./index.css";

function Loader({
  label = "Un instant…",
  fullscreen = false,
}) {
  return (
    <div
      className={`loader ${
        fullscreen
          ? "loader--fullscreen"
          : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="loader__mark">
        <span className="loader__ring" />
        <span className="loader__dot" />
      </div>

      {label && (
        <p className="loader__label">
          {label}
        </p>
      )}
    </div>
  );
}

export default Loader;