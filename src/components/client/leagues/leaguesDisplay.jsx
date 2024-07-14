"use client";
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Image, Link, Spinner } from "@nextui-org/react";
import { firestore } from "@/lib/firebase/firebase";
import { getLeaguesByLikeTitle } from "@/utils/leagueAPI";
import LeaguesTable from "@/components/client/leagues/leaguesTable";

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
          // onGoingLeagues.current = res.filter((league) => {
          //   const today = new Date();
          //   const startDate = new Date(league.startDate);
          //   if (today > startDate && league.status !== "Finished") {
          //     return league;
          //   } else {
          //     recentLeagues.current.push(league);
          //   }
          // });
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

  const timeToDate = (time) => {
    const [hours, minutes] = time.split(":");
    let timeToDate = new Date();
    timeToDate.setHours(hours);
    timeToDate.setMinutes(minutes);
    return timeToDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const displayGameShedule = (game) => {
    const dateSchedule = game.dateSchedule.join(", ");
    const timeFrom = timeToDate(game.timeFrom);
    const timeTo = timeToDate(game.timeTo);
    return `${dateSchedule} | ${timeFrom} - ${timeTo}`;
  };

  return (
    <>
      {!leagues && !loading ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
          <section>
            {onGoingLeagues.length > 0 && (
              <div className="w-full ">
                <h1 className="mb-2 text-2xl font-black">Ongoing League </h1>
                {/* <LeaguesTable leagues={onGoingLeagues} /> */}
                <Link
                  href={`/leagues?id=${onGoingLeagues[0].id}`}
                  className="flex flex-col items-start justify-start gap-3 py-2 cursor-pointer sm:flex-row hover:underline "
                >
                  <div className="w-full sm:max-w-sm">
                    <Image
                      src={onGoingLeagues[0].leagueImage}
                      alt={onGoingLeagues[0].title}
                    />
                  </div>
                  <div className="flex flex-col justify-start gap-2">
                    <h2 className="text-3xl font-bold sm:text-2xl text-primary">
                      {onGoingLeagues[0].title || ""}
                    </h2>
                    <div className=" text-foreground">
                      {onGoingLeagues[0].venue && (
                        <h3>
                          <span className="text-lg font-semibold">Venue:</span>
                          <br />
                          <span>{onGoingLeagues[0].venue}</span>
                        </h3>
                      )}
                      {
                        onGoingLeagues[0].gameSchedule && (
                        <h3>
                          <span className="text-lg font-semibold">
                            Game Schedule:
                          </span>
                          <br />
                          <span>{displayGameShedule(onGoingLeagues[0])}</span>
                        </h3>
                      )}
                    </div>
                  </div>
                </Link>
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
