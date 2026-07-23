import { useState } from "react";
import "./index.css";

const MOCK_PURCHASE_DATE = new Date("2026-07-23T12:00:00");

const addOneYear = (date) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + 1);
  return result;
};

const formatFrenchDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

const MOCK_CODE = "IR-DISC-2026-001";
const MOCK_EXPIRATION_DATE = addOneYear(
  MOCK_PURCHASE_DATE
);

function GiftCardMock() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [isPaymentSimulated, setIsPaymentSimulated] =
    useState(false);

  const toggleCard = () => {
    setIsFlipped((currentValue) => !currentValue);
  };

  const simulatePayment = () => {
    setIsPaymentSimulated(true);
  };

  return (
    <div className="gift-card-mock">
      <div className="gift-card-mock__preview">
        <p className="gift-card-mock__hint">
          Cliquez sur la carte pour voir le recto ou le verso.
        </p>

        <button
          className={`gift-card-mock__flipper ${
            isFlipped
              ? "gift-card-mock__flipper--flipped"
              : ""
          }`}
          type="button"
          onClick={toggleCard}
          aria-label={
            isFlipped
              ? "Afficher le recto de la carte"
              : "Afficher le verso de la carte"
          }
          aria-pressed={isFlipped}
        >
          <span className="gift-card-mock__inner">
            <span className="gift-card-mock__face gift-card-mock__front">
              <span
                className="gift-card-mock__circle"
                aria-hidden="true"
              />

              <span className="gift-card-mock__brand">
                Irina Recovery
              </span>

              <span className="gift-card-mock__front-center">
                <span className="gift-card-mock__eyebrow">
                  Carte cadeau digitale
                </span>

                <strong className="gift-card-mock__title">
                  Pack Découverte
                </strong>

                <span className="gift-card-mock__description">
                  Une heure pour découvrir trois approches
                  de massage.
                </span>

                <span className="gift-card-mock__duration">
                  3 massages de 20 minutes au choix
                </span>
              </span>

              <strong className="gift-card-mock__price">
                150 €
              </strong>
            </span>

            <span className="gift-card-mock__face gift-card-mock__back">
              <span className="gift-card-mock__personal">
                <span className="gift-card-mock__line">
                  <small>Pour</small>
                  <strong>
                    {recipientName ||
                      "Prénom du bénéficiaire"}
                  </strong>
                </span>

                <span className="gift-card-mock__line">
                  <small>De la part de</small>
                  <strong>
                    {buyerName || "Votre prénom"}
                  </strong>
                </span>

                <span className="gift-card-mock__message">
                  {message ||
                    "Votre message personnel apparaîtra ici."}
                </span>
              </span>

              <span className="gift-card-mock__administrative">
                <span>
                  <small>Code</small>
                  <strong>{MOCK_CODE}</strong>
                </span>

                <span>
                  <small>Valable jusqu’au</small>
                  <strong>
                    {formatFrenchDate(
                      MOCK_EXPIRATION_DATE
                    )}
                  </strong>
                </span>

                <em>
                  Carte digitale valable 12 mois et
                  transférable.
                </em>
              </span>
            </span>
          </span>
        </button>

        <button
          className="gift-card-mock__turn"
          type="button"
          onClick={toggleCard}
        >
          {isFlipped ? "Voir le recto" : "Voir le verso"}
          <span aria-hidden="true">↻</span>
        </button>
      </div>

      <div className="gift-card-mock__editor">
        <div className="gift-card-mock__heading">
          <p>Carte cadeau digitale</p>
          <h2>Personnalisez votre carte</h2>
          <span>
            Le code et la date de validité seront générés
            après le paiement.
          </span>
        </div>

        <div className="gift-card-mock__form">
          <label>
            <span>Nom du bénéficiaire</span>
            <input
              type="text"
              value={recipientName}
              onChange={(event) =>
                setRecipientName(event.target.value)
              }
              placeholder="Ex. Sophie"
              maxLength={40}
            />
          </label>

          <label>
            <span>De la part de</span>
            <input
              type="text"
              value={buyerName}
              onChange={(event) =>
                setBuyerName(event.target.value)
              }
              placeholder="Ex. Marie"
              maxLength={40}
            />
          </label>

          <label className="gift-card-mock__wide">
            <span>Message personnel</span>
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Une belle parenthèse rien que pour toi…"
              maxLength={110}
              rows={4}
            />
            <small>{message.length}/110 caractères</small>
          </label>

          <label className="gift-card-mock__wide">
            <span>E-mail de réception</span>
            <input
              type="email"
              value={deliveryEmail}
              onChange={(event) =>
                setDeliveryEmail(event.target.value)
              }
              placeholder="exemple@email.fr"
            />
          </label>
        </div>

        <button
          className="gift-card-mock__payment"
          type="button"
          onClick={simulatePayment}
          disabled={
            !recipientName.trim() ||
            !buyerName.trim() ||
            !deliveryEmail.trim()
          }
        >
          Simuler le paiement de 150 €
        </button>

        <p
          className="gift-card-mock__status"
          aria-live="polite"
        >
          {isPaymentSimulated
            ? `Simulation réussie : la carte serait envoyée à ${deliveryEmail}.`
            : "Simulation uniquement : aucun paiement réel."}
        </p>
      </div>
    </div>
  );
}

export default GiftCardMock;
