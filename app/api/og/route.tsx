import { ImageResponse } from "next/og";
import { NextRequest, connection } from "next/server";

export async function GET(request: NextRequest) {
  await connection();

  try {
    const { searchParams } = new URL(request.url);

    const title =
      searchParams.get("title") ||
      "Transformative Hair Styling & Bespoke Haircuts";
    const service = searchParams.get("service") || "Award Winner 2024";
    const subtitle =
      searchParams.get("subtitle") ||
      "Award-winning personal stylist offering customized coloring, texture treatments, and luxury salon care in London.";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            backgroundColor: "#1C1D20",
            color: "#FFFFFF",
            fontFamily: "sans-serif",
            position: "relative",
            border: "8px solid #272422",
          }}
        >
          {/* Subtle decorative glow */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              backgroundColor: "#E8BF96",
              opacity: 0.12,
              filter: "blur(60px)",
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#E8BF96",
                }}
              />
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#E8BF96",
                }}
              >
                HairDresser Studio
              </span>
            </div>
            <div
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(232, 191, 150, 0.15)",
                border: "1px solid rgba(232, 191, 150, 0.4)",
                color: "#E8BF96",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {service}
            </div>
          </div>

          {/* Central Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "1000px",
            }}
          >
            <div
              style={{
                fontSize: "56px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "24px",
                lineHeight: 1.45,
                color: "#B9B9B9",
                maxWidth: "850px",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                fontSize: "18px",
                color: "#E0E0E0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#E8BF96",
                  }}
                />
                <span>Precision Cuts</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#E8BF96",
                  }}
                />
                <span>Gloss Treatments</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#E8BF96",
                  }}
                />
                <span>Bridal Styling</span>
              </div>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#E8BF96",
              }}
            >
              +44 20 7946 0919
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate Open Graph image", {
      status: 500,
    });
  }
}
