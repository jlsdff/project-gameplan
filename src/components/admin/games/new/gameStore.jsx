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
  twoPointsMade: null,
  twoPointsAttempted: null,
  threePointsMade: null,
  threePointsAttempted: null,
  freeThrowsMade: null,
  freeThrowsAttempted: null,
  rebounds: null,
  assists: null,
  steals: null,
  blocks: null,
  turnovers: null,
  fouls: null,
  isDNP: false,
};

const reducer = (state, action) => {

  const { type, id, team, value } = action

  return {
    ...state,
    stats: {
      ...state.stats,
      [team]: state.stats[team].map( player => {
        if(player.id === id) {
          return {
            ...player,
            [type]: value
          }
        }
        return player
      })
    }
  }
  
};

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
  statsDispatch: (action) => set((state) => reducer(state, action)),
  markAsDNP: (id) => set(state => {
    const team = state.teamAPlayers.find(player => player.id === id) ? 'teamA' : 'teamB';
    return {
      ...state,
      stats: {
        ...state.stats,
        [team]: state.stats[team].map(player => {
          if(player.id === id) {
            return {
              ...player,
              isDNP: !player.isDNP
            }
          }
          return player;
        })
      }
    }
    
  }),
  newPlayer: (player, team) => {
    console.log("New Player: ", player, team);
  }
}));