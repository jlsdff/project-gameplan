import Image from "next/image";
import { Link } from "@nextui-org/react";
import { josefinSans, montserrat } from "@/components/fonts";
import Footer from "@/components/client/footer/Footer";
import Hero from "@/components/refactored/home/hero";

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
      <section className="bg-primary p-6 sm:py-16 flex flex-col sm:flex-row justify-evenly items-center min-h-[50vh]">
        <div className="text-center grow-0 basis-1/4 shrink-0">
          <h2 className={`text-xl sm:text-2xl mb-2 ${josefinSans.className}`}>
            Our Mission
          </h2>
          <p className="text-justify">
            Our mission is to transform the way basketball is experienced. We
            are dedicated to providing fans with an immersive platform that goes
            beyond scores and statistics, fostering a global community united by
            the love of the game
          </p>
        </div>
        <div className="text-center grow-0 basis-1/4 shrink-0">
          <h2
            className={`text-xl sm:text-2xl font-bold mb-2 ${josefinSans.className}`}
          >
            Our Vision for Fans
          </h2>
          <p className="text-justify">
            We envisions a world where every basketball fan, from casual
            enthusiasts to die-hard supporters, has a home to share, celebrate,
            and live the excitement of the game. We aspire to be the ultimate
            destination that not only informs and entertains but also unites
            fans worldwide in their shared love for basketball.
          </p>
        </div>
        <div className="text-center grow-0 basis-1/4 shrink-0">
          <h2 className={`text-xl sm:text-2xl mb-2 ${josefinSans.className}`}>
            Our Vision
          </h2>
          <p className="text-justify">
            Our values are rooted in passion, innovation, and inclusivity. We
            celebrate the diversity within the basketball community and strive
            to create a platform where every fan feels connected, engaged, and
            valued. Integrity, authenticity, and a relentless pursuit of
            excellence guide our every move.
          </p>
        </div>
      </section>

      {/*  */}
      <section className="px-6 py-6 sm:py-10 sm:pb-0">
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
      <Footer />
    </main>
  );
}
