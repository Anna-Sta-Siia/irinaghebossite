export const dataServices = {
  performance: {
    title: "Pour aller plus loin",
    services: [
      {
        id: "accompagnement-sportif",
        title: "Accompagnement sportif",
        description:
          "Un accompagnement pensé pour les sportifs particuliers et les clubs",
        items: [
          { name: "Récupération musculaire" },
          { name: "Prévention des blessures" },
          { name: "Préparation du corps à l’effort" },
          { name: "Optimisation des performances" },
        ],
        price: "Tarif à préciser",
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
      {
        id: "boxe",
        title: "Boxe",
        description:
          "Une pratique physique pour développer la présence, la coordination et la confiance en soi",
        items: [
          {
            name: "Boxe femmes",
            price: "1 h · 50 €",
          },
          {
            name: "Boxe enfants",
            price: "1 h · 40 €",
          },
        ],
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
    ],
    more: {
      cta: "Découvrir tous les accompagnements",
    },
  },

  liberte: {
    title: "Pour retrouver la liberté de mouvement",
    services: [
      {
        id: "techniques-corporelles",
        title: "Techniques corporelles",
        description:
          "Pour relâcher les tensions, retrouver plus de mobilité et une sensation de légèreté",
        items: [
          {
            name: "Remodelage corporel",
            price: "1 h · 100 €",
          },
          {
            name: "Deep Tissue, Trigger Point",
            options: [
              {
                label: "1 h",
                price: "80 €",
              },
              {
                label: "1 h 30",
                price: "110 €",
              },
            ],
          },
          {
            name: "Shiatsu myo-énergétique",
            price: "Tarif à préciser",
          },
        ],
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
    ],
    more: {
      cta: "Découvrir tous les accompagnements",
    },
  },

  equilibre: {
    title: "Pour revenir à soi",
    services: [
      {
        id: "coaching-individuel",
        title: "Coaching individuel",
        description:
          "Un accompagnement personnalisé pour clarifier vos objectifs et avancer pas à pas",
        price: "1 h · 70 €",
        flipCta: "Voir le détail",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
      {
        id: "lacher-prise",
        title: "Prise de conscience et lâcher-prise",
        description:
          "Un accompagnement pour relâcher progressivement les tensions et revenir à soi",
        price: "1 h · 90 €",
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
    ],
    more: {
      cta: "Découvrir tous les accompagnements",
    },
  },

  rayonnement: {
    title: "Pour rayonner",
    services: [
      {
        id: "techniques-faciales",
        title: "Techniques faciales",
        description:
          "Un accompagnement du visage pour relâcher les tissus, retrouver plus d’éclat et une sensation de détente",
        items: [
          {
            name: "Remodelage facial",
            price: "1 h · 130 €",
          },
          {
            name: "Relâchement myofascial du visage",
            price: "Tarif à préciser",
          },
        ],
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre rendez-vous",
      },
    ],
    more: {
      cta: "Découvrir tous les accompagnements",
    },
  },

  unknown: {
    title: "Vous ne savez pas encore...",
    intro:
      "Nous pouvons prendre le temps d’en parler ensemble et trouver ce qui vous conviendra le mieux",
    services: [
      {
        id: "premier-echange",
        title: "Premier échange",
        description:
          "Un temps pour faire le point sur votre situation, vos attentes et l’accompagnement qui pourrait vous correspondre",
        price: "Tarif à préciser",
        flipCta: "En savoir plus",
        backCta: "Revenir",
        cta: "Prendre contact",
      },
    ],
  },
};