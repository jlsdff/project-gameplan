import Footer from "@/components/client/footer/Footer";
import Hero from "@/components/refactored/home/hero";
import HowWeAchieveIt from "@/components/refactored/home/achieve";
import OngoingLeaguesAndRecentGames from "@/components/client/leagues/ongoingLeaguesAndRecentGames";

export const metadata = {
  title: "Project:Gameplan",
  description: "A basketball analytics platform for coaches and players",
};

export default function Home() {
  return (
    <main className="">
      <Hero />
      {/* <MissionAndVision /> */}
      {/* <OngoingLeague /> */}
      <OngoingLeaguesAndRecentGames />
      <HowWeAchieveIt />
      <Footer />
    </main>
  );
}
