import {
  useEffect,
} from "react";

import "./index.css";


function OverlayShell({
  isOpen,
  onClose,

  children,

  labelledBy,
  ariaLabel,

  className = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement
        .style
        .overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement
      .style
      .overflow =
      "hidden";

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement
        .style
        .overflow =
        previousHtmlOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isOpen,
    onClose,
  ]);


  if (!isOpen) {
    return null;
  }


  const accessibilityProps =
    labelledBy
      ? {
          "aria-labelledby":
            labelledBy,
        }
      : {
          "aria-label":
            ariaLabel ??
            "Fenêtre de contenu",
        };


  return (
    <div
      className={`overlay-shell ${className}`}
      role="dialog"
      aria-modal="true"
      {...accessibilityProps}
    >
      <button
        className="overlay-shell__backdrop"
        type="button"
        onClick={
          onClose
        }
        aria-label="Fermer"
      />

      <div className="overlay-shell__modal">
        <button
          className="overlay-shell__close"
          type="button"
          onClick={
            onClose
          }
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="overlay-shell__content">
          {children}
        </div>
      </div>
    </div>
  );
}


export default OverlayShell;