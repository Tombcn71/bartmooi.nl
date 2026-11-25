import "../globals.css";
import type { ReactNode } from "react";
import { Wortel } from "../_c/Wortel";
import { rootMeta, viewport as vp } from "../_c/rootMeta";

export const metadata = rootMeta("en");
export const viewport = vp;

export default function Layout({ children }: { children: ReactNode }) {
  return <Wortel taal="en">{children}</Wortel>;
}
