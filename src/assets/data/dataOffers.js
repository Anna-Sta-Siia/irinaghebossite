export const dataOffers = [
  /* ===========================
     PACK GLOW-UP
  =========================== */

  {
    id: "pack-glow-up",

    slug: "pack-glow-up",

    type: "pack",

    title: "Pack Glow-up",

    active: true,

    /*
      true  → Offres du moment
      false → Packs
    */
    momentum: false,

    /*
      Réservation directe possible ou non.
      Indépendant de active.
    */
    bookingEnabled: false,

    /*
      Pour l'instant, seul le Pack Découverte
      est confirmé comme disponible à offrir.
    */
    giftable: false,

    description:
      "Un accompagnement corps et visage orienté vers l’esthétique, l’éclat et l’harmonie de la silhouette.",

    items: [],

    prices: [],

    durationMinutes: null,

    bookingDurations: null,

    onlineAvailable: false,

    flyer: null,

    flipCta: "En savoir plus",

    detailsCta: "Voir les détails",

    backCta: "Revenir",

    cta: "Prendre contact",
  },

  /* ===========================
     PACK SCULPT
  =========================== */

  {
    id: "pack-sculpt",

    slug: "pack-sculpt",

    type: "pack",

    title: "Pack Sculpt",

    active: true,

    momentum: false,

    bookingEnabled: false,

    giftable: false,

    description:
      "Un accompagnement corps et visage davantage orienté vers le travail musculaire, la tonicité et la structure.",

    items: [],

    prices: [],

    durationMinutes: null,

    bookingDurations: null,

    onlineAvailable: false,

    flyer: null,

    flipCta: "En savoir plus",

    detailsCta: "Voir les détails",

    backCta: "Revenir",

    cta: "Prendre contact",
  },

  /* ===========================
     PACK DÉCOUVERTE
  =========================== */

  {
    id: "pack-decouverte",

    slug: "pack-decouverte",

    type: "pack",

    title: "Pack Découverte",

    active: true,

    momentum: false,

    bookingEnabled: true,

    giftable: true,

    description:
      "Une heure pour découvrir plusieurs approches et composer un moment adapté à vos envies.",

    items: [
      {
        name:
          "3 massages différents de 20 minutes au choix",
      },
      {
        name:
          "1 heure de découverte au total",
      },
      {
        name:
          "Carte valable 12 mois",
      },
      {
        name:
          "Carte transférable",
      },
    ],

    prices: [
      {
        label: "Pack Découverte",
        price: "1 h · 150 €",
      },
    ],

    durationMinutes: 60,

    bookingDurations: [
      {
        label: "Pack Découverte",
        durationMinutes: 60,
        price: 150,
      },
    ],

    validityMonths: 12,

    transferable: true,

    onlineAvailable: false,

    flyer: null,

    flipCta: "En savoir plus",

    detailsCta: "Voir les détails",

    backCta: "Revenir",

    cta: "Prendre rendez-vous",
  },

  /* ===========================
     PACK ATHLÈTES / CLUBS
  =========================== */

  {
    id: "pack-athletes",

    slug: "pack-athletes",

    type: "pack",

    title: "Packs Clubs",

    active: true,

    /*
      Actuellement mis en avant
      dans "Offres du moment".
    */
    momentum: true,

    /*
      L'offre reste visible,
      mais passe par une prise de contact.
    */
    bookingEnabled: false,

    giftable: false,

    description:
      "Une formule pensée pour les clubs et les groupes d’athlètes, avec un accompagnement adapté à leurs besoins.",

    items: [
      {
        name:
          "À partir de 3 athlètes",
      },
      {
        name:
          "Accompagnement adapté au groupe",
      },
      {
        name:
          "Organisation à définir avec le club",
      },
    ],

    prices: [
      {
        price:
          "Tarif sur demande",
      },
    ],

    durationMinutes: null,

    bookingDurations: null,

    onlineAvailable: false,

    /*
      On branchera ici le flyer
      à l'étape "Offres du moment".
    */
    flyer: null,

    flipCta: "En savoir plus",

    detailsCta: "Voir les détails",

    backCta: "Revenir",

    cta: "Prendre contact",
  },
];