import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FORM_CONFIGS,
  REVIEW_SERVICE_OPTIONS,
  STRUCTURE_OPTIONS,
} from "./formConfigs";

import {
  normalizeSoft,
  validateContextForm,
} from "../../guards";

import "./index.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  service: "",
  rating: "",
  message: "",
  publicationConsent: false,
  structure: "",
  structureType: "",
  participants: "",
  location: "",
  period: "",
};

function ContextForm({
  type = "contact",
  context = "",
  onClose,
  onSubmit,
}) {
  const config =
    FORM_CONFIGS[type] ??
    FORM_CONFIGS.contact;

  const [values, setValues] =
    useState(INITIAL_VALUES);

  const [touched, setTouched] =
    useState({});

  const [submitState, setSubmitState] =
    useState("idle");

  const validation = useMemo(
    () =>
      validateContextForm(
        type,
        values
      ),
    [type, values]
  );

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  const updateValue = (
    fieldName,
    value
  ) => {
    setValues((current) => ({
      ...current,
      [fieldName]: value,
    }));

    setSubmitState("idle");
  };

  const markTouched = (fieldName) => {
    setTouched((current) => ({
      ...current,
      [fieldName]: true,
    }));
  };

  const errorFor = (fieldName) =>
    touched[fieldName]
      ? validation.errors[fieldName]
      : "";

  const normalizeField = (
    fieldName
  ) => {
    updateValue(
      fieldName,
      normalizeSoft(
        values[fieldName]
      )
    );

    markTouched(fieldName);
  };

  const touchAllFields = () => {
    setTouched(
      Object.keys(
        validation.errors
      ).reduce(
        (result, fieldName) => ({
          ...result,
          [fieldName]: true,
        }),
        {}
      )
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    touchAllFields();

    if (!validation.isValid) {
      return;
    }

    setSubmitState("submitting");

    const payload = {
      type,
      context,
      recipient:
        "irinacoachprepa@gmail.com",
      values: {
        ...values,
        name: normalizeSoft(
          values.name
        ),
        email: normalizeSoft(
          values.email
        ).toLowerCase(),
        message: normalizeSoft(
          values.message
        ),
      },
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await new Promise(
          (resolve) =>
            window.setTimeout(
              resolve,
              500
            )
        );
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div
      className="context-form-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="context-form-title"
    >
      <button
        className="context-form-overlay__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Fermer le formulaire"
      />

      <section
        className={`context-form context-form--${type}`}
      >
        <button
          className="context-form__close"
          type="button"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>

        <header className="context-form__header">
          <p className="context-form__eyebrow">
            {config.eyebrow}
          </p>

          <h2
            className="context-form__title"
            id="context-form-title"
          >
            {config.title}
          </h2>

          {context && (
            <p className="context-form__context">
              {context}
            </p>
          )}

          <p className="context-form__intro">
            {config.intro}
          </p>
        </header>

        {submitState === "success" ? (
          <div
            className="context-form__success"
            role="status"
          >
            <span aria-hidden="true">
              ✓
            </span>

            <h3>Merci</h3>

            <p>
              {config.successMessage}
            </p>

            <button
              type="button"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        ) : (
          <form
            className="context-form__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="context-form__grid">
              <Field
                label="Nom et prénom"
                name="name"
                value={values.name}
                error={errorFor("name")}
                onChange={updateValue}
                onBlur={normalizeField}
                autoComplete="name"
                maxLength={35}
              />

              <Field
                label={
                  type === "review"
                    ? "E-mail facultatif"
                    : "E-mail"
                }
                name="email"
                type="email"
                value={values.email}
                error={errorFor("email")}
                onChange={updateValue}
                onBlur={normalizeField}
                autoComplete="email"
                maxLength={120}
              />

              {(type === "contact" ||
                type === "proposal") && (
                <Field
                  label="Téléphone facultatif"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  error={errorFor("phone")}
                  onChange={updateValue}
                  onBlur={normalizeField}
                  autoComplete="tel"
                  maxLength={24}
                />
              )}

              {type === "contact" && (
                <Field
                  label="Sujet"
                  name="subject"
                  value={values.subject}
                  error={errorFor("subject")}
                  onChange={updateValue}
                  onBlur={normalizeField}
                  maxLength={80}
                />
              )}

              {type === "review" && (
                <>
                  <SelectField
                    label="Accompagnement"
                    name="service"
                    value={values.service}
                    error={errorFor("service")}
                    options={
                      REVIEW_SERVICE_OPTIONS
                    }
                    onChange={updateValue}
                    onBlur={markTouched}
                  />

                  <div className="context-form__field">
                    <span className="context-form__label">
                      Votre note
                    </span>

                    <div
                      className="context-form__rating"
                      role="radiogroup"
                      aria-label="Votre note"
                    >
                      {[1, 2, 3, 4, 5].map(
                        (rating) => (
                          <button
                            type="button"
                            key={rating}
                            className={
                              Number(
                                values.rating
                              ) >= rating
                                ? "context-form__star context-form__star--active"
                                : "context-form__star"
                            }
                            onClick={() => {
                              updateValue(
                                "rating",
                                String(rating)
                              );

                              markTouched(
                                "rating"
                              );
                            }}
                            aria-label={`${rating} sur 5`}
                            aria-pressed={
                              Number(
                                values.rating
                              ) === rating
                            }
                          >
                            ★
                          </button>
                        )
                      )}
                    </div>

                    <ErrorMessage
                      id="rating-error"
                      message={
                        errorFor("rating")
                      }
                    />
                  </div>
                </>
              )}

              {type === "proposal" && (
                <>
                  <Field
                    label="Nom de la structure"
                    name="structure"
                    value={
                      values.structure
                    }
                    error={
                      errorFor(
                        "structure"
                      )
                    }
                    onChange={updateValue}
                    onBlur={normalizeField}
                    maxLength={80}
                  />

                  <SelectField
                    label="Type de structure"
                    name="structureType"
                    value={
                      values.structureType
                    }
                    error={
                      errorFor(
                        "structureType"
                      )
                    }
                    options={
                      STRUCTURE_OPTIONS
                    }
                    onChange={updateValue}
                    onBlur={markTouched}
                  />

                  <Field
                    label="Nombre de participants"
                    name="participants"
                    type="number"
                    value={
                      values.participants
                    }
                    error={
                      errorFor(
                        "participants"
                      )
                    }
                    onChange={updateValue}
                    onBlur={markTouched}
                    min="1"
                    max="10000"
                  />

                  <Field
                    label="Ville ou lieu"
                    name="location"
                    value={
                      values.location
                    }
                    error={
                      errorFor(
                        "location"
                      )
                    }
                    onChange={updateValue}
                    onBlur={normalizeField}
                    maxLength={80}
                  />

                  <Field
                    label="Période souhaitée"
                    name="period"
                    value={values.period}
                    error={
                      errorFor("period")
                    }
                    onChange={updateValue}
                    onBlur={normalizeField}
                    maxLength={80}
                  />
                </>
              )}

              <TextareaField
                label={
                  type === "review"
                    ? "Votre avis"
                    : type === "proposal"
                      ? "Décrivez votre projet"
                      : "Votre message"
                }
                name="message"
                value={values.message}
                error={errorFor("message")}
                onChange={updateValue}
                onBlur={normalizeField}
                maxLength={
                  type === "review"
                    ? 600
                    : type === "proposal"
                      ? 1000
                      : 800
                }
              />

              {type === "review" && (
                <label className="context-form__consent">
                  <input
                    type="checkbox"
                    checked={
                      values.publicationConsent
                    }
                    onChange={(event) => {
                      updateValue(
                        "publicationConsent",
                        event.target.checked
                      );

                      markTouched(
                        "publicationConsent"
                      );
                    }}
                  />

                  <span>
                    J’autorise la publication
                    de cet avis sur le site
                    d’Irina Recovery.
                  </span>

                  <ErrorMessage
                    id="publication-consent-error"
                    message={
                      errorFor(
                        "publicationConsent"
                      )
                    }
                  />
                </label>
              )}
            </div>

            <footer className="context-form__footer">
              <button
                className="context-form__submit"
                type="submit"
                disabled={
                  submitState ===
                  "submitting"
                }
              >
                {submitState ===
                "submitting"
                  ? "Envoi en cours…"
                  : config.submitLabel}
              </button>

              <p className="context-form__notice">
                Cette version simule
                l’envoi. La connexion à
                l’adresse d’Irina sera
                ajoutée avec le service
                d’envoi ou le backend.
              </p>

              {submitState === "error" && (
                <p
                  className="context-form__submit-error"
                  role="alert"
                >
                  Une erreur est survenue.
                  Réessayez.
                </p>
              )}
            </footer>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
  ...inputProps
}) {
  const errorId = `${name}-error`;

  return (
    <label className="context-form__field">
      <span className="context-form__label">
        {label}
      </span>

      <input
        className="context-form__input"
        type={type}
        name={name}
        value={value}
        onChange={(event) =>
          onChange(
            name,
            event.target.value
          )
        }
        onBlur={() => onBlur(name)}
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={errorId}
        {...inputProps}
      />

      <ErrorMessage
        id={errorId}
        message={error}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  error,
  options,
  onChange,
  onBlur,
}) {
  const errorId = `${name}-error`;

  return (
    <label className="context-form__field">
      <span className="context-form__label">
        {label}
      </span>

      <select
        className="context-form__input"
        name={name}
        value={value}
        onChange={(event) =>
          onChange(
            name,
            event.target.value
          )
        }
        onBlur={() => onBlur(name)}
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={errorId}
      >
        <option value="">
          Sélectionner
        </option>

        {options.map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ErrorMessage
        id={errorId}
        message={error}
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  maxLength,
}) {
  const errorId = `${name}-error`;

  return (
    <label className="context-form__field context-form__field--wide">
      <span className="context-form__label">
        {label}
      </span>

      <textarea
        className="context-form__input context-form__textarea"
        name={name}
        value={value}
        onChange={(event) =>
          onChange(
            name,
            event.target.value
          )
        }
        onBlur={() => onBlur(name)}
        maxLength={maxLength}
        rows={5}
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={errorId}
      />

      <small className="context-form__counter">
        {value.length}/{maxLength}
      </small>

      <ErrorMessage
        id={errorId}
        message={error}
      />
    </label>
  );
}

function ErrorMessage({
  id,
  message,
}) {
  return (
    <span
      className="context-form__error"
      id={id}
      aria-live="polite"
    >
      {message}
    </span>
  );
}

export default ContextForm;
