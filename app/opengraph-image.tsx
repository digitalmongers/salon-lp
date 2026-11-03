import { ImageResponse } from "next/og";

export const alt = "Hairdresser & Salon | Personal Stylist Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
        {/* Subtle decorative background glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            backgroundColor: "#E8BF96",
            opacity: 0.12,
            filter: "blur(60px)",
          }}
        />

        {/* Header / Brand Pill */}
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
              gap: "14px",
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
            London | Award Winner 2024
          </div>
        </div>

        {/* Central Hero Typography */}
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
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Transformative Hair Styling & Bespoke Haircuts
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#B9B9B9",
              maxWidth: "850px",
            }}
          >
            Award-winning personal stylist offering customized coloring, texture treatments,
            and luxury bridal looks in the heart of London.
          </div>
        </div>

        {/* Footer badges and Contact */}
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
      ...size,
    }
  );
}
