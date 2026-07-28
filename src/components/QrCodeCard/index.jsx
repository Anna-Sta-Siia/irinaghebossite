import { QRCodeSVG } from "qrcode.react";
import "./index.css";

function QrCodeCard({
  url,
  compact = false,
}) {
  return (
    <section
      className={`qr-code-card ${
        compact
          ? "qr-code-card--compact"
          : ""
      }`}
    >
      <div className="qr-code-card__code">
        < QRCodeSVG
          value={url}
          size={compact ? 116 : 220}
          level="H"
          includeMargin
        />
      </div>

      <div className="qr-code-card__copy">
        <strong>Scannez pour retrouver tous mes liens</strong>
        <small>{url}</small>
      </div>
    </section>
  );
}

export default QrCodeCard;
