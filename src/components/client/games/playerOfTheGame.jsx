

export default function PlayerOfTheGame({data}){

  console.log("POTG: ", data)

  return (
    <div className="bg-primary w-full rounded-md" >

      <div className="text-gray-900 text-center p-4">
        <h2 className="font-bold text-2xl sm:text-5xl uppercase">{data.fullname}</h2>
        <h3 className="text-lg sm:text-xl uppercase">Player of the Game</h3>
      </div>

      <div className="flex gap-2.5 flex-wrap justify-center items-center bg-gray-900 p-4">

        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            PTS
          </div> 
          <div className="font-bold text-xl ">
            {(+data.threePointsMade * 3) + (+data.twoPointsMade * 2 ) + (+data.freeThrowsMade)}
          </div>
        </div>

        {
          data.assists > 0 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            AST
          </div> 
          <div className="font-bold text-xl ">
            {data.assists}
          </div>
        </div>
          )
        }

        {
          data.rebounds > 0 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            REB
          </div> 
          <div className="font-bold text-xl ">
            {data.rebounds}
          </div>
        </div>
          )
        }

        {
          data.steals > 0 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            STL
          </div> 
          <div className="font-bold text-xl ">
            {data.steals}
          </div>
        </div>
          )
        }

        {
          data.blocks > 0 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            BLK
          </div> 
          <div className="font-bold text-xl ">
            {data.blocks}
          </div>
        </div>
          )
        }

        {
          (data.twoPointsMade/data.twoPointsAttempted) > 0.5 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            2PT%
          </div> 
          <div className="font-bold text-xl ">
            {((data.twoPointsMade/data.twoPointsAttempted) * 100)}%
          </div>
        </div>
          )
        }

        {
          (data.threePointsMade/data.threePointsAttempted) > 0.5 && (
        <div className="flex flex-col gap-2 min-w-[50px] justify-center items-center p-2">
          <div className="text-xl font-semibold text-primary">
            3PT%
          </div> 
          <div className="font-bold text-xl ">
            {((data.threePointsMade/data.threePointsAttempted) * 100)}%
          </div>
        </div>
          )
        }


      </div>

    </div>

  )

}
