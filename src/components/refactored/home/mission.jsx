import React from "react"
import { josefinSans, montserrat } from "@/components/fonts";


export default function MissionAndVision() {
    return (
        <section className="bg-primary py-6 px-8 sm:px-16 sm:py-16 flex flex-col sm:flex-row justify-between items-center min-h-[50vh]">
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
    )
}