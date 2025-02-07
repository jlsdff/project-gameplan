"use client";

import React, { Suspense } from "react";
import { getOngoingLeagues } from "@/utils/leagueAPI";
import { Image, Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const snaps = await getOngoingLeagues();
  return snaps.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Main = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ongoingLeagues"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    suspense: true,
    staleTime: "Infinity",
  });

  if (data.length === 0) {
    return <p>No Ongoing League...</p>;
  }

  if (data.length > 0) {
    return (
      <section className="space-y-2.5">
        {data.map((league) => (
          <Link
            href={`/leagues?id=${league.id}`}
            key={league.id}
            className="rounded-lg hover:bg-transparent"
          >
            <div className="relative w-full sm:max-w-md group">
              <Image
                className="rounded-lg"
                src={league.leagueImage}
                alt={league.title}
              />
              <div
                id="league-title"
                className="absolute bottom-0 left-0 z-10 flex flex-col justify-end w-full px-4 py-2 transition-opacity duration-300 rounded-lg opacity-0 group-hover:opacity-100 h-1/2 bg-gradient-to-b-transparent-black"
              >
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {league.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }
};

const Loading = () => {
  return (
    <div className="max-w-sm space-y-2.5 ">
      <Skeleton className="w-max h-[100px] rounded-md" />
      <Skeleton className="w-max h-[100px] rounded-md" />
      <Skeleton className="w-max h-[100px] rounded-md" />
    </div>
  );
};

const OngoingLeagues = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
};

export default OngoingLeagues;
