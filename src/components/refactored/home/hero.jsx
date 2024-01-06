"use client";
import React from "react";
import { josefinSans, montserrat } from "@/components/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@nextui-org/react";

export default function Hero() {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h1
          className={`${josefinSans.className} text-xl sm:text-5xl text-center sm:text-left sm:leading-snug`}
        >
          More Than a Game
          <br />
          <span className="font-bold sm:font-black my-4">
            The Project Gameplan
          </span>
          <br />
          Where Passion Meets Performance
        </h1>
        <p className="mt-4 text-center sm:text-left">
          Browse Now: &nbsp;
          <Link className="font-bold" href="/players">
            Players
          </Link>{" "}
          &nbsp; | &nbsp;
          <Link className="font-bold" href="/teams">
            Teams
          </Link>{" "}
          &nbsp; | &nbsp;
          <Link className="font-bold" href="/games">
            Games
          </Link>
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
