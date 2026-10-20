import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.identityLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 66,
          color: "#eae7df",
          background: "#183943",
          fontFamily: "Georgia, serif",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "18px solid #d77e67",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 3 }}>
          <span>{site.organizationName.toUpperCase()}</span>
          <span>PORTFOLIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 76, lineHeight: 1.05 }}>{site.name}</span>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 24, color: "#d6d0c4" }}>
            {site.identityLine}
          </span>
        </div>
        <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 18, letterSpacing: 2 }}>
          {site.capabilities.slice(0, 3).join(" / ").toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
