import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "The Wire Room — Three beats. Real-time grants intelligence."
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Beat accent dots */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "hsl(37, 90%, 55%)",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "hsl(200, 60%, 50%)",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "hsl(145, 55%, 45%)",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.1,
            marginBottom: "20px",
            fontFamily: "serif",
          }}
        >
          📡 The Wire Room
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#a3a3a3",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            fontFamily: "monospace",
            marginBottom: "24px",
          }}
        >
          Three beats. Real-time grants intelligence.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#737373",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Tracking grants, fellowships, and hackathons across Crypto, AI, and
          Open Source.
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            gap: "24px",
            fontSize: "16px",
            color: "#525252",
            fontFamily: "monospace",
          }}
        >
          <span>@CryptoGrantWire</span>
          <span>@AIGrantWire</span>
          <span>@OSSGrantWire</span>
        </div>

        {/* Sovereign Signal */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "14px",
            color: "#525252",
            fontFamily: "monospace",
          }}
        >
          Powered by Sovereign Signal
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
