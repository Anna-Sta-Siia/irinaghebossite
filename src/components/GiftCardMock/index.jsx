import { useState } from "react";
import smallLogo from "../../assets/data/logosmall.png";
import {
  graphemeLength,
  normalizeSoft,
  validateGiftCardFields,
} from "../../guards";
import "./index.css";

const MOCK_PURCHASE_DATE = new Date(
  "2026-07-23T12:00:00"
);

const addOneYear = (date) => {
  const result = new Date(date);

  result.setFullYear(
    result.getFullYear() + 1
  );

  return result;
};

const formatFrenchDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

const MOCK_CODE = "IR-DISC-2026-001";

const MOCK_EXPIRATION_DATE =
  addOneYear(MOCK_PURCHASE_DATE);

function GiftCardMock() {
  const [isFlipped, setIsFlipped] =
    useState(false);

  const [recipientName, setRecipientName] =
    useState("");

  const [buyerName, setBuyerName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [deliveryEmail, setDeliveryEmail] =
    useState("");

  const [touched, setTouched] = useState({});

  const [
    isPaymentSimulated,
    setIsPaymentSimulated,
  ] = useState(false);

  const validation =
    validateGiftCardFields({
      recipientName,
      buyerName,
      message,
      deliveryEmail,
    });

  const markAsTouched = (fieldName) => {
    setTouched((current) => ({
      ...current,
      [fieldName]: true,
    }));
  };

  const handleTextChange = (
    setter,
    maxLength
  ) => (event) => {
    const nextValue = event.target.value;

    if (
      graphemeLength(nextValue) <= maxLength
    ) {
      setter(nextValue);
      setIsPaymentSimulated(false);
    }
  };

  const handleNameBlur = (
    fieldName,
    value,
    setter
  ) => {
    setter(normalizeSoft(value));
    markAsTouched(fieldName);
  };

  const handleEmailBlur = () => {
    setDeliveryEmail(
      normalizeSoft(deliveryEmail).toLowerCase()
    );

    markAsTouched("deliveryEmail");
  };

  const simulatePayment = () => {
    setTouched({
      recipientName: true,
      buyerName: true,
      message: true,
      deliveryEmail: true,
    });

    if (!validation.isValid) {
      return;
    }

    setIsPaymentSimulated(true);
  };

  const fieldError = (fieldName) =>
    touched[fieldName]
      ? validation.errors[fieldName]
      : "";

  const toggleCard = () => {
    setIsFlipped((value) => !value);
  };

  return (
    <div className="gift-card-mock">
      <div className="gift-card-mock__preview">
        <p className="gift-card-mock__hint">
          Cliquez sur la carte pour voir le recto
          ou le verso.
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
              <img
                className="gift-card-mock__front-logo"
                src={smallLogo}
                alt=""
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
                  Une heure pour découvrir mon approche
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
                    {normalizeSoft(recipientName) ||
                      "Prénom du bénéficiaire"}
                  </strong>
                </span>

                <span className="gift-card-mock__line">
                  <small>De la part de</small>

                  <strong>
                    {normalizeSoft(buyerName) ||
                      "Votre prénom"}
                  </strong>
                </span>

                <span className="gift-card-mock__message">
                  {normalizeSoft(message) ||
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
                  Carte digitale valable 12 mois
                  et transférable
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
          {isFlipped
            ? "Voir le recto"
            : "Voir le verso"}

          <span aria-hidden="true">↻</span>
        </button>
      </div>

      <div className="gift-card-mock__editor">
        <div className="gift-card-mock__heading">
          <p>Carte cadeau digitale</p>

          <h2>Personnalisez votre carte</h2>

          <span>
            Le code et la date de validité seront
            générés après le paiement
          </span>
        </div>

        <div className="gift-card-mock__form">
          <label>
            <span>Nom du bénéficiaire</span>

            <input
              type="text"
              value={recipientName}
              onChange={handleTextChange(
                setRecipientName,
                35
              )}
              onBlur={() =>
                handleNameBlur(
                  "recipientName",
                  recipientName,
                  setRecipientName
                )
              }
              placeholder="Ex. Sophie"
              autoComplete="off"
              aria-invalid={
                Boolean(
                  fieldError("recipientName")
                )
              }
              aria-describedby="recipient-name-error"
            />

            <small className="gift-card-mock__field-meta">
              {graphemeLength(recipientName)}/35
            </small>

            <span
              className="gift-card-mock__error"
              id="recipient-name-error"
              aria-live="polite"
            >
              {fieldError("recipientName")}
            </span>
          </label>

          <label>
            <span>De la part de</span>

            <input
              type="text"
              value={buyerName}
              onChange={handleTextChange(
                setBuyerName,
                35
              )}
              onBlur={() =>
                handleNameBlur(
                  "buyerName",
                  buyerName,
                  setBuyerName
                )
              }
              placeholder="Ex. Marie"
              autoComplete="name"
              aria-invalid={
                Boolean(
                  fieldError("buyerName")
                )
              }
              aria-describedby="buyer-name-error"
            />

            <small className="gift-card-mock__field-meta">
              {graphemeLength(buyerName)}/35
            </small>

            <span
              className="gift-card-mock__error"
              id="buyer-name-error"
              aria-live="polite"
            >
              {fieldError("buyerName")}
            </span>
          </label>

          <label className="gift-card-mock__wide">
            <span>
              Message personnel
               (facultatif)
            </span>

            <textarea
              value={message}
              onChange={handleTextChange(
                setMessage,
                110
              )}
              onBlur={() =>
                markAsTouched("message")
              }
              placeholder="Une belle parenthèse rien que pour toi…"
              rows={4}
              aria-invalid={
                Boolean(
                  fieldError("message")
                )
              }
              aria-describedby="gift-message-error"
            />

            <small className="gift-card-mock__field-meta">
              {graphemeLength(message)}/110
              caractères
            </small>

            <span
              className="gift-card-mock__error"
              id="gift-message-error"
              aria-live="polite"
            >
              {fieldError("message")}
            </span>
          </label>

          <label className="gift-card-mock__wide">
            <span>E-mail de réception</span>

            <input
              type="email"
              value={deliveryEmail}
              onChange={handleTextChange(
                setDeliveryEmail,
                120
              )}
              onBlur={handleEmailBlur}
              placeholder="exemple@email.fr"
              autoComplete="email"
              inputMode="email"
              aria-invalid={
                Boolean(
                  fieldError("deliveryEmail")
                )
              }
              aria-describedby="delivery-email-error"
            />

            <span
              className="gift-card-mock__error"
              id="delivery-email-error"
              aria-live="polite"
            >
              {fieldError("deliveryEmail")}
            </span>
          </label>
        </div>

        <button
          className="gift-card-mock__payment"
          type="button"
          onClick={simulatePayment}
          disabled={!validation.isValid}
        >
          Simuler le paiement de 150 €
        </button>

        <p
          className="gift-card-mock__status"
          aria-live="polite"
        >
          {isPaymentSimulated
            ? `Simulation réussie : la carte serait envoyée à ${deliveryEmail}.`
            : "Le message personnel est facultatif. Aucun paiement réel ne sera effectué."}
        </p>
      </div>
    </div>
  );
}

export default GiftCardMock;
