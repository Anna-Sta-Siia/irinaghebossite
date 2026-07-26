import frenchWords from "../assets/data/profanity.fr.json";

const normalizeForSearch = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .trim();

const DEFAULT_WHITELIST = [
  "concepteur",
  "assesseur",
  "asseoir",
];

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SOFT_MAP = {
  a: "[a@4àáâä]+",
  e: "[e3éèêë]+",
  i: "[i1!íïî]+",
  o: "[o0ôöó]+",
  u: "[uúûùü]+",
  c: "[cçk]+",
  s: "[s$5]+",
  t: "[t7]+",
  b: "[b8]+",
  g: "[g9]+",
};

const SEPARATOR = "[\\s._-]{0,2}";

const wordToPattern = (word) => {
  const normalized = normalizeForSearch(word);
  const escaped = escapeRegex(normalized);

  const pieces = Array.from(escaped).map(
    (character) =>
      SOFT_MAP[character] ?? character
  );

  return new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${pieces.join(
      SEPARATOR
    )}(?:$|[^\\p{L}\\p{N}])`,
    "iu"
  );
};

export function makeProfanityChecker({
  extra = [],
  whitelist = [],
} = {}) {
  const allowedWords = new Set(
    [...DEFAULT_WHITELIST, ...whitelist].map(
      normalizeForSearch
    )
  );

  const patterns = [
    ...frenchWords,
    ...extra,
  ].map(wordToPattern);

  return function containsProfanity(input = "") {
    const normalized = normalizeForSearch(input);

    for (const allowedWord of allowedWords) {
      if (
        allowedWord &&
        normalized.includes(allowedWord)
      ) {
        return false;
      }
    }

    return patterns.some((pattern) =>
      pattern.test(normalized)
    );
  };
}
