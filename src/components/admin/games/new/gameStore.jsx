import { create } from "zustand";
import { getParticipatingTeamsData } from "@/utils/leagueAPI";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { getPlayers } from "@/utils/teamAPI";

const getTodayFormatted = (_date = null) => {
  const date = _date ? _date : new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const playerStatTemplate = {
  id: null,
  twoPointsMade: 0,
  twoPointsAttempted: 0,
  threePointsMade: 0,
  threePointsAttempted: 0,
  freeThrowsMade: 0,
  freeThrowsAttempted: 0,
  rebounds: 0,
  assists: 0,
  steals: 0,
  blocks: 0,
  turnovers: 0,
  fouls: 0,
};

const reducer = (state, action) => {};

export const useNewGameStore = create((set) => ({
  league: null,
  teamParticipants: [],
  teamA: null,
  teamAPlayers: [],
  teamB: null,
  teamBPlayers: [],
  stats: {
    teamA: [],
    teamB: [],
  },
  date: parseDate(getTodayFormatted()),
  number: null,
  lastGame: null,
  setLeague: async (league) => {
    const teamParticipants = await getParticipatingTeamsData(
      league.participatingTeams
    ).then((docs) =>
      docs.map((doc) => ({ id: doc.id, ref: doc, ...doc.data() }))
    );
    console.log("teamParticipants: ", teamParticipants);
    set({ league, teamParticipants });
  },
  setTeamA: async (team) => {
    let players = team.players;
    players = await getPlayers(players).then((docs) =>
      docs.map((doc) => ({ id: doc.id, ref: doc, ...doc.data() }))
    );
    set((state) => {
      const initialStats = players.map((player) => ({
        ...playerStatTemplate,
        fullname: `${player.firstname} ${player.lastname}`,
        firstname: player.firstname,
        lastname: player.lastname,
        number: player.number,
        id: player.id,
      }));
      return {
        teamA: team,
        teamAPlayers: players,
        stats: {
          ...state.stats,
          teamA: initialStats,
        },
      };
    });
  },
  setTeamB: async (team) => {
    let players = team.players;
    players = await getPlayers(players).then((docs) =>
      docs.map((doc) => ({ id: doc.id, ref: doc, ...doc.data() }))
    );
    set((state) => {
      const initialStats = players.map((player) => ({
        ...playerStatTemplate,
        fullname: `${player.firstname} ${player.lastname}`,
        firstname: player.firstname,
        lastname: player.lastname,
        number: player.number,
        id: player.id,
      }));
      return {
        teamB: team,
        teamBPlayers: players,
        stats: {
          ...state.stats,
          teamB: initialStats,
        },
      };
    });
  },
  setDate: (date) => set({ date }),
  setGameNumber: (gameNumber) => set({ gameNumber }),
  edit: (id) => {},
  statDispatch: (action) => set((state) => reducer(state, action)),
}));
