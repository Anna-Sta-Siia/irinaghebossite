export const FORM_TYPES = {
  REVIEW: "review",
  CONTACT: "contact",
  PROPOSAL: "proposal",
};

export const FORM_CONFIGS = {
  review: {
    eyebrow: "Votre expérience",
    title: "Laisser votre avis",
    intro:
      "Partagez votre expérience avec Irina. Votre avis ne sera publié qu’avec votre autorisation.",
    submitLabel: "Envoyer mon avis",
    successMessage:
      "Merci. Votre avis a bien été enregistré dans cette simulation.",
  },

  contact: {
    eyebrow: "Me contacter",
    title: "Envoyer une demande",
    intro:
      "Décrivez votre besoin. Je pourrai vous répondre par e-mail ou vous proposer un échange.",
    submitLabel: "Envoyer mon message",
    successMessage:
      "Merci. Votre demande a bien été enregistrée dans cette simulation.",
  },

  proposal: {
    eyebrow: "Projet sur mesure",
    title: "Demander une proposition",
    intro:
      "Présentez votre structure et votre projet afin que je puisse préparer une proposition adaptée.",
    submitLabel: "Envoyer ma demande",
    successMessage:
      "Merci. Votre demande de proposition a bien été enregistrée dans cette simulation.",
  },
};

export const REVIEW_SERVICE_OPTIONS = [
  "Massage sportif & fascias",
  "Boxe",
  "Sportifs & clubs",
  "Remodelage corporel",
  "Coaching",
  "Autre accompagnement",
];

export const STRUCTURE_OPTIONS = [
  "Club sportif",
  "École",
  "Association",
  "Maison de retraite",
  "Entreprise",
  "Autre structure",
];
