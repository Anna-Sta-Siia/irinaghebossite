import { makeGibberishChecker } from "./gibberish";
import { makeProfanityChecker } from "./profanity";
import {
  graphemeLength,
  looksLikeUrlOrHtml,
  normalizeSoft,
} from "./utils";

/**
 * Nom international :
 * lettres Unicode, espaces, apostrophes et tirets.
 */
export const NAME_RE =
  /^(?!.*[ '\-’]{2})(?!.*[ '\-’]$)[\p{L}]+(?:[ '\-’][\p{L}]+)*$/u;

/**
 * Validation front simple d'une adresse e-mail.
 * La même validation devra être refaite côté serveur.
 */
export const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const hasProfanity = makeProfanityChecker();
const isGibberish = makeGibberishChecker();

const validateRequiredName = (value) => {
  const normalized = normalizeSoft(value);
  const length = graphemeLength(normalized);

  if (!normalized) {
    return "Ce champ est obligatoire.";
  }

  if (length < 2) {
    return "Saisissez au moins 2 caractères.";
  }

  if (length > 35) {
    return "35 caractères maximum.";
  }

  if (!NAME_RE.test(normalized)) {
    return "Utilisez uniquement des lettres, espaces, apostrophes ou tirets.";
  }

  if (looksLikeUrlOrHtml(normalized)) {
    return "Les liens et le code HTML ne sont pas autorisés.";
  }

  if (hasProfanity(normalized)) {
    return "Merci d’utiliser un langage approprié.";
  }

  if (isGibberish(normalized)) {
    return "Ce texte ressemble à un gribouillage.";
  }

  return "";
};

const validateOptionalMessage = (value) => {
  const normalized = normalizeSoft(value);
  const length = graphemeLength(normalized);

  if (!normalized) {
    return "";
  }

  if (length > 110) {
    return "110 caractères maximum.";
  }

  if (looksLikeUrlOrHtml(normalized)) {
    return "Les liens et le code HTML ne sont pas autorisés.";
  }

  if (hasProfanity(normalized)) {
    return "Merci de reformuler le message.";
  }

  if (isGibberish(normalized)) {
    return "Le message ressemble à un gribouillage.";
  }

  return "";
};

const validateEmail = (value) => {
  const normalized = normalizeSoft(value);

  if (!normalized) {
    return "L’adresse e-mail est obligatoire.";
  }

  if (graphemeLength(normalized) > 120) {
    return "Adresse e-mail trop longue.";
  }

  if (!EMAIL_RE.test(normalized)) {
    return "Saisissez une adresse e-mail valide.";
  }

  return "";
};

export const validateGiftCardFields = ({
  recipientName,
  buyerName,
  message,
  deliveryEmail,
}) => {
  const errors = {
    recipientName:
      validateRequiredName(recipientName),
    buyerName:
      validateRequiredName(buyerName),
    message:
      validateOptionalMessage(message),
    deliveryEmail:
      validateEmail(deliveryEmail),
  };

  return {
    errors,
    isValid: Object.values(errors).every(
      (error) => !error
    ),
  };
};

export {
  graphemeLength,
  looksLikeUrlOrHtml,
  normalizeSoft,
};
