import { getTaal, href, t } from "../_i18n";
import type { AiTeksten } from "./AiKnop";
import type { FormulierTeksten } from "./Formulier";

/** Teksten van de AI-knop in de taal van de pagina (de taal gaat ook mee naar de assistent). */
export const aiTeksten = (): AiTeksten => ({
  titel: t("Prijs & advies direct"),
  ondertitel: t("Vraag het onze AI-assistent"),
  knopTekst: t("Bereken uw prijs met onze AI-assistent"),
  venster: t("AI-assistent van BartMooi"),
  taal: getTaal(),
});

/** Teksten van het contactformulier in de taal van de pagina. */
export const formulierTeksten = (): FormulierTeksten => ({
  naamEnAchternaam: t("Naam en achternaam"),
  naam: t("Naam"),
  achternaam: t("Achternaam"),
  email: t("Email"),
  telefoon: t("Telefoon"),
  telefoonHint: t("Voer een geldig telefoonnummer in."),
  bericht: t("Bericht"),
  bezig: t("Bezig…"),
  verstuur: t("Verstuur"),
  mislukt: t("Versturen mislukt. Probeer het later opnieuw of bel ons."),
  taal: getTaal(),
  bedankt: href("/bedankt/"),
});
