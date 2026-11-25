import "../globals.css";
import type { ReactNode } from "react";
import { Wortel } from "../_c/Wortel";
import { rootMeta, viewport as vp } from "../_c/rootMeta";

export const metadata = rootMeta("nl");
export const viewport = vp;

export default function NlLayout({ children }: { children: ReactNode }) {
  return <Wortel taal="nl">{children}</Wortel>;
}
