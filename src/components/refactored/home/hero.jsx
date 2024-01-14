"use client";
import React from "react";
import { josefinSans, montserrat } from "@/components/fonts";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function Hero() {
  return (
    <section
      className="min-h-[90vh] flex justify-center items-center overflow-hidden relative"
      id="hero"
    >
      <div className="w-full px-8 py-4 sm:py-8 sm:px-16 flex justify-between items-center  flex-col lg:flex-row gap-10 z-10 ">
        <motion.div
          className=" z-20 order-2 md:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1
            className={`${josefinSans.className} text-3xl sm:text-5xl text-center sm:text-left sm:leading-snug`}
          >
            More Than a Game
            <br />
            <span className="font-bold sm:font-black my-4">
              The Project Gameplan
            </span>
            <br />
            Where Passion Meets Performance
          </h1>
          <p className="text-xs sm:text-base mt-4 text-center sm:text-left">
            Browse Now: &nbsp;
            <Link className="text-xs sm:text-base font-bold" href="/players">
              Players
            </Link>{" "}
            &nbsp; | &nbsp;
            <Link className="text-xs sm:text-base font-bold" href="/teams">
              Teams
            </Link>{" "}
            &nbsp; | &nbsp;
            <Link className="text-xs sm:text-base font-bold" href="/games">
              Games
            </Link>
          </p>
        </motion.div>
        <div className="z-10 order-1 md:order-2">
          <Image src="/greek-freek.svg" alt="greek freek"/>
        </div>
      </div>
      <div className="absolute -z-10 -right-[100px] top-1/3 hidden lg:block">
        <Image src="/Ball.svg" alt="ball" />
      </div>
    </section>
  );
}
