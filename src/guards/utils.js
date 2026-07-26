/** Nettoie les espaces sans modifier la casse affichée. */
export const normalizeSoft = (value = "") =>
  String(value).replace(/\s+/g, " ").trim();

/** Détecte une URL ou une balise HTML simple. */
export const looksLikeUrlOrHtml = (value = "") =>
  /(https?:\/\/|www\.)|<\s*\/?\s*\w+[^>]*>/i.test(
    String(value)
  );

/** Compte correctement les caractères Unicode. */
export const graphemeLength = (value = "") => {
  const text = String(value);

  if (
    typeof Intl !== "undefined" &&
    Intl.Segmenter
  ) {
    return Array.from(
      new Intl.Segmenter(undefined, {
        granularity: "grapheme",
      }).segment(text)
    ).length;
  }

  return Array.from(text).length;
};
