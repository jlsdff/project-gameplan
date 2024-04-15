import React from "react";
// import RecentBlogs from "@/components/client/blog/recentBlogs";
import { Link, Image } from "@nextui-org/react";

export default function BlogPage() {
  return (
    <section className="px-8 py-4 sm:py-8 sm:px-16">
      <h1 className="text-xl md:text-2xl">Recent Blogs</h1>
      <Link
        className="h-[150px] flex justify-start items-center"
        href="/blogs/sampleBlog"
      >
        <div>
          <Image
            className="object-cover w-20 h-20 rounded-full md:w-32 md:h-32"
            src="https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-xl">Sample Blog</h2>
          <p className="truncate ...">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            suscipit esse obcaecati reprehenderit iusto minima totam cum, odit
            ut repellat non nostrum soluta, culpa aliquam quis quibusdam a
            excepturi autem.
          </p>
        </div>
      </Link>
    </section>
  );
}
