import { create } from "zustand";
import { getParticipatingTeamsData } from "@/utils/leagueAPI";
import { parseDate, getLocalTimeZone } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"
import { getPlayers } from "@/utils/teamAPI";

const getTodayFormatted = (_date=null) => {
  const date = _date ? _date : new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const useNewGameStore = create((set) => ({
  league: null,
  teamParticipants: [],
  teamA: null,
  teamAPlayers: [],
  teamB: null,
  teamBPlayers: [],
  playerStats: {
    teamA: [],
    teamB: []
  },
  date: parseDate(getTodayFormatted()),
  number: null,
  lastGame: null,
  setLeague: async (league) => {
    const teamParticipants = await getParticipatingTeamsData(league.participatingTeams)
      .then( docs => docs.map( doc => ({ id: doc.id, ref: doc, ...doc.data() }) ) )
    console.log("teamParticipants: ", teamParticipants)
    set({ league, teamParticipants });
  },
  setTeamA: async (team) => {
    let players = team.players
    players = await getPlayers(players)
      .then( docs => docs.map( doc => ({ id: doc.id, ref: doc, ...doc.data() }) ) )
    set({ teamA: team, teamAPlayers: players })
  },
  setTeamB: async (team) => {
    let players = team.players
    players = await getPlayers(players)
      .then( docs => docs.map( doc => ({ id: doc.id, ref: doc, ...doc.data() }) ) )
    set({ teamB: team, teamBPlayers: players })
  },
  setDate: (date) => set({ date }),
  setGameNumber: (gameNumber) => set({ gameNumber }),
}));