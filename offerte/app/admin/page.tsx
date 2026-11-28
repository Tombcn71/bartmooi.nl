import { Briefcase, FileText } from "lucide-react";
import { KANTOOR_URL } from "@/lib/kantoor";

/** Beginscherm na het inloggen: kiezen tussen Kantoor en Offertes. */
export default function AdminStart() {
  const tegels = [
    { href: KANTOOR_URL, Icon: Briefcase, titel: "Kantoor", tekst: "Planning, uren, facturen en je team." },
    { href: "/admin/offertes", Icon: FileText, titel: "Offertes", tekst: "Aanvragen, offertes maken en prijzen." },
  ];
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 pt-4 md:pt-12">
      {tegels.map((t) => (
        <a
          key={t.titel}
          href={t.href}
          className="flex items-center gap-5 rounded-2xl border-2 border-border bg-card p-6 transition hover:border-brand active:scale-[0.98]">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
            <t.Icon className="size-7" />
          </span>
          <span>
            <span className="block text-xl font-bold">{t.titel}</span>
            <span className="text-sm text-muted-foreground">{t.tekst}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
