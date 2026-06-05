import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#1c1917",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f8f7f5",
          borderRadius: 6,
          fontWeight: 500,
          letterSpacing: "0.05em",
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}
