import React, { useCallback, useEffect, useState } from "react";

import SearchBarClient from "@/components/ui/searchBar/searchBar";
import TableDataDisplay from "@/components/client/teams/tableDataDisplay";
import { firestore } from "@/lib/firebase/firebase";
import { getTeamsByPage, getTeamByName } from "@/utils/teamAPI";
import { getTeamCount } from "@/utils/countersAPI";
import PaginationUI from "@/components/ui/pagination";
import { Spinner } from "@nextui-org/react";

export default function TeamsTable({ name, page }) {
  const [teams, setTeams] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = [
    
    {
      key: "team",
      title: "Team",
    },
    {
      key: "wins",
      title: "Wins",
    },
    {
      key: "losses",
      title: "Losses",
    },
    {
      key: "ppg",
      title: "PPG",
    },
    {
      key: "apg",
      title: "APG",
    },
    {
      key: "rpg",
      title: "RPG",
    },
    {
      key: "fgp",
      title: "FG%",
    },
  ];

  // { data, count: await getTeamCount() }
  const fetchData = useCallback(async () => {
    if (name) {
      const teams = await getTeamByName(name).then((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const sub = teams.map(async (team) => {
        const games = await firestore
          .collection("teams")
          .doc(team.id)
          .collection("gameRecords")
          .get()
          .then((snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        return { ...team, games };
      });

      const data = await Promise.all(sub).then((res) => res.flat());

      return { data, count: 1 };
    }

    const currentPage = page || 0;
    const teamsData = await getTeamsByPage(currentPage - 1, 5).then(
      (snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

    const sub = teamsData.map(async (team) => {
      const games = await firestore
        .collection("teams")
        .doc(team.id)
        .collection("gameRecords")
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
        });
      return { ...team, games };
    });

    const data = await Promise.all(sub).then((res) => {
      return res.flat();
    });

    return { data, count: await getTeamCount() };
  }, [name, page]);

  useEffect(() => {
    try {
      fetchData()
        .then(res => {
          setTeams(res.data);
          setCount(res.count);
        })
        .catch(error => {
          throw new Error(error)
        })
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  return (
    <>
      {!teams ? (
        <main className="flex items-center justify-center w-screen h-screen">
          <Spinner label="Loading..." />
        </main>
      ) : (
        <main className="px-8 py-4 sm:py-8 sm:px-16">
          <h1 className="mb-2 text-xl font-bold sm:text-2xl">Teams</h1>
          <div>
            <SearchBarClient
              label="Search Teams"
              searchUrl={"/teams?name="}
              inputProps={{ size: "sm" }}
              initialValue={name || ""}
            />
            <div className="w-full my-4 overflow-x-auto">
              <TableDataDisplay columns={columns} items={teams} loading={loading} />
            </div>
            <div className="flex items-center justify-center">
              <PaginationUI
                currentPage={page || 1}
                totalPage={count}
                url="/teams?page="
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
