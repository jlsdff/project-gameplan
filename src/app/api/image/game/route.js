import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") ?? undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: "630px",
          width: "1200px",
          backgroundColor: "#323232",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Hello World</h1>
        <p>{id}</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
