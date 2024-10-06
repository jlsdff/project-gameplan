import OngoingLeagues from "@/components/client/home/onGoingLeagues";
import RecentGames from "../home/recentGames";

export default function OngoingLeaguesAndRecentGames() {
  return (
    <section className="p-8 sm:px-16 bg-gradient-to-r from-primary-900 to-primary-700 flex flex-col sm:flex-row justify-center items-start ">
      <div className="w-full sm:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
        <div className="min-h-[300px] w-full">
          <RecentGames />
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Ongoing Leagues</h2>
        <div className="min-h-[300px] w-full">
          <OngoingLeagues />
        </div>
      </div>
    </section>
  );
}
