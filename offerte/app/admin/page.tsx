import { redirect } from "next/navigation";

/** Het keuzescherm (Kantoor of Offertes) staat op bartmooi.nl/admin; hier meteen naar de aanvragen. */
export default function AdminStart() {
  redirect("/admin/offertes");
}
