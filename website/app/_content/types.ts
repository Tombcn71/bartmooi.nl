export type Post = {
  slug: string;
  /** Nederlandse tegenhanger (alleen bij vertaalde artikelen) */
  nl?: string;
  titel: string;
  /** ISO-datum voor de bloglijst */
  datum: string;
  /** Datum zoals boven het artikel (dd/mm/jjjj) */
  uitgebreid: string;
  afbeelding: string;
  uittreksel: string;
  html: string;
};
