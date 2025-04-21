

export default function PlayerOfTheGame({data}){

  console.log("POTG: ", data)

  return (
    <div className="bg-primary w-full p-4 rounded-md" >

      <div className="text-gray-900 text-center">
        <h2 className="font-bold text-xl ">{data.fullname}</h2>
        <h3 className="text-lg ">Player of the Game</h3>
      </div>

      <div className="text-gray-900 flex flex-col sm:flex-row gap-2.5 flex-wrap justify-center items-center">
        
        <div className="flex flex-col gap-2 min-w-[100px] justify-center items-center">
          <div className="">
            PTS
          </div> 
          <div className="text-bold">
            {(+data.threePointsMade * 3) + (+data.twoPointsMade * 2 ) + (+data.freeThrowsMade)}
          </div>
        </div>

      </div>
      
    </div>
  )

}
