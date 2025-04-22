import { ImageResponse } from "next/og";
import fs from 'fs'
import path from 'path'

export async function GET(request) {

  const anton = path.join(process.cwd(), 'public', 'fonts',  'Anton-Regular.ttf')
  const fontData = fs.readFileSync(anton);

  const sp = request.nextUrl.searchParams;

  console.log("sp: ", sp)

  return new ImageResponse(
    (
      <div
        tw="flex flex-col bg-[#c85101] p-2 w-full h-full justify-center items-start"
        style={{
          fontFamily: "Anton",
          color: "#373938"
        }}
      >

        <div tw="flex justify-center items-center  w-full ">
          <div tw="flex flex-col items-center">
            <h1 tw=" text-8xl m-0">{sp.get("teamA")}</h1>
            <h2 tw=" text-5xl m-0">{sp.get("teamAScore")}</h2>
          </div>
          <div tw="w-[4px] bg-[#373938] mx-8 self-stretch">
          </div>
          <div tw="flex flex-col items-center">
            <h1 tw=" text-8xl m-0">{sp.get("teamB")}</h1>
            <h2 tw=" text-5xl m-0">{sp.get("teamBScore")}</h2>
          </div>
        </div>
        
        {
          sp.get("name") && (
        <div tw="flex flex-col w-full mt-7">

          <div tw="flex flex-col w-full items-center">
            <h2 tw="m-0 text-3xl ">PLAYER OF THE GAME</h2>
            <h1 tw="m-0 text-6xl ">{sp.get("name").toUpperCase()}</h1>
          </div>

          <div tw="flex justify-center items-center mt-5">
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">PTS</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("points")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">AST</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("assists")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">REB</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("rebounds")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">STL</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("steals")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">BLK</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("blocks")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">2PT</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("twoPointsMade")}/{sp.get("twoPointsAttempted")}</h1>
            </div>
            <div tw="flex flex-col items-center justify-center mx-4">
              <h2 tw="m-0 text-4xl ">3PT</h2>
              <h1 tw="m-0 text-6xl ">{sp.get("threePointsMade")}/{sp.get("threePointsAttempted")}</h1>
            </div>

          </div>

        </div>

          )
        }


      </div>
    ),
    { width: 1200, height: 630, fonts: [{
      name: "Anton",
      data: fontData,
      style: "normal",
      weight: "900"
    }] }
  );
}
