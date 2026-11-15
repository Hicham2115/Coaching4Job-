export type Accompaniment = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  audience: string;
  benefits: { title: string; text: string }[];
};

export const accompaniments: Accompaniment[] = [
  {
    slug: "premier-emploi",
    title: "Premier emploi",
    description:
      "Valorisez votre profil, préparez vos candidatures et réussissez vos entretiens pour démarrer votre carrière avec confiance.",
    image: "/images/first-job.jpg",
    imageAlt: "Jeune diplômé regardant vers son avenir professionnel",
    audience:
      "Pour les étudiants et jeunes diplômés qui cherchent leur premier poste et veulent se démarquer.",
    benefits: [
      {
        title: "Un CV et un profil LinkedIn qui se remarquent",
        text: "Mettez en avant vos études, stages et compétences, même sans expérience longue.",
      },
      {
        title: "Des candidatures ciblées",
        text: "Apprenez à choisir les bonnes offres et à rédiger des messages qui obtiennent une réponse.",
      },
      {
        title: "Une préparation complète aux entretiens",
        text: "Entraînez-vous aux questions classiques et apprenez à présenter votre parcours avec assurance.",
      },
      {
        title: "Une vision claire de votre projet",
        text: "Identifiez les métiers et les secteurs qui vous correspondent pour avancer avec méthode.",
      },
    ],
  },
  {
    slug: "changer-de-poste",
    title: "Changer de poste",
    description:
      "Faites le point, clarifiez vos objectifs et positionnez-vous efficacement sur de nouvelles opportunités.",
    image: "/images/change-job.jpg",
    imageAlt: "Professionnelle réfléchissant à sa prochaine étape de carrière",
    audience:
      "Pour les professionnels qui veulent évoluer, changer d’entreprise ou se réorienter.",
    benefits: [
      {
        title: "Un bilan de votre parcours",
        text: "Faites le point sur vos réussites, vos compétences clés et ce que vous voulez vraiment.",
      },
      {
        title: "Un positionnement clair",
        text: "Sachez expliquer votre valeur et la façon dont elle répond aux besoins des recruteurs.",
      },
      {
        title: "Une recherche plus efficace",
        text: "Activez votre réseau, repérez les opportunités cachées et gagnez du temps.",
      },
      {
        title: "Des négociations maîtrisées",
        text: "Préparez vos entretiens et discutez salaire et conditions en confiance.",
      },
    ],
  },
];

export function getAccompaniment(slug: string) {
  return accompaniments.find((item) => item.slug === slug);
}
