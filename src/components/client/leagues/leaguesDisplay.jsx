"use client";
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Image, Link, Spinner } from "@heroui/react";
import { firestore } from "@/lib/firebase/firebase";
import { getLeaguesByLikeTitle } from "@/utils/leagueAPI";
import LeaguesTable from "@/components/client/leagues/leaguesTable";
import OngoingLeagueBanner from "@/components/client/leagues/ongoingLeagueBanner";
import { Helmet } from "react-helmet";

export default function LeaguesDisplay({ page }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  // const onGoingLeagues = useRef([]);
  // const recentLeagues = useRef([]);

  const onGoingLeagues = useMemo(() => {
    if (leagues.length > 0) {
      return leagues.filter((league) => {
        const today = new Date();
        const startDate = new Date(league.startDate);

        if (today > startDate && league.status !== "Finished") {
          return league;
        }
      });
    } else {
      return [];
    }
  }, [leagues]);

  const recentLeagues = useMemo(() => {
    if (leagues.length > 0) {
      return leagues.filter((league) => {
        if (league.status === "Finished") {
          return league;
        }
      });
    } else {
      return [];
    }
  }, [leagues]);

  // return { ...league, games: game }
  const fetchData = useCallback(async () => {
    let leagues = await firestore
      .collection("leagues")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data({ serverTimestamps: null });
          return {
            ...data,
            id: doc.id,
          };
        })
      )
      .catch((error) => console.error(error));

    let teams = leagues.map(async (league) => {
      let teams = league.participatingTeams.map(async (team) => {
        return await firestore
          .collection("teams")
          .doc(team)
          .get()
          .then((doc) => ({ id: doc.id, ...doc.data() }));
      });

      teams = await Promise.all(teams);

      return { ...league, participatingTeams: teams };
    });

    leagues = await Promise.all(teams);

    let games = leagues.map(async (league) => {
      const game = await firestore
        .collection("games")
        .where("leagueId", "==", league.id)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      return { ...league, games: game };
    });

    leagues = await Promise.all(games);

    return leagues;
  }, []);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => {
          setLeagues(res);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  return (
    <>
      <Helmet>
        <title>Leagues</title>
        <meta name="description" content="Ongoing and Finished leagues of Project:Gameplan" />
        <meta name="keywords" content="Leagues, Ongoing Leagues, Finished Leagues" />
        <meta name="author" content="Project:Gameplan" />
      </Helmet>
      {!leagues && !loading ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
          <section>
            {onGoingLeagues.length > 0 && (
              <div className="w-full ">
                {/* TODO: plural leagues if >1 leagues */}
                <h1 className="mb-2 text-2xl font-black">Ongoing League </h1> 
                < OngoingLeagueBanner ongoingLeagues={onGoingLeagues} />
              </div>
            )}
            <div>
              <h2 className="mt-4 mb-2 text-2xl font-black">Recent Leagues</h2>
              <div className="w-full overflow-x-auto">
                <LeaguesTable leagues={recentLeagues} loading={loading} />
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
