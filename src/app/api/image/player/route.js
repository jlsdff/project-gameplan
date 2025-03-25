import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") ?? undefined;
  const ppg = searchParams.get("ppg") ?? undefined;
  const apg = searchParams.get("apg") ?? undefined;
  const rpg = searchParams.get("rpg") ?? undefined;
  const bpg = searchParams.get("bpg") ?? undefined;
  const spg = searchParams.get("spg") ?? undefined;
  const fgp = searchParams.get("fgp") ?? undefined;
  const twoPG = searchParams.get("twoPG") ?? undefined;
  const threePG = searchParams.get("threePG") ?? undefined;
  const ftp = searchParams.get("ftp") ?? undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: "630px",
          width: "1200px",
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/the-project-gameplan.appspot.com/o/public%2Fseo_bg.jpg?alt=media&token=6fb9a4e4-d1bf-4e8b-a164-2022535f96d1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundSize: "1200px 630px",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          padding: "32px 32px",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ fontWeight: "bold" }}>{name}</h1>
        </div>

        {/* STATS CONTAINER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid #000",
          }}
        >
          {/* First ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "32px",
            }}
          >
            {/* PPG */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{ppg}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>PPG</h2>
            </div>
            {/* apg */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{apg}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>APG</h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{rpg}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>RPG</h2>
            </div>
          </div>
          {/* SECOND ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "32px",
            }}
          >
            {/* PPG */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                gap: "4px"
              }}
            >
              <h2 style={{ fontSize: "32px"}}>{bpg}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>BPG</h2>
            </div>
            {/* apg */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{spg}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>SPG</h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{fgp}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>FGP</h2>
            </div>
          </div>
          {/* THIRD ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "32px",
            }}
          >
            {/* twoPG */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{twoPG}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>2PG</h2>
            </div>
            {/* threePG */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{threePG}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>3PG</h2>
            </div>
            {/* ftp */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "32px" }}>{ftp}</h2>
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>FTP</h2>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
