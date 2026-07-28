export const LINKS_PAGE_URL =
  "https://anna-sta-siia.github.io/irinaghebossite/#/liens";

export const linksPageData = {
  title: "Irina Recovery",

  subtitle:
    "Prendre soin de soi, c’est retrouver la liberté d’avancer",

  workInProgress:
    "Le site Irina Recovery aussi prend forme. Certaines pages et fonctionnalités sont encore en préparation, mais vous pouvez déjà prendre rendez-vous, me contacter ou découvrir mon univers.",

  links: [
    {
      id: "appointment",
      label: "Prendre rendez-vous",
      description:
        "Écrivez-moi directement sur WhatsApp",
      href:
        "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20prendre%20rendez-vous.",
      icon: "calendar",
      external: true,
    },

    {
      id: "contact",
      label: "Me contacter",
      description:
        "Une question ou une demande particulière",
      href:
        "https://wa.me/33662802531?text=Bonjour%20Irina%2C%20je%20souhaiterais%20vous%20contacter.",
      icon: "message",
      external: true,
    },

    {
      id: "instagram",
      label: "Découvrir mon univers",
      description:
        "Retrouvez-moi sur Instagram",
      href:
        "https://www.instagram.com/irina_recovery/",
      icon: "instagram",
      external: true,
    },

    {
      id: "website",
      label: "Découvrir mon site",
      description:
        "Site actuellement en cours de création",
      href:
        "https://anna-sta-siia.github.io/irinaghebossite/",
      icon: "website",
      external: false,
      badge: "En préparation",
    },
  ],
};