import "../globals.css";
import type { ReactNode } from "react";
import { Wortel } from "../_c/Wortel";
import { rootMeta, viewport as vp } from "../_c/rootMeta";

export const metadata = rootMeta("de");
export const viewport = vp;

export default function Layout({ children }: { children: ReactNode }) {
  return <Wortel taal="de">{children}</Wortel>;
}
