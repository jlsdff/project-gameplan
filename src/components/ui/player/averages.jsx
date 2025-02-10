import { getStats } from "@/helpers/players/statsHelpers";

export default function Averages({player, games}) {
  
  const stats = getStats(player.id, games);
  
  return (
    <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
      {/* INFO */}
      <div className="flex flex-col items-center justify-center gap-2 md:items-start">
        <h1 className="text-2xl font-black sm:text-4xl text-primary">
          {player.firstname
            ? `${player.lastname}, ${player.firstname}`
            : `${player.lastname}`}
        </h1>
        <p className="font-light text-md sm:text-xl">
          {stats.positions?.join(" | ") || ""}
        </p>
      </div>
      {/* STATS */}
      <div className="grid w-full grid-cols-3 grid-rows-3 gap-2 md:w-1/2 place-self-center">
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            PPG
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{stats.ppg || 0}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            APG
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{stats.apg || 0}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            RPG
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{stats.rpg || 0}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            BPG
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{stats.bpg || 0}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            SPG
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{stats.spg || 0}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            FG%
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{`${
            stats.fgp || 0
          }%`}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            2P%
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{`${
            stats.twoPG || 0
          }%`}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            3P%
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{`${
            stats.threePG || 0
          }%`}</h2>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h3 className="text-base sm:text-xl font-regular text-neutral-300">
            FTP
          </h3>
          <h2 className="text-xl font-bold sm:text-2xl">{`${
            stats.ftp || 0
          }%`}</h2>
        </div>
      </div>
    </section>
  );
}
