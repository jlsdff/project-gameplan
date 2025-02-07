"use client";
import React from "react";
import { josefinSans, montserrat } from "@/components/fonts";
import { motion } from "framer-motion";
import { Link } from "@heroui/react";
import { Image } from "@heroui/react";
import ImageCarousel from "./imageCarousel";

export default function Hero() {
  return (
    <section
      className="min-h-[90vh] flex justify-center items-center overflow-hidden relative"
      id="hero"
    > 
      <div className="z-10 flex flex-col items-center justify-between w-full gap-10 px-8 py-4 sm:py-8 sm:px-16 lg:flex-row ">
        <motion.div
          className="z-20 order-2 md:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1
            className={`${josefinSans.className} text-3xl sm:text-5xl text-center sm:text-left sm:leading-snug`}
          >
            More Than a Game
            <br />
            <span className="my-4 font-bold sm:font-black">
              Project:Gameplan
            </span>
            <br />
            Where Passion Meets Performance
          </h1>
          <p className="mt-4 text-xs text-center sm:text-base sm:text-left">
            Browse Now: &nbsp;
            <Link className="text-xs font-bold sm:text-base" href="/players">
              Players
            </Link>{" "}
            &nbsp; | &nbsp;
            <Link className="text-xs font-bold sm:text-base" href="/teams">
              Teams
            </Link>{" "}
            &nbsp; | &nbsp;
            <Link className="text-xs font-bold sm:text-base" href="/leagues">
              Leagues
            </Link>
          </p>
        </motion.div>
        <div className="w-full md:w-1/2">
          <ImageCarousel  />
        </div>
      </div>
      <div className="absolute -z-10 -right-[100px] top-1/3 hidden lg:block">
        <Image src="/Ball.svg" alt="ball" />
      </div>
    </section>
  );
}
