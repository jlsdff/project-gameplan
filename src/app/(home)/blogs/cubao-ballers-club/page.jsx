import React from "react";
import { Image, Divider } from "@nextui-org/react";
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
        <div className="flex items-center justify-center">
          <Image className="w-full" src="/blog-2.png" alt="Basketboleros" />
        </div>
        <div id="intro">
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">
            Cubao Ballers Club
          </h1>
          {/* Share Buttons */}
          <ShareButtons url="https://www.projectgameplan.ph/blogs/cubao-ballers-club" />
          <Divider className="my-2" />
          <p className="text-sm leading-relaxed tracking-wide text-justify md:text-medium indent-8 ">
            We are Project : Game Plan, an organization trying to unite
            basketball enthusiasts by creating amateur basketball events. As a
            nation, we hold a deep affection for basketball; it&apos;s almost a
            necessity for us. We would relish the opportunity to play the game
            we love even once a week! We&apos;ve created a series where we
            highlight various organizations, groups, and communities, aiming to
            assist our fellow basketball-loving friends in finding new groups to
            play with.
          </p>
          <br />
          <p className="text-sm leading-relaxed tracking-wide text-justify md:text-medium indent-8 ">
            Introducing the CUBAO BALLERS CLUB or CBC! This group is organized
            by Mr. Mark Sy. Currently, their group boasts 2.0k members, and
            their Facebook page has 3.4k followers. We were able to connect with
            CBC through a fellow basketball brother, Jonrey Santos! Jonrey has
            been helping a lot of ball clubs on and off the court! We recently
            conducted an interview with Sir Mark regarding the opportunities,
            struggles, and what it takes to organize a basketball group.
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
            Around 2014 nasali ako sa isang group, then eventually ako na nag
            manage dahil sa passion for the game, nag stop during pandemic then
            during mid to end pandemic nagstart yung group.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Ano po sa tingin nyo ang mga benefits ng pagkakaron ng malaking
            group?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Pinaka benefit is yung network na na-create ng group, halos lahat ng
            supplier ng group and personal needs, within the circle ko na
            kinukuha, and siyempre isa pang benefit is yung samahan in and out
            the court.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Nagkakaron din po ba ng challenges sa pagiging organizer? Ano po
            yun, at papano nyo nalulutas?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Madami lalo na nung nagsisimula palang yung group, namura na ako at
            napagsabihan ng mga hindi magagandang salita dahil sa pagiging
            organizer pero syempre kung alam natin wala tayong ginagawang masama
            eventually ang mga matitira ay yung mga fit sa sistema at culture ng
            grupo.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Para sa mga players nyo or future players, ano sa tingin nyo ung
            benefit sa pagsali sa group nyo?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            First is competitive papawis runs, Second, yung culture ng group,
            madalas nagtutulungan yung nasa loob ng circle para sa network ng
            isa&apos;t isa, last but not the least, kung hanap mo yung regular
            health benefit, kaya mag perform nung group kasi regular na yung
            scheds.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            May mga big names na po ba na nakilaro sa inyo? Sino po at papano
            sila nakasali?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Pinaka big name(s) is Diego Dario ng Meralco Boltz, nag message siya
            sa page. Yung iba mga MPBL players, sa page din.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Open naman po ba kayo sa mga collaborations? (Other communities,
            leagues, personalities)
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Yes! CBC culture ang build and connect.
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            May mga upcoming events po ba kayo?
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            May mga regular leagues kami, siguro at least 15 a year
          </p>
        </div>
        <div className="mb-3">
          <h2 className="mb-2 font-bold leading-relaxed tracking-wide text-md md:text-lg ">
            Ano po ang regular schedules nyo? (Time and Venue)
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Monday, Wednesday, Thursday, Friday, Saturday and Sunday! 7TO9PM all
            with in Quezon City
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            You can join the Cubao Ballers Club group{" "}
            <Link
              className="font-bold"
              target="_blank"
              href="https://www.facebook.com/groups/2028432070629521/"
            >
              here
            </Link>
            . You can follow them at their{" "}
            <Link
              className="font-bold"
              target="_blank"
              href="https://www.facebook.com/BasketballPlayersClub"
            >
              page
            </Link>{" "}
            for more details.
          </p>
        </div>

        <div className="mb-3">
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            Like and follow Project : Game Plan’s{" "}
            <Link
              className="font-bold"
              target="_blank"
              href="https://www.facebook.com/ProjectGamePlan"
            >
              Facebook
            </Link>{" "}
            and{" "}
            <Link
              className="font-bold"
              target="_blank"
              href="https://www.instagram.com/projectgameplan"
            >
              Instagram
            </Link>{" "}
            page for more info.
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm leading-relaxed tracking-wide text-justify indent-8 md:text-medium">
            🏀Want to host or organize your company&apos;s / alumni / friendly league
            ❓PM us for more details ❗📳 🏀 We are also looking for sponsors
            who can help us make our events even better❗ PM us for more details
            ❗
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
