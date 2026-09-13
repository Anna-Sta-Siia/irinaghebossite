import {
  useMemo,
  useState,
} from "react";

import {
  normalizeSoft,
  validateBookingForm,
} from "../../guards";

import "./index.css";

const MOCK_DATES = [
  {
    id: "2026-09-15",
    day: "Mar",
    date: "15",
    label: "Mardi 15 septembre",
  },
  {
    id: "2026-09-16",
    day: "Mer",
    date: "16",
    label: "Mercredi 16 septembre",
  },
  {
    id: "2026-09-17",
    day: "Jeu",
    date: "17",
    label: "Jeudi 17 septembre",
  },
  {
    id: "2026-09-18",
    day: "Ven",
    date: "18",
    label: "Vendredi 18 septembre",
  },
];

const MOCK_SLOTS = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
];

function BookingFlow({
  isOpen,
  selection = [],
  onClose,
  onConfirmed,
  onClearSelection,
}) {
  const reservableItems =
    useMemo(
      () =>
        selection.filter(
          (item) =>
            item.type === "service"
        ),
      [selection]
    );

  const [step, setStep] =
    useState("service");

  const [
    selectedServiceId,
    setSelectedServiceId,
  ] = useState(
    reservableItems[0]?.id ?? null
  );

  const [
    selectedDateId,
    setSelectedDateId,
  ] = useState(null);

  const [
    selectedSlot,
    setSelectedSlot,
  ] = useState(null);

  const [client, setClient] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  const [touched, setTouched] =
    useState({});

  const selectedService =
    reservableItems.find(
      (item) =>
        item.id ===
        selectedServiceId
    ) ?? null;

  const selectedDate =
    MOCK_DATES.find(
      (date) =>
        date.id === selectedDateId
    ) ?? null;

  const validation =
    useMemo(
      () =>
        validateBookingForm(
          client
        ),
      [client]
    );

  const canContinueFromService =
    Boolean(selectedService);

  const canContinueFromCalendar =
    Boolean(
      selectedDate &&
        selectedSlot
    );

  const canConfirm =
    validation.isValid;

  const markTouched = (
    fieldName
  ) => {
    setTouched((current) => ({
      ...current,
      [fieldName]: true,
    }));
  };

  const errorFor = (
    fieldName
  ) =>
    touched[fieldName]
      ? validation.errors[
          fieldName
        ]
      : "";

  const handleClientChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setClient((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleClientBlur = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setClient((current) => ({
      ...current,
      [name]:
        normalizeSoft(value),
    }));

    markTouched(name);
  };

  const handleConfirm = () => {
    setTouched({
      name: true,
      email: true,
      phone: true,
    });

    if (
      !validation.isValid ||
      !selectedService ||
      !selectedDate ||
      !selectedSlot
    ) {
      return;
    }

    const booking = {
      service:
        selectedService,

      date:
        selectedDate,

      slot:
        selectedSlot,

      client: {
        name:
          normalizeSoft(
            client.name
          ),

        email:
          normalizeSoft(
            client.email
          ).toLowerCase(),

        phone:
          normalizeSoft(
            client.phone
          ),
      },
    };

    onConfirmed?.(booking);

    /*
      Une fois la réservation confirmée,
      on vide la sélection.
    */
    onClearSelection?.();

    setStep(
      "confirmation"
    );
  };

  const resetFlow = () => {
    setStep("service");

    setSelectedServiceId(
      reservableItems[0]?.id ??
        null
    );

    setSelectedDateId(null);

    setSelectedSlot(null);

    setClient({
      name: "",
      email: "",
      phone: "",
    });

    setTouched({});
  };

  const resetAndClose = () => {
    resetFlow();

    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="booking-flow"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-flow-title"
    >
      <button
        className="booking-flow__backdrop"
        type="button"
        onClick={resetAndClose}
        aria-label="Fermer la réservation"
      />

      <section className="booking-flow__modal">
        <button
          className="booking-flow__close"
          type="button"
          onClick={resetAndClose}
          aria-label="Fermer"
        >
          ×
        </button>

        {step !==
          "confirmation" && (
          <div className="booking-flow__progress">
            <span
              className={
                step === "service"
                  ? "booking-flow__progress-dot booking-flow__progress-dot--active"
                  : "booking-flow__progress-dot booking-flow__progress-dot--done"
              }
            />

            <span
              className={
                step === "calendar"
                  ? "booking-flow__progress-dot booking-flow__progress-dot--active"
                  : step === "details"
                    ? "booking-flow__progress-dot booking-flow__progress-dot--done"
                    : "booking-flow__progress-dot"
              }
            />

            <span
              className={
                step === "details"
                  ? "booking-flow__progress-dot booking-flow__progress-dot--active"
                  : "booking-flow__progress-dot"
              }
            />
          </div>
        )}

        {/* ===========================
            STEP 1 — SERVICE
        =========================== */}

        {step === "service" && (
          <>
            <p className="booking-flow__eyebrow">
              Votre réservation
            </p>

            <h2
              className="booking-flow__title"
              id="booking-flow-title"
            >
              Choisissez votre accompagnement
            </h2>

            <p className="booking-flow__intro">
              Sélectionnez la prestation que vous souhaitez réserver.
            </p>

            <div className="booking-flow__services">
              {reservableItems.map(
                (item) => {
                  const firstPrice =
                    item.prices?.[0];

                  const isSelected =
                    item.id ===
                    selectedServiceId;

                  return (
                    <button
                      key={item.id}
                      className={`booking-flow__service ${
                        isSelected
                          ? "booking-flow__service--selected"
                          : ""
                      }`}
                      type="button"
                      onClick={() =>
                        setSelectedServiceId(
                          item.id
                        )
                      }
                    >
                      <strong>
                        {item.title}
                      </strong>

                      {item.durationMinutes && (
                        <span>
                          {
                            item.durationMinutes
                          }{" "}
                          min
                        </span>
                      )}

                      {firstPrice?.price && (
                        <span>
                          {
                            firstPrice.price
                          }
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            <div className="booking-flow__actions">
              <button
                className="booking-flow__button booking-flow__button--primary"
                type="button"
                disabled={
                  !canContinueFromService
                }
                onClick={() =>
                  setStep(
                    "calendar"
                  )
                }
              >
                Choisir un créneau
              </button>
            </div>
          </>
        )}

        {/* ===========================
            STEP 2 — CALENDAR
        =========================== */}

        {step === "calendar" && (
          <>
            <p className="booking-flow__eyebrow">
              Votre réservation
            </p>

            <h2 className="booking-flow__title">
              Choisissez votre créneau
            </h2>

            {selectedService && (
              <div className="booking-flow__summary-line">
                <strong>
                  {
                    selectedService.title
                  }
                </strong>
              </div>
            )}

            <div className="booking-flow__calendar">
              <div className="booking-flow__dates">
                {MOCK_DATES.map(
                  (date) => (
                    <button
                      key={date.id}
                      className={`booking-flow__date ${
                        selectedDateId ===
                        date.id
                          ? "booking-flow__date--selected"
                          : ""
                      }`}
                      type="button"
                      onClick={() => {
                        setSelectedDateId(
                          date.id
                        );

                        setSelectedSlot(
                          null
                        );
                      }}
                    >
                      <span>
                        {date.day}
                      </span>

                      <strong>
                        {date.date}
                      </strong>
                    </button>
                  )
                )}
              </div>

              <div className="booking-flow__slots">
                {MOCK_SLOTS.map(
                  (slot) => (
                    <button
                      key={slot}
                      className={`booking-flow__slot ${
                        selectedSlot ===
                        slot
                          ? "booking-flow__slot--selected"
                          : ""
                      }`}
                      type="button"
                      onClick={() =>
                        setSelectedSlot(
                          slot
                        )
                      }
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="booking-flow__actions booking-flow__actions--split">
              <button
                className="booking-flow__button booking-flow__button--ghost"
                type="button"
                onClick={() =>
                  setStep("service")
                }
              >
                Revenir
              </button>

              <button
                className="booking-flow__button booking-flow__button--primary"
                type="button"
                disabled={
                  !canContinueFromCalendar
                }
                onClick={() =>
                  setStep(
                    "details"
                  )
                }
              >
                Continuer
              </button>
            </div>
          </>
        )}

        {/* ===========================
            STEP 3 — DETAILS
        =========================== */}

        {step === "details" && (
          <>
            <p className="booking-flow__eyebrow">
              Presque terminé
            </p>

            <h2 className="booking-flow__title">
              Vos coordonnées
            </h2>

            <div className="booking-flow__recap">
              <strong>
                {
                  selectedService?.title
                }
              </strong>

              <span>
                {
                  selectedDate?.label
                }
              </span>

              <span>
                {selectedSlot}
              </span>
            </div>

            <div className="booking-flow__form">
              <label className="booking-flow__field">
                <span>
                  Nom et prénom
                </span>

                <input
                  type="text"
                  name="name"
                  value={
                    client.name
                  }
                  onChange={
                    handleClientChange
                  }
                  onBlur={
                    handleClientBlur
                  }
                  autoComplete="name"
                  maxLength={35}
                  aria-invalid={
                    Boolean(
                      errorFor(
                        "name"
                      )
                    )
                  }
                />

                {errorFor("name") && (
                  <span
                    className="booking-flow__field-error"
                    role="alert"
                  >
                    {
                      errorFor(
                        "name"
                      )
                    }
                  </span>
                )}
              </label>

              <label className="booking-flow__field">
                <span>
                  E-mail
                </span>

                <input
                  type="email"
                  name="email"
                  value={
                    client.email
                  }
                  onChange={
                    handleClientChange
                  }
                  onBlur={
                    handleClientBlur
                  }
                  autoComplete="email"
                  maxLength={120}
                  aria-invalid={
                    Boolean(
                      errorFor(
                        "email"
                      )
                    )
                  }
                />

                {errorFor("email") && (
                  <span
                    className="booking-flow__field-error"
                    role="alert"
                  >
                    {
                      errorFor(
                        "email"
                      )
                    }
                  </span>
                )}
              </label>

              <label className="booking-flow__field">
                <span>
                  Téléphone
                  <small>
                    {" "}
                    (facultatif)
                  </small>
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={
                    client.phone
                  }
                  onChange={
                    handleClientChange
                  }
                  onBlur={
                    handleClientBlur
                  }
                  autoComplete="tel"
                  maxLength={24}
                  aria-invalid={
                    Boolean(
                      errorFor(
                        "phone"
                      )
                    )
                  }
                />

                {errorFor("phone") && (
                  <span
                    className="booking-flow__field-error"
                    role="alert"
                  >
                    {
                      errorFor(
                        "phone"
                      )
                    }
                  </span>
                )}
              </label>
            </div>

            <div className="booking-flow__actions booking-flow__actions--split">
              <button
                className="booking-flow__button booking-flow__button--ghost"
                type="button"
                onClick={() =>
                  setStep(
                    "calendar"
                  )
                }
              >
                Revenir
              </button>

              <button
                className="booking-flow__button booking-flow__button--primary"
                type="button"
                disabled={
                  !canConfirm
                }
                onClick={
                  handleConfirm
                }
              >
                Confirmer
              </button>
            </div>
          </>
        )}

        {/* ===========================
            CONFIRMATION
        =========================== */}

        {step ===
          "confirmation" && (
          <div className="booking-flow__confirmation">
            <div className="booking-flow__confirmation-mark">
              ✓
            </div>

            <p className="booking-flow__eyebrow">
              Rendez-vous enregistré
            </p>

            <h2 className="booking-flow__title">
              Merci{" "}
              {
                normalizeSoft(
                  client.name
                )
              }
            </h2>

            <div className="booking-flow__confirmation-card">
              <strong>
                {
                  selectedService?.title
                }
              </strong>

              <span>
                {
                  selectedDate?.label
                }
              </span>

              <span>
                {selectedSlot}
              </span>

              {selectedService?.durationMinutes && (
                <span>
                  {
                    selectedService
                      .durationMinutes
                  }{" "}
                  min
                </span>
              )}
            </div>

            <p className="booking-flow__confirmation-text">
              Une confirmation a été simulée pour{" "}
              <strong>
                {
                  normalizeSoft(
                    client.email
                  ).toLowerCase()
                }
              </strong>
              .
            </p>

            <p className="booking-flow__simulation-note">
              Cette réservation est une simulation. Aucun rendez-vous réel ni e-mail n’a été envoyé.
            </p>

            <button
              className="booking-flow__button booking-flow__button--primary"
              type="button"
              onClick={
                resetAndClose
              }
            >
              Terminer
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default BookingFlow;