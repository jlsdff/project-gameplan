"use client";

import React from "react";
import { josefinSans, montserrat } from "@/components/fonts";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

export default function MissionAndVision() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 sm:px-16 sm:py-16 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-4 flex-wrap min-h-[50vh] relative overflow-hidden">
      <div className="absolute -left-[200px] sm:-left-[100px] opacity-100 h-full">
        <Image
          className="object-cover w-full"
          src="/logo-background.svg"
          width={"auto"}
        />
      </div>
      <motion.div
        className="text-center grow-0 basis-1/4 shrink-0 z-10 order-2 sm:order-1"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: "some" }}
      >
        <h2 className={`text-xl sm:text-2xl font-medium mb-2 ${josefinSans.className}`}>
          Our Mission
        </h2>
        <p className="text-sm sm:text-medium leading-normal">
          Our mission is to transform the way basketball is experienced. We are
          dedicated to providing fans with an immersive platform that goes
          beyond scores and statistics, fostering a global community united by
          the love of the game
        </p>
      </motion.div>
      <motion.div
        className="text-center grow-0 basis-1/4 shrink-0 z-10 order-1 sm:order-2"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        viewport={{ once: true, amount: "some" }}
      >
        <h2
          className={`text-xl sm:text-2xl font-bold mb-2 ${josefinSans.className}`}
        >
          Our Vision for Fans
        </h2>
        <p className="text-sm sm:text-medium leading-normal">
          We envisions a world where every basketball fan, from casual
          enthusiasts to die-hard supporters, has a home to share, celebrate,
          and live the excitement of the game. We aspire to be the ultimate
          destination that not only informs and entertains but also unites fans
          worldwide in their shared love for basketball.
        </p>
      </motion.div>
      <motion.div
        className="text-center grow-0 basis-1/4 shrink-0 z-10 order-last"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
        viewport={{ once: true, amount: "some" }}
      >
        <h2 className={`text-xl sm:text-2xl font-medium mb-2 ${josefinSans.className}`}>
          Our Vision
        </h2>
        <p className="text-sm sm:text-medium leading-normal">
          Our values are rooted in passion, innovation, and inclusivity. We
          celebrate the diversity within the basketball community and strive to
          create a platform where every fan feels connected, engaged, and
          valued. Integrity, authenticity, and a relentless pursuit of
          excellence guide our every move.
        </p>
      </motion.div>
    </section>
  );
}
