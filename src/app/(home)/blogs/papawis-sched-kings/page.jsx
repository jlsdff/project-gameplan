import React from "react";
import { Image, Divider } from "@heroui/react";
import Footer from "@/components/client/footer/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ShareButtons = dynamic(() => import("@/components/ui/shareButtons"), {
  ssr: false,
});

export default function PapawisSchedKings() {
  return (
    <>
      <main className="flex flex-col w-full gap-4 px-8 mx-auto mb-8 md:px-16 md:w-2/3">
        <Image src="/blog-1.png" alt="Basketboleros" />
        <div id="intro">
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">
            Papawis Sched Kings
          </h1>
          {/* Share Buttons */}
          <ShareButtons url="https://www.projectgameplan.ph/blogs/papawis-sched-kings" />
          <Divider className="my-2" />
          <p className="text-sm leading-relaxed tracking-wide text-justify md:text-medium indent-8 ">
            We are Project : Game Plan, an organization trying to unite
            basketball enthusiasts by creating amateur basketball events. As a
            nation, we hold a deep affection for basketball; it&apos;s almost a
            necessity for us. We would relish the opportunity to play the game
            we love even once a week! We&apos;ve created a series where we
            highlight various organizations, groups, and communities, aiming to
            assist our fellow basketball-loving friends in finding new groups to
            play with. BASKETBOLEROS This group was created and organized by Mr.
            Mac Pe Benito in 2013. Currently, their group boasts 5.6k members,
            and their Facebook page has 6.8k followers. We recently conducted an
            interview with Sir Mac regarding the opportunities, struggles, and
            what it takes to organize a basketball group.
          </p>
          <br />
          <p className="text-sm leading-relaxed tracking-wide text-justify md:text-medium indent-8 ">
            Meet the Basketboleros, a tight-knit basketball community formed in
            2013 out of a passion for the game. With a growing roster of players
            and a commitment to camaraderie, they&apos;ve become more than just
            a sports group—they&apos;re a network of friends and connections.
            Organizing regular games and events, they welcome collaborations
            with other clubs and leagues, fostering a spirit of support and
            community within the basketball scene.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Pano nagsimula ang inyong basketball group?
          </h2>
          <p
            className="text-sm leading-relaxed tracking-wide indent-8 md:text-medium"
            text-justify
          >
            Nagsimula ang grupo namin noong 2013, pero mas matagal pa dyan
            kaming sumasali sa mga liga, dumadayo kung saan may alam kaming
            makakalaro. Pero ang grupo ay nabuo ng dahil sa isa naming kaibigan
            na nagbabakasyon galing ibang bansa. Everytime na uuwi sya,
            kailangan mag set kami ng schedule at dapat makalaro ang lahat ng
            tropa. Hanggang sa naging regular na kaming nagpapapawis kahit wala
            yung kaibigan namin. Habang tumatagal, dumadami kami dahil sa mga
            hatak ng mga kakilala. Hanggang sa ganito na kalaki ngayon.{" "}
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Ano po sa tingin nyo ang mga benefits ng pagkakaron ng malaking
            group?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Para sakin ang main benefit nito ay ang pagkakaron ng maraming
            kaibigan, ang paglaki ng network at pagdami ng connections. Malaking
            tulong yun sa napakaraming bagay.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Nagkakaron din po ba ng challenges sa pagiging organizer? Ano po
            yun, at papano nyo nalulutas?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Pinaka challenge talaga ng isang organizer ay ang paghandle ng
            grupo. Sa dami ng kausap mo, iba ibang ugali ay dapat mahaba ang
            iyong pasensya.
          </p>
        </div>

        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            May mga big names na po ba na nakilaro sa inyo? Sino po at papano
            sila nakasali?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Sa tagal na ng grupo, napakarami ng kilalang players ang naglaro at
            hanggang ngayon ay naglalaro sa grupo. Nakasali sila dahil din sa
            mga kakilala na nag invite sa kanila. Yung iba naman ay naging
            kaibigan na din noong mga panahon na nakakalaro pa namin sila sa
            ibang liga.
          </p>
        </div>

        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Open naman po ba kayo sa mga collaborations? (Other communities,
            leagues, personalities)
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Kami ay very open sa lahat lalo na sa ibang ballclubs. Support din
            ito sa ibang pasimulang grupo pa lang. Hindi lang naman ito laro
            kundi tulungan din at gaya ng naunang sinabi ko, lalaki ang circle
            of friends at connections dahil dito. Actually meron kaming
            paparating na league na may ka collab na ibang ballclub.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            May mga upcoming events po ba kayo?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Kami ay very open sa lahat lalo na sa ibang ballclubs. Support din
            ito sa ibang pasimulang grupo pa lang. Hindi lang naman ito laro
            kundi tulungan din at gaya ng naunang sinabi ko, lalaki ang circle
            of friends at connections dahil dito. Actually meron kaming
            paparating na league na may ka collab na ibang ballclub.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            May mga upcoming events po ba kayo?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Sa events marami, weekly meron tayong one day leagues, twice a year
            meron namang all star weekend, ito ay gaya sa all star weekend ng
            NBA. Merong 3 point competition at all star game, tapos meron ding
            major league na magsisimula sa end ng April. Dalawang division, isa
            doon ay open division na pwede ang pro at ex pro.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Ano po ang regular schedules nyo?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Napakarami naming regular schedules, 7 times a week, all evenings,
            sa apat na magkakaibang venues. Para makita nyo ang buong details ng
            aming schedules, like and follow lang kayo sa Basketboleros page.
          </p>
        </div>
        <p className="text-sm leading-relaxed tracking-wide text-justify md:text-medium indent-8 ">
          You can join the{" "}
          <Link
            className="font-bold"
            target="_blank"
            href="https://www.facebook.com/groups/763267087560373/"
          >
            Basketboleros group here.
          </Link>{" "}
          You can follow them at their{" "}
          <Link
            className="font-bold"
            target="_blank"
            href="https://www.facebook.com/basketboleros"
          >
            page for more details.
          </Link>{" "}
          Like and follow{" "}
          <Link
            className="font-bold"
            target="_blank"
            href="https://www.facebook.com/ProjectGamePlan"
          >
            our fb page for more info.
          </Link>{" "}
          Follow our IG Account{" "}
          <Link
            target="_blank"
            className="font-bold"
            href="https://www.instagram.com/projectgameplan/"
          >
            {" "}
            here.
          </Link>
          <br />
          <br />
          🏀Want to host or organize your company&apos;s / alumni / friendly
          league ❓PM us for more details ❗📳 🏀 We are also looking for
          sponsors who can help us make our events even better❗ PM us for more
          details ❗
        </p>
      </main>
      <Footer />
    </>
  );
}
