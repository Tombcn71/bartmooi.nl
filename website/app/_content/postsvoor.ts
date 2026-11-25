import { posts } from "./posts";
import { postsEn } from "./posts-en";
import { postsDe } from "./posts-de";
import { postsPl } from "./posts-pl";
import type { Post } from "./types";
import { voorvoegsel, type Taal } from "../_i18n/talen";

/** De artikelen in een taal. Een taal zonder vertaalde artikelen heeft geen blog. */
export const postsVoor = (taal: Taal): Post[] => (taal === "nl" ? posts : taal === "en" ? postsEn : taal === "de" ? postsDe : taal === "pl" ? postsPl : []);

/** Het Nederlandse adres-sleutel van een artikel (voor titels, beschrijvingen en taalverwijzingen). */
export const nlSlug = (p: Post) => p.nl ?? p.slug;
export const postPad = (p: Post, taal: Taal) => (taal === "nl" ? `/${p.slug}/` : `${voorvoegsel(taal)}/blog/${p.slug}/`);
