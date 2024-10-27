'use client'
import OngoingLeagues from "@/components/client/home/onGoingLeagues";
import RecentGames from "../home/recentGames";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function OngoingLeaguesAndRecentGames() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col items-start justify-center p-8 sm:px-16 gap-2.5 sm:flex-row ">
        <div className="w-full sm:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Recent Games</h2>
          <div className="min-h-[300px] w-full">
            <RecentGames />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Ongoing Leagues</h2>
          <div className="min-h-[300px] w-full">
            <OngoingLeagues />
          </div>
        </div>
      </section>
    </QueryClientProvider>
  );
}
