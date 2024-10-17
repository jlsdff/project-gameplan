"use client";

import React, { useState, useCallback, useEffect } from "react";
import { getOngoingLeagues } from "@/utils/leagueAPI";
import { Image, Link, Spinner } from "@nextui-org/react";

export default function OngoingLeagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true)
      const res = getOngoingLeagues().then((snaps) =>
        setLeagues(snaps.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[300px] flex justify-center items-center">
        <Spinner />
      </section>
    );
  }

  if (leagues.length === 0) {
    return <></>;
  }

  if (leagues.length > 0) {
    return (
      <section className="space-y-2.5">
        {leagues.map((league) => (
          <Link href={`/leagues?id=${league.id}`} key={league.id} className="rounded-lg hover:bg-transparent">
            <div className="relative w-full sm:max-w-md group">
              <Image className="rounded-lg" src={league.leagueImage} alt={league.title} />
              <div id="league-title" className="absolute bottom-0 left-0 z-10 flex flex-col justify-end w-full px-4 py-2 transition-opacity duration-300 rounded-lg opacity-0 group-hover:opacity-100 h-1/2 bg-gradient-to-b-transparent-black">
                <h3 className="text-lg font-bold text-white sm:text-xl">{league.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }
}
