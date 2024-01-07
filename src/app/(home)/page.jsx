import Image from "next/image";
import { Link } from "@nextui-org/react";
import { josefinSans, montserrat } from "@/components/fonts";
import Footer from "@/components/client/footer/Footer";
import Hero from "@/components/refactored/home/hero";
import MissionAndVision from "@/components/refactored/home/mission"

export const metadata = {
  title: "THE PROJECT GAMEPLAN",
  description: "A basketball analytics platform for coaches and players",
};

// flex min-h-screen flex-col items-center justify-between p-24
export default function Home() {
  return (
    <main className="">
      {/* Hero Section */}
      <section
        className="px-4 h-[90vh] flex justify-center items-center"
        id="hero"
      >
        <Hero />
      </section>

      {/* Mission And Vision Section gap-5 sm:gap-7  */}
      
      <MissionAndVision/>
      {/* HOW WE ACHIEVE IT SECTION */}
      <section className="px-8 py-8 sm:px-16 sm:py-16">
        <h2
          className={`text-2xl font-bold sm:text-4xl ${josefinSans.className}`}
        >
          HOW WE ACHIEVE IT?
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-0 ">
          <div className="w-1/2 flex justify-center items-center ">
            <Image src="/basketball.svg" width={300} height={500} />
          </div>
          <div className="text-center sm:text-left sm:basis-1/2 sm:shrink-0 ">
            <h3 className="mb-2 text-xl font-medium">
              Upcoming and Recent Games:
            </h3>
            <p className=" text-justify text-base ">
              At The Project Gameplan, we bring you the excitement of upcoming
              matchups and recent games. Our platform keeps you in the loop with
              a comprehensive schedule, so you never miss a game.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
