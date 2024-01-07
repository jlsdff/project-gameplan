"use client";
import { motion } from "framer-motion";
import React from "react";
import { josefinSans, montserrat } from "@/components/fonts";
import { Image } from "@nextui-org/react";

export default function HowWeAchieveIt() {
  return (
    <section className="p-8 sm:p-16 overflow-hidden">
      <h2
        className={`text-center md:text-left text-3xl font-black ${josefinSans.className}`}
      >
        HOW WE ACHIEVE IT?
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className=" h-full sm:max-h-[400px] -z-10 basis-1/4 sm:basis-1/2 shrink-0 flex justify-center items-center ">
          <Image src="/basketball.svg" width={"auto"} />
        </div>
        <div className="min-h-[400px] flex flex-col justify-evenly items-center text-center md:text-left gap-4 mt-8 ">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: "some" }}
          >
            <h3 className="text-xl sm:text-2xl font-medium mb-2">
              Players and Statistics
              
            </h3>
            <p className="text-sm sm:text-medium leading-normal">
              Dive into the stats that matter. Project GamePlan provides a
              detailed look at teams and players' performance, offering in-depth
              statistics, trends, and insights. Whether you're a stats
              enthusiast or looking for key player metrics, our platform has you
              covered with the latest and most comprehensive data.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: "some" }}
          >
            <h3 className="text-xl sm:text-2xl font-medium mb-2">
              Upcoming and Recent Games
              
            </h3>
            <p className="text-sm sm:text-medium leading-normal">
              At The Project Gameplan, we bring you the excitement of upcoming
              matchups and recent games. Our platform keeps you in the loop with
              a comprehensive schedule, so you never miss a game.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: "some" }}
          >
            <h3 className="text-xl sm:text-2xl font-medium mb-2">
              Teams and Rosters
              
            </h3>
            <p className="text-sm sm:text-medium leading-normal">
              Get to know your favorite teams and players. Our platform provides
              a comprehensive look at teams and rosters, including player
              profiles, stats, and more.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
