import Image from "next/image";
import { Link } from "@nextui-org/react";
import Footer from "@/components/client/footer/Footer";
import Hero from "@/components/refactored/home/hero";
import MissionAndVision from "@/components/refactored/home/mission";
import HowWeAchieveIt from "@/components/refactored/home/achieve";

export const metadata = {
  title: "THE PROJECT GAMEPLAN",
  description: "A basketball analytics platform for coaches and players",
};

export default function Home() {
  return (
    <main className="">
      <Hero />
      <MissionAndVision />
      <HowWeAchieveIt />
      <Footer />
    </main>
  );
}
