"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Image, Chip } from "@nextui-org/react";

export default function BlogContainer({
  title,
  description,
  datePublished,
  author,
  image: { url, alt },
  slug,
  tags,
}) {
  const router = useRouter();

  const handleNavigation = () => router.push(`/blogs/${slug}`);

  return (
    <div
      className="flex flex-col items-center justify-start gap-2 p-4 border rounded-lg cursor-pointer md:flex-row drop-shadow-md border-primary-900"
      onClick={handleNavigation}
    >
      <div className="flex-shrink-0">
        <Image src={url} alt={alt} className="w-full md:w-48 " />
      </div>
      <div className="flex-grow overflow-auto ">
        <h2 className="mb-4 text-lg font-bold md:text-xl">{title}</h2>
        <p className="line-clamp-3 md:line-clamp-2">{description}</p>
        <div className="flex items-center justify-start gap-2 mt-2">
          <p>{datePublished}</p>
          <p>{tags.map(tag => <Chip>{tag}</Chip>)}</p>
        </div>
      </div>
    </div>
  );
}
