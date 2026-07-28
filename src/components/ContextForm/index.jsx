import {
  useEffect,
  useMemo,
  useRef,
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
      validateContextForm(type, values),
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
      normalizeSoft(values[fieldName])
    );

    markTouched(fieldName);
  };

  const touchAllFields = () => {
    setTouched(
      Object.keys(validation.errors).reduce(
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
        name: normalizeSoft(values.name),
        email: normalizeSoft(
          values.email
        ).toLowerCase(),
        message: normalizeSoft(
          values.message
        ),
        location: normalizeSoft(
          values.location
        ),
      },
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await new Promise((resolve) =>
          window.setTimeout(resolve, 500)
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

        <div className="context-form__scroll">
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
              <span aria-hidden="true">✓</span>
              <h3>Merci</h3>
              <p>{config.successMessage}</p>

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
                      ? "E-mail (facultatif)"
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
                    label="Téléphone (facultatif)"
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
                    <CustomSelect
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

                    <RatingField
                      value={values.rating}
                      error={errorFor("rating")}
                      onChange={updateValue}
                      onTouch={markTouched}
                    />
                  </>
                )}

                {type === "proposal" && (
                  <>
                    <Field
                      label="Nom de la structure"
                      name="structure"
                      value={values.structure}
                      error={errorFor("structure")}
                      onChange={updateValue}
                      onBlur={normalizeField}
                      maxLength={80}
                    />

                    <CustomSelect
                      label="Type de structure"
                      name="structureType"
                      value={values.structureType}
                      error={errorFor(
                        "structureType"
                      )}
                      options={
                        STRUCTURE_OPTIONS
                      }
                      onChange={updateValue}
                      onBlur={markTouched}
                    />

                    <NumberField
                      label="Nombre de participants"
                      name="participants"
                      value={values.participants}
                      error={errorFor(
                        "participants"
                      )}
                      onChange={updateValue}
                      onBlur={markTouched}
                      min={1}
                      max={10000}
                    />

                    <Field
                      label="Ville ou lieu"
                      name="location"
                      value={values.location}
                      error={errorFor("location")}
                      onChange={updateValue}
                      onBlur={normalizeField}
                      maxLength={80}
                      placeholder="Ex. Paris 11e"
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
                      message={errorFor(
                        "publicationConsent"
                      )}
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
        </div>
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
        aria-invalid={Boolean(error)}
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

function CustomSelect({
  label,
  name,
  value,
  error,
  options,
  onChange,
  onBlur,
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [highlightedIndex, setHighlightedIndex] =
    useState(-1);

  const selectRef = useRef(null);
  const errorId = `${name}-error`;
  const listboxId = `${name}-listbox`;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      closeOnOutsideClick
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeOnOutsideClick
      );
    };
  }, []);

  const chooseOption = (option) => {
    onChange(name, option);
    onBlur(name);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
      }

      const direction =
        event.key === "ArrowDown"
          ? 1
          : -1;

      setHighlightedIndex((current) => {
        const initial =
          current < 0
            ? Math.max(
                options.indexOf(value),
                0
              )
            : current;

        return (
          initial +
          direction +
          options.length
        ) % options.length;
      });
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      if (
        isOpen &&
        highlightedIndex >= 0
      ) {
        chooseOption(
          options[highlightedIndex]
        );
      } else {
        setIsOpen((current) => !current);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="context-form__field"
      ref={selectRef}
    >
      <span className="context-form__label">
        {label}
      </span>

      <div className="context-form__custom-select">
        <button
          className="context-form__select-button"
          type="button"
          onClick={() =>
            setIsOpen((current) => !current)
          }
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        >
          <span
            className={
              value
                ? ""
                : "context-form__select-placeholder"
            }
          >
            {value || "Sélectionner"}
          </span>

          <span
            className={`context-form__select-chevron ${
              isOpen
                ? "context-form__select-chevron--open"
                : ""
            }`}
            aria-hidden="true"
          >
            ⌄
          </span>
        </button>

        {isOpen && (
          <div
            className="context-form__select-menu"
            id={listboxId}
            role="listbox"
            aria-label={label}
          >
            {options.map((option, index) => (
              <button
                className={`context-form__select-option ${
                  value === option
                    ? "context-form__select-option--selected"
                    : ""
                } ${
                  highlightedIndex === index
                    ? "context-form__select-option--highlighted"
                    : ""
                }`}
                type="button"
                role="option"
                aria-selected={
                  value === option
                }
                key={option}
                onPointerEnter={() =>
                  setHighlightedIndex(index)
                }
                onClick={() =>
                  chooseOption(option)
                }
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage
        id={errorId}
        message={error}
      />
    </div>
  );
}

function NumberField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  min,
  max,
}) {
  const errorId = `${name}-error`;

  const changeBy = (amount) => {
    const current =
      Number(value) || min;

    const next = Math.min(
      max,
      Math.max(min, current + amount)
    );

    onChange(name, String(next));
    onBlur(name);
  };

  return (
    <div className="context-form__field">
      <span className="context-form__label">
        {label}
      </span>

      <div className="context-form__number-wrap">
        <input
          className="context-form__input context-form__number-input"
          type="number"
          name={name}
          value={value}
          min={min}
          max={max}
          inputMode="numeric"
          onChange={(event) =>
            onChange(
              name,
              event.target.value
            )
          }
          onBlur={() => onBlur(name)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        />

        <div className="context-form__number-controls">
          <button
            type="button"
            onClick={() => changeBy(1)}
            aria-label="Ajouter un participant"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => changeBy(-1)}
            aria-label="Retirer un participant"
          >
            −
          </button>
        </div>
      </div>

      <ErrorMessage
        id={errorId}
        message={error}
      />
    </div>
  );
}

function RatingField({
  value,
  error,
  onChange,
  onTouch,
}) {
  return (
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
                Number(value) >= rating
                  ? "context-form__star context-form__star--active"
                  : "context-form__star"
              }
              onClick={() => {
                onChange(
                  "rating",
                  String(rating)
                );
                onTouch("rating");
              }}
              aria-label={`${rating} sur 5`}
              aria-pressed={
                Number(value) === rating
              }
            >
              ★
            </button>
          )
        )}
      </div>

      <ErrorMessage
        id="rating-error"
        message={error}
      />
    </div>
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
        aria-invalid={Boolean(error)}
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
