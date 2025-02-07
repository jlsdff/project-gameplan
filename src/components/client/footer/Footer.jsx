import React from "react";
import { Link } from "@heroui/react";
import { Image } from "@heroui/react";
import { josefinSans } from "@/components/fonts";

export default function Footer() {
  return (
    <section className="bg-neutral-800 " id="footer">
      <div className="flex flex-col items-start gap-4 px-4 py-8  sm:py-16 sm:flex-row justify-evenly">
        <div className="flex flex-col gap-1 sm:gap-4">
          <div className="flex items-center justify-start gap-4 mb-1 sm:mb-5 ">
            <div className="w-[64px] sm:w-[125px]">
              <Image src="/TPG.svg" width={115} alt="project gameplan logo" />
            </div>
            <span className={`${josefinSans.className} text-xl sm:text-3xl `}>
              PROJECT:
              <br />
              GAMEPLAN
            </span>
          </div>
          <a href="mailto:projectgameplan.99@gmail.com">
            <p className="text-sm ">projectgameplan.99@gmail.com</p>
          </a>
        </div>
        <div className="">
          <h3 className="mb-1 text-xl font-bold sm:mb-4">Who we are</h3>
          <div className="flex flex-col justify-start gap-1">
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/about-us"
            >
              About us
            </Link>
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/contact-us"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="">
          <h3 className="mb-1 text-xl font-bold sm:mb-4">Useful Links</h3>
          <div className="flex flex-col justify-start gap-1">
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/players"
            >
              Players
            </Link>
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/teans"
            >
              Teams
            </Link>
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="/games"
            >
              Games
            </Link>
          </div>
        </div>
        <div className="">
          <h3 className="mb-1 text-xl font-bold sm:mb-4">Follow Us</h3>
          <div className="flex flex-col justify-start gap-1">
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="https://www.facebook.com/ProjectGamePlan"
            >
              Facebook
            </Link>
            <Link
              className="text-sm text-white sm:text-base hover:text-neutral-200"
              href="https://www.instagram.com/projectgameplan/"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-5 text-center  bg-primary-800">
        <span className="text-xs ">Copyright 2023 © Project:Gameplan </span>
      </div>
    </section>
  );
}
