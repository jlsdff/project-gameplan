import React from "react";
import dynamic from "next/dynamic";

import { Image } from "@heroui/react";
import Link from "next/link";

const BlogContainer = dynamic(
  () => import("@/components/client/blog/blogContainer")
);

export default function BlogPage() {
  return (
    <>
      <section className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
        <h1 className="mb-6 text-xl md:text-2xl">Recent Blogs</h1>
        <div className="flex flex-col space-y-2">
          <BlogContainer
            title="PAPAWIS SCHED KINGS"
            description="Meet the Basketboleros, a basketball group formed in 2013 that has evolved into a thriving community of hoop enthusiasts. Founded by a group of friends initially brought together by a returning expatriate buddy, the Basketboleros have grown steadily over the years, attracting more players through word of mouth and expanding their network. Led by organizer Mac Pe Benito, the group emphasizes the value of camaraderie, friendship, and networking, seeing these as the primary benefits of being part of such a large community. Despite the challenges of managing a diverse group of individuals, Mac and his team remain dedicated to fostering a welcoming environment for all. With regular weekly games, special events like the upcoming All-Star Weekend, and collaborations with other ballclubs, the Basketboleros continue to provide a platform for basketball enthusiasts to come together, compete, and forge lasting connections both on and off the court."
            datePublished={"April 16, 2024"}
            author={"The Project Gameplan"}
            image={{ url: "/blog-1.png", alt: "Basketboleros" }}
            slug="papawis-sched-kings"
            tags={["Basketboleros"]}
          />
          <BlogContainer
            title="CUBAO BALLERS CLUB"
            description="Introducing the CUBAO BALLERS CLUB or CBC! This group is organized by Mr. Mark Sy. Currently, their group boasts 2.0k members, and their Facebook page has 3.4k followers. We were able to connect with CBC through a fellow basketball brother, Jonrey Santos! Jonrey has been helping a lot of ball clubs on and off the court! We recently conducted an interview with Sir Mark regarding the opportunities, struggles, and what it takes to organize a basketball group."
            datePublished={"June 1, 2024"}
            author={"The Project Gameplan"}
            image={{ url: "/blog-2.png", alt: "CUBAO BALLERS CLUB" }}
            slug="cubao-ballers-club"
            tags={["CUBAO BALLERS CLUB"]}
          />
        </div>
      </section>
    </>
  );
}
