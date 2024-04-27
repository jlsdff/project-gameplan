import React from "react";
import dynamic from "next/dynamic";

import { Image } from "@nextui-org/react";
import Link from "next/link";

const BlogContainer = dynamic(
  () => import("@/components/client/blog/blogContainer"),
  { ssr: false }
);

export default function BlogPage() {
  return (
    <>
      <section className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
        <h1 className="mb-6 text-xl md:text-2xl">Recent Blogs</h1>
        <div className="flex flex-col">
          <BlogContainer
            title="PAPAWIS SCHED KINGS"
            description="Meet the Basketboleros, a basketball group formed in 2013 that has evolved into a thriving community of hoop enthusiasts. Founded by a group of friends initially brought together by a returning expatriate buddy, the Basketboleros have grown steadily over the years, attracting more players through word of mouth and expanding their network. Led by organizer Mac Pe Benito, the group emphasizes the value of camaraderie, friendship, and networking, seeing these as the primary benefits of being part of such a large community. Despite the challenges of managing a diverse group of individuals, Mac and his team remain dedicated to fostering a welcoming environment for all. With regular weekly games, special events like the upcoming All-Star Weekend, and collaborations with other ballclubs, the Basketboleros continue to provide a platform for basketball enthusiasts to come together, compete, and forge lasting connections both on and off the court."
            datePublished={"April 16, 2024"}
            author={"The Project Gameplan"}
            image={{ url: "/blog-1.png", alt: "Basketboleros" }}
            slug="papawis-sched-kings"
            tags={["Basketboleros"]}
          />
        </div>
      </section>
    </>
  );
}
