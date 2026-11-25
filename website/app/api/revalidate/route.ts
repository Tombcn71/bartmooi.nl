import { revalidateTag, revalidatePath } from "next/cache";
import { stuurNaarIndexNow } from "../indexnow/route";

// Ververst de prijzen (en daarmee de pagina's die ze tonen). Aanroepen met: POST /api/revalidate/?token=GEHEIM
// Stel REVALIDATE_TOKEN in als omgevingsvariabele. Bij succes worden de aangepaste pagina’s ook bij IndexNow aangemeld.
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!process.env.REVALIDATE_TOKEN || token !== process.env.REVALIDATE_TOKEN) return Response.json({ fout: "Geen toegang." }, { status: 401 });
  revalidateTag("prijzen", "max");
  revalidatePath("/diensten/");
  const indexnow = await stuurNaarIndexNow(["/diensten/"]);
  return Response.json({ ok: true, indexnow });
}
