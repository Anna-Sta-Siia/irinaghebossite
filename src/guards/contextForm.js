import { makeGibberishChecker } from "./gibberish";
import { makeProfanityChecker } from "./profanity";
import {
  graphemeLength,
  looksLikeUrlOrHtml,
  normalizeSoft,
} from "./utils";

const NAME_RE =
  /^(?!.*[ '\-’]{2})(?!.*[ '\-’]$)[\p{L}]+(?:[ '\-’][\p{L}]+)*$/u;

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const PHONE_RE =
  /^\+?[0-9 ()'.-]{8,24}$/u;

const hasProfanity = makeProfanityChecker();
const isGibberish = makeGibberishChecker();

const required = (value, message) =>
  normalizeSoft(value)
    ? ""
    : message;

export const validatePublicName = (
  value,
  { requiredField = true } = {}
) => {
  const text = normalizeSoft(value);
  const length = graphemeLength(text);

  if (!text) {
    return requiredField
      ? "Ce champ est obligatoire."
      : "";
  }

  if (length < 2) {
    return "Saisissez au moins 2 caractères";
  }

  if (length > 35) {
    return "35 caractères maximum";
  }

  if (!NAME_RE.test(text)) {
    return "Utilisez uniquement des lettres, espaces, apostrophes ou tirets";
  }

  if (looksLikeUrlOrHtml(text)) {
    return "Les liens et le code HTML ne sont pas autorisés";
  }

  if (hasProfanity(text)) {
    return "Merci d’utiliser un langage approprié";
  }

  if (isGibberish(text)) {
    return "Ce texte ressemble à un gribouillage";
  }

  return "";
};

export const validatePublicEmail = (
  value,
  { requiredField = true } = {}
) => {
  const text = normalizeSoft(value);

  if (!text) {
    return requiredField
      ? "L’adresse e-mail est obligatoire"
      : "";
  }

  if (graphemeLength(text) > 120) {
    return "Adresse e-mail trop longue";
  }

  if (!EMAIL_RE.test(text)) {
    return "Saisissez une adresse e-mail valide";
  }

  return "";
};

export const validatePublicPhone = (
  value
) => {
  const text = normalizeSoft(value);

  if (!text) {
    return "";
  }

  if (!PHONE_RE.test(text)) {
    return "Saisissez un numéro de téléphone valide";
  }

  return "";
};

export const validatePublicText = (
  value,
  {
    requiredField = true,
    minLength = 10,
    maxLength = 800,
    label = "Le message",
  } = {}
) => {
  const text = normalizeSoft(value);
  const length = graphemeLength(text);

  if (!text) {
    return requiredField
      ? `${label} est obligatoire.`
      : "";
  }

  if (length < minLength) {
    return `${minLength} caractères minimum`;
  }

  if (length > maxLength) {
    return `${maxLength} caractères maximum`;
  }

  if (looksLikeUrlOrHtml(text)) {
    return "Les liens et le code HTML ne sont pas autorisés";
  }

  if (hasProfanity(text)) {
    return "Merci de reformuler ce texte.";
  }

  if (isGibberish(text)) {
    return "Ce texte ressemble à un gribouillage";
  }

  return "";
};

export const validateSimpleText = (
  value,
  {
    requiredField = true,
    minLength = 2,
    maxLength = 80,
    label = "Ce champ",
  } = {}
) => {
  const text = normalizeSoft(value);
  const length = graphemeLength(text);

  if (!text) {
    return requiredField
      ? `${label} est obligatoire.`
      : "";
  }

  if (length < minLength) {
    return `${minLength} caractères minimum`;
  }

  if (length > maxLength) {
    return `${maxLength} caractères maximum`;
  }

  if (looksLikeUrlOrHtml(text)) {
    return "Les liens et le code HTML ne sont pas autorisés";
  }

  if (hasProfanity(text)) {
    return "Merci d’utiliser un langage approprié";
  }

  if (isGibberish(text)) {
    return "Ce texte ressemble à un gribouillage";
  }

  return "";
};

export const validateContextForm = (
  type,
  values
) => {
  const errors = {
    name: validatePublicName(values.name),

    email: validatePublicEmail(
      values.email,
      {
        requiredField: type !== "review",
      }
    ),

    phone: validatePublicPhone(
      values.phone
    ),
  };

  if (type === "review") {
    errors.service = required(
      values.service,
      "Choisissez un accompagnement."
    );

    errors.rating =
      Number(values.rating) >= 1 &&
      Number(values.rating) <= 5
        ? ""
        : "Choisissez une note.";

    errors.message = validatePublicText(
      values.message,
      {
        minLength: 20,
        maxLength: 600,
        label: "L’avis",
      }
    );

    errors.publicationConsent =
      values.publicationConsent
        ? ""
        : "Votre autorisation est nécessaire pour publier l’avis";
  }

  if (type === "contact") {
    errors.subject = validateSimpleText(
      values.subject,
      {
        minLength: 3,
        maxLength: 80,
        label: "Le sujet",
      }
    );

    errors.message = validatePublicText(
      values.message,
      {
        minLength: 10,
        maxLength: 800,
        label: "Le message",
      }
    );
  }

  if (type === "proposal") {
    errors.structure =
      validateSimpleText(
        values.structure,
        {
          minLength: 2,
          maxLength: 80,
          label: "Le nom de la structure",
        }
      );

    errors.structureType = required(
      values.structureType,
      "Choisissez un type de structure"
    );

    errors.location = validateSimpleText(
      values.location,
      {
        requiredField: false,
        maxLength: 80,
        label: "Le lieu",
      }
    );

    errors.period = validateSimpleText(
      values.period,
      {
        requiredField: false,
        maxLength: 80,
        label: "La période",
      }
    );

    errors.participants =
      !values.participants ||
      (
        Number(values.participants) >= 1 &&
        Number(values.participants) <= 10000
      )
        ? ""
        : "Indiquez un nombre entre 1 et 10 000.";

    errors.message = validatePublicText(
      values.message,
      {
        minLength: 20,
        maxLength: 1000,
        label: "La description du projet",
      }
    );
  }

  return {
    errors,
    isValid: Object.values(
      errors
    ).every((error) => !error),
  };
};
