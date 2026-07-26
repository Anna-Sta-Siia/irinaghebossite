/**
 * Premier filtre anti-gribouillage.
 *
 * Le contrôle est volontairement prudent afin de limiter
 * les faux positifs sur les noms étrangers.
 */
export function makeGibberishChecker() {
  return function isGibberish(input = "") {
    const text = String(input).trim();

    if (!text) {
      return false;
    }

    const normalized = text.toLowerCase();

    // Répétitions évidentes : aaaaa, !!!!!, 11111…
    if (/(.)\1{4,}/u.test(normalized)) {
      return true;
    }

    // Motifs clavier fréquents.
    if (
      /(azerty|qwerty|asdfg|zxcvb|йцукен|фыва)/iu.test(
        normalized
      )
    ) {
      return true;
    }

    const words = normalized
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 7);

    if (!words.length) {
      return false;
    }

    let suspiciousWords = 0;

    for (const word of words) {
      const letters = word.replace(/[^\p{L}]/gu, "");

      if (!letters) {
        continue;
      }

      const vowels = (
        letters.match(
          /[aeiouyàâäéèêëîïôöùûüæœаеёиоуыэюя]/giu
        ) || []
      ).length;

      const latinConsonantRun =
        /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(
          letters
        );

      const cyrillicConsonantRun =
        /[бвгджзйклмнпрстфхцчшщ]{6,}/i.test(
          letters
        );

      const veryLowVowelRatio =
        letters.length >= 9 &&
        vowels / letters.length < 0.12;

      if (
        latinConsonantRun ||
        cyrillicConsonantRun ||
        veryLowVowelRatio
      ) {
        suspiciousWords += 1;
      }
    }

    return (
      suspiciousWords > 0 &&
      suspiciousWords / words.length >= 0.5
    );
  };
}
