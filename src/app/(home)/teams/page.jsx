import Image from "next/image";
import UnderConstruction from "@/components/ui/underConstruction";
import SearchBarClient from "@/components/ui/searchBar/searchBar";
import TableDataDisplay from "@/components/client/teams/tableDataDisplay";
import { firestore } from "@/lib/firebase/firebase";
import { getTeamsByPage, getTeamByName } from "@/utils/teamAPI";
import { getTeamCount } from "@/utils/countersAPI";
import PaginationUI from "@/components/ui/pagination";

async function getTeams({ page, name }) {
  if (name) {
    // TODO: get team by name

    const teams = await getTeamByName(name).then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

    const sub = teams.map( async (team) => {
      const games = await firestore
        .collection("teams")
        .doc(team.id)
        .collection("gameRecords")
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
      return { ...team, games };
    })

    const data = await Promise.all(sub).then(res => res.flat());

    return { data, count: 1 };
    
  }

  const currentPage = page || 0;
  const teamsData = await getTeamsByPage(currentPage - 1, 5).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
}

export default async function Home({ searchParams }) {
  const { page, name } = searchParams;
  const { data: teams, count } = await getTeams(searchParams);

  // console.log({ teams, count });
  // teams.map((team) => console.log(team.games));

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

  return (
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
          <TableDataDisplay columns={columns} items={teams} />
        </div>
        <div className="flex items-center justify-center">
          <PaginationUI
            currentPage={page || 0}
            totalPage={count}
            url="/teams?page="
          />
        </div>
      </div>
    </main>
  );
}
