import { ImageResponse } from "next/og";

export const alt = "BartMooi: kunststof en aluminium kozijnen op maat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Standaard deelafbeelding voor pagina’s zonder eigen afbeelding.
export default function Beeld() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: "#13334d", color: "#fff", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 34, letterSpacing: 4, color: "#1fb3e7", textTransform: "uppercase", fontWeight: 700 }}>BartMooi</div>
        <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Kozijnen en deuren op maat.</div>
        <div style={{ marginTop: 24, fontSize: 44, color: "#1fb3e7", fontWeight: 700 }}>Gratis inmeting. Montage door eigen monteurs.</div>
        <div style={{ marginTop: 48, fontSize: 30, color: "#cfd8e0" }}>Den Haag · heel Nederland · bartmooi.nl</div>
      </div>
    ),
    size,
  );
}
