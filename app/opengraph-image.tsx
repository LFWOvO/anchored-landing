import { ImageResponse } from "next/og";

export const alt = "MiraDawn — turn videos into blog posts that actually rank";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #312E81 0%, #4F46E5 55%, #A21CAF 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ▶
          </div>
          <div style={{ fontSize: "38px", fontWeight: 700, letterSpacing: "-1px" }}>MiraDawn</div>
        </div>
        <div style={{ fontSize: "62px", fontWeight: 800, lineHeight: 1.12, maxWidth: "920px", letterSpacing: "-2px" }}>
          Turn videos into blog posts that actually rank.
        </div>
        <div style={{ fontSize: "28px", opacity: 0.85, marginTop: "28px" }}>
          Fact-anchored · quality-scored · publish-ready
        </div>
      </div>
    ),
    { ...size }
  );
}
