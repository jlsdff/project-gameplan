import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from "react";
import { firestore } from "@/lib/firebase/firebase";
import { Image, Divider, User, Link } from "@nextui-org/react";
import LeagueIdTable from "@/components/client/leagues/leagueIdTable";

export default function LeaguePage({ id }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {

    let league = await firestore
      .collection("leagues")
      .doc(id)
      .get()
      .then((doc) => ({ id: doc.id, ...doc.data() }));

    // Get teams for this league
    let teams = league.participatingTeams.map(async (team) => {
      return await firestore
        .collection("teams")
        .doc(team)
        .get()
        .then((doc) => ({
          id: doc.id,
          ...doc.data(),
          standings: { w: 0, l: 0 },
        }));
    });
    league.participatingTeams = await Promise.all(teams);

    // Get games for this league
    let games = await firestore
      .collection("games")
      .where("leagueId", "==", league.id)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          const time = doc.data().time.toDate();
          return {
            id: doc.id,
            ...doc.data(),
            time,
          };
        })
      );

    // Get teams for each games
    games = games.map(async (game) => {
      const teamA = game.teamA.id;
      const teamB = game.teamB.id;
      const teamAData = await firestore
        .collection("teams")
        .doc(teamA)
        .get()
        .then((doc) => ({ id: doc.id, ...doc.data() }));
      const teamBData = await firestore
        .collection("teams")
        .doc(teamB)
        .get()
        .then((doc) => ({ id: doc.id, ...doc.data() }));
      return {
        ...game,
        teamA: {
          ...game.teamA,
          data: teamAData,
        },
        teamB: {
          ...game.teamB,
          data: teamBData,
        },
      };
    });
    games = await Promise.all(games);

    league = { ...league, games };
    league.games.map((game) => {
      const teamA = league.participatingTeams.find(
        (team) => team.id === game.teamA.id
      );
      const teamB = league.participatingTeams.find(
        (team) => team.id === game.teamB.id
      );
      if (!teamA || !teamB) return;

      if (game.teamA.stats.points > game.teamB.stats.points) {
        teamA.standings.w++;
        teamB.standings.l++;
      } else {
        teamB.standings.w++;
        teamA.standings.l++;
      }
    });
    return league;
  }, [id]);

  useEffect(() => {
    try {
      fetchData()
        .then((res) => {
          console.log(res)
          setLeague(res);
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

  const displaySchedule = useCallback(() => {
    const venue = league.venue;
    const start = new Date(league.startDate);
    const dateSchedule = league.dateSchedule.join(", ");
    let timeFrom = new Date();
    timeFrom.setHours(league.timeFrom.split(":")[0]);
    timeFrom.setMinutes(league.timeFrom.split(":")[1]);
    timeFrom = timeFrom.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let timeTo = new Date();
    timeTo.setHours(league.timeTo.split(":")[0]);
    timeTo.setMinutes(league.timeTo.split(":")[1]);
    timeTo = timeTo.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const jsx = (
      <span>
        Every <span className="font-semibold">{dateSchedule}</span> at{" "}
        <span className="font-semibold">{venue}</span> , from{" "}
        <span className="font-semibold">{timeFrom}</span> to{" "}
        <span className="font-semibold">{timeTo}</span>
      </span>
    );
    return jsx;
  }, [league]);

  const renderLeagueData = (block) => {
    const { data, id } = block;
    switch (block.type) {
      case "header":
        return (
          <h2 className="mt-2 text-lg font-semibold" key={id}>
            {data.text}
          </h2>
        );
      case "paragraph":
        return (
          <p className="mt-2 " key={id}>
            {data.text}
          </p>
        );
      case "list":
        return (
          <ul key={id} className="list-disc list-inside">
            {data.items.map((item, index) => (
              <li key={`${id}-${index}`}>{item}</li>
            ))}
          </ul>
        );
      default:
        return "";
    }
  };

  return (
    <>
      {!league ? (
        <main className="w-screen h-screen flex justify-center items-center">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="w-full">
          <section className="flex flex-col items-start justify-start gap-2 px-8 py-4 sm:flex-row sm:py-8 sm:px-16">
            <div className="w-full sm:border-r sm:border-neutral-700/80 grow-1">
              <h1 className="text-2xl font-black sm:text-4xl text-primary">
                {league.title}
              </h1>
              <div className="max-w-lg mt-4 mb-2">
                <Image src={league.leagueImage} alt={league.title} />
              </div>
              <div>
                <h2>
                  Starting:{" "}
                  <span className="font-semibold">
                    {new Date(league.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>{" "}
                </h2>
                <h2>Game Schedule: {displaySchedule()}</h2>
                <div className="my-4">
                  {league.leagueData.blocks.map((block, index) =>
                    renderLeagueData(block)
                  )}
                </div>
              </div>
            </div>
            <div className="shrink-0 min-w-fit">
              <div className="min-w-[320px]">
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">
                  Standings
                </h2>
                <div className="space-y-3">
                  {league.participatingTeams
                    .sort((a, b) => b.standings.w - a.standings.w)
                    .map((team) => {
                      return (
                        <Link
                          href={`/teams?id=${team.id}`}
                          key={team.id}
                          className="flex items-center justify-between gap-2 font-semibold text-foreground hover:underline"
                        >
                          <User
                            name={team.teamName}
                            description={team.teamAbbr}
                            avatarProps={{ src: team.teamLogo }}
                          />
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-success">
                              W: {team.standings.w}
                            </span>
                            <span className="text-danger">
                              L: {team.standings.l}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
          <section className="px-8 py-4 sm:py-8 sm:px-16">
            <h2 className="mb-2 text-xl font-bold sm:text-2xl">Games</h2>
            <LeagueIdTable
              teams={league.participatingTeams}
              games={league.games}
            />
          </section>
        </main>
      )}
    </>
  );
}
