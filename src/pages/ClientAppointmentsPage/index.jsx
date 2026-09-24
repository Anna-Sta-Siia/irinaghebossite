import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./index.css";

import SiteLayout
  from "../../components/SiteLayout";


const INITIAL_APPOINTMENT = {
  id: "demo-rdv-001",

  service:
    "Massage sportif & fascias",

  date:
    "Samedi 26 septembre 2026",

  time:
    "14:30",

  duration:
    "60 min",

  location:
    "Paris",

  status:
    "confirmed",
};


const AVAILABLE_SLOTS = [
  {
    id: "slot-1",
    date:
      "Samedi 26 septembre 2026",
    time: "14:30",
  },
  {
    id: "slot-2",
    date:
      "Lundi 28 septembre 2026",
    time: "10:00",
  },
  {
    id: "slot-3",
    date:
      "Lundi 28 septembre 2026",
    time: "15:30",
  },
  {
    id: "slot-4",
    date:
      "Mercredi 30 septembre 2026",
    time: "11:00",
  },
];


function ClientAppointmentsPage() {
  const navigate =
    useNavigate();


  const [
    appointment,
    setAppointment,
  ] = useState(
    INITIAL_APPOINTMENT
  );


  const [
    activeAction,
    setActiveAction,
  ] = useState(null);


  const [
    selectedSlot,
    setSelectedSlot,
  ] = useState(
    "slot-1"
  );


  /* ===========================
     MODIFIER
  =========================== */

  const openModify = () => {
    setActiveAction(
      "modify"
    );
  };


  const saveModification = () => {
    const slot =
      AVAILABLE_SLOTS.find(
        (currentSlot) =>
          currentSlot.id ===
          selectedSlot
      );


    if (!slot) {
      return;
    }


    setAppointment(
      (current) => ({
        ...current,

        date:
          slot.date,

        time:
          slot.time,

        status:
          "confirmed",
      })
    );


    setActiveAction(null);
  };


  /* ===========================
     ANNULER
  =========================== */

  const openCancel = () => {
    setActiveAction(
      "cancel"
    );
  };


  const confirmCancellation =
    () => {
      setAppointment(
        (current) => ({
          ...current,

          status:
            "cancelled",
        })
      );


      setActiveAction(null);
    };


  /* ===========================
     RESET DEMO
  =========================== */

  const resetDemo = () => {
    setAppointment(
      INITIAL_APPOINTMENT
    );

    setSelectedSlot(
      "slot-1"
    );

    setActiveAction(null);
  };


  return (
    <SiteLayout>

      <div className="client-appointments">

        {/* ======================
            INTRO
        ====================== */}

        <header className="client-appointments__header">

          <p className="client-appointments__eyebrow">
            Démonstration
          </p>

          <h1 className="client-appointments__title">
            Mes rendez-vous
          </h1>

          <p className="client-appointments__intro">
            Retrouvez ici vos
            rendez-vous à venir et
            les actions disponibles.
          </p>

          <p className="client-appointments__demo-note">
            Cette page est une
            démonstration :
            aucune modification
            n’est enregistrée.
          </p>

        </header>


        {/* ======================
            RENDEZ-VOUS
        ====================== */}

        <section
          className="client-appointments__section"
          aria-labelledby="appointment-title"
        >

          <div className="client-appointments__section-heading">

            <h2
              id="appointment-title"
              className="client-appointments__section-title"
            >
              Rendez-vous à venir
            </h2>

          </div>


          <article
            className={`client-appointments__card ${
              appointment.status ===
              "cancelled"
                ? "client-appointments__card--cancelled"
                : ""
            }`}
          >

            <div className="client-appointments__card-main">

              <div>

                <p className="client-appointments__status">

                  {appointment.status ===
                  "cancelled"
                    ? "Rendez-vous annulé"
                    : "Confirmé"}

                </p>


                <h3 className="client-appointments__service">
                  {
                    appointment.service
                  }
                </h3>

              </div>


              <div className="client-appointments__details">

                <p>
                  <span>
                    Date
                  </span>

                  <strong>
                    {
                      appointment.date
                    }
                  </strong>
                </p>


                <p>
                  <span>
                    Heure
                  </span>

                  <strong>
                    {
                      appointment.time
                    }
                  </strong>
                </p>


                <p>
                  <span>
                    Durée
                  </span>

                  <strong>
                    {
                      appointment.duration
                    }
                  </strong>
                </p>


                <p>
                  <span>
                    Lieu
                  </span>

                  <strong>
                    {
                      appointment.location
                    }
                  </strong>
                </p>

              </div>

            </div>


            {appointment.status !==
              "cancelled" && (

              <div className="client-appointments__actions">

                <button
                  type="button"
                  className="client-appointments__button"
                  onClick={
                    openModify
                  }
                >
                  Modifier
                </button>


                <button
                  type="button"
                  className="
                    client-appointments__button
                    client-appointments__button--secondary
                  "
                  onClick={
                    openCancel
                  }
                >
                  Annuler
                </button>

              </div>

            )}

          </article>

        </section>


        {/* ======================
            MODIFICATION
        ====================== */}

        {activeAction ===
          "modify" && (

          <section className="client-appointments__editor">

            <div>

              <p className="client-appointments__editor-eyebrow">
                Modifier
              </p>

              <h2 className="client-appointments__editor-title">
                Choisir un autre
                créneau
              </h2>

            </div>


            <div className="client-appointments__slots">

              {AVAILABLE_SLOTS.map(
                (slot) => (

                  <label
                    className={`client-appointments__slot ${
                      selectedSlot ===
                      slot.id
                        ? "client-appointments__slot--selected"
                        : ""
                    }`}
                    key={
                      slot.id
                    }
                  >

                    <input
                      type="radio"
                      name="appointment-slot"
                      value={
                        slot.id
                      }
                      checked={
                        selectedSlot ===
                        slot.id
                      }
                      onChange={() =>
                        setSelectedSlot(
                          slot.id
                        )
                      }
                    />

                    <span>
                      {
                        slot.date
                      }
                    </span>

                    <strong>
                      {
                        slot.time
                      }
                    </strong>

                  </label>

                )
              )}

            </div>


            <div className="client-appointments__editor-actions">

              <button
                type="button"
                className="client-appointments__button"
                onClick={
                  saveModification
                }
              >
                Enregistrer
              </button>


              <button
                type="button"
                className="
                  client-appointments__button
                  client-appointments__button--ghost
                "
                onClick={() =>
                  setActiveAction(
                    null
                  )
                }
              >
                Revenir
              </button>

            </div>

          </section>

        )}


        {/* ======================
            ANNULATION
        ====================== */}

        {activeAction ===
          "cancel" && (

          <section className="client-appointments__editor">

            <div>

              <p className="client-appointments__editor-eyebrow">
                Annulation
              </p>

              <h2 className="client-appointments__editor-title">
                Annuler ce
                rendez-vous ?
              </h2>

              <p className="client-appointments__editor-text">
                Cette action est
                simulée dans la
                démonstration.
              </p>

            </div>


            <div className="client-appointments__editor-actions">

              <button
                type="button"
                className="
                  client-appointments__button
                  client-appointments__button--secondary
                "
                onClick={
                  confirmCancellation
                }
              >
                Confirmer
                l’annulation
              </button>


              <button
                type="button"
                className="
                  client-appointments__button
                  client-appointments__button--ghost
                "
                onClick={() =>
                  setActiveAction(
                    null
                  )
                }
              >
                Garder mon
                rendez-vous
              </button>

            </div>

          </section>

        )}


        {/* ======================
            CONDITIONS
        ====================== */}

        <section
          className="client-appointments__conditions"
          id="conditions-annulation"
        >

          <p className="client-appointments__editor-eyebrow">
            Informations
          </p>

          <h2 className="client-appointments__section-title">
            Conditions
            d’annulation
          </h2>

          <p>
            Les conditions
            définitives seront
            précisées avant la mise
            en service du système
            de réservation.
          </p>

        </section>


        {/* ======================
            DEMO CONTROLS
        ====================== */}

        <div className="client-appointments__demo-actions">

          <button
            type="button"
            className="
              client-appointments__button
              client-appointments__button--ghost
            "
            onClick={
              resetDemo
            }
          >
            Réinitialiser la démo
          </button>


          <button
            type="button"
            className="
              client-appointments__button
              client-appointments__button--ghost
            "
            onClick={() =>
              navigate(
                "/services"
              )
            }
          >
            Retour aux
            accompagnements
          </button>

        </div>

      </div>

    </SiteLayout>
  );
}


export default ClientAppointmentsPage;