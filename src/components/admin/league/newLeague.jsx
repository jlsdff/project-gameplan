"use client";
import React, { useReducer, useCallback, useMemo, useEffect } from "react";
import {
  Input,
  Tooltip,
  CheckboxGroup,
  Checkbox,
  Button,
  ScrollShadow,
  Avatar,
} from "@nextui-org/react";
import AddIcon from "@/assets/addIcon";
import Editor from "@/components/ui/editorJs/editorJs";
import SearchIcon from "@/assets/searchIcon";
import { getTeamByName, getTeamById } from "@/utils/teamAPI";
import XIcon from "@/assets/xIcon";
import { createLeague, getLeagueById, updateLeague } from "@/utils/leagueAPI";
import { useRouter, useSearchParams } from "next/navigation";

const reducer = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "venue":
      return { ...state, venue: action.value };
    case "dateSchedule":
      return { ...state, dateSchedule: action.value };
    case "timeFrom":
      return { ...state, timeFrom: action.value };
    case "timeTo":
      return { ...state, timeTo: action.value };
    case "leagueData":
      return { ...state, leagueData: action.value };
    case "startDate":
      return { ...state, startDate: action.value };
    case "leagueImage":
      return { ...state, leagueImage: action.value };
    case "searchValue":
      return { ...state, searchValue: action.value };
    case "searchResult":
      return { ...state, searchResult: action.value };
    case "addedTeams":
      return { ...state, addedTeams: action.value };
    case "setLeagueData":
      return { ...state, ...action.value };
    case "editorInstance":
      return { ...state, editorInstance: action.value };
    default:
      return state;
  }
};

export default function NewLeague() {
  const searchParams = useSearchParams();
  const [leagueState, leagueDispatch] = useReducer(reducer, {
    title: "",
    venue: "",
    timeFrom: "",
    timeTo: "",
    leagueImage: null,
    startDate: "",
    dateSchedule: [],
    leagueData: {},
    searchValue: "",
    searchResult: [],
    addedTeams: [],
    editorInstance: null,
  });
  console.log(leagueState)
  const router = useRouter();

  const days = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );
  
  const fetchTeamsByIds = useCallback(
    async (teamIds) => {
      const teams = [];
      teamIds.forEach(async (id) => {
        const team = await getTeamById(id)
          .then((res) => {
            const teamData = {
              id: res.id,
              ...res.data(),
            };
            leagueDispatch({
              type: "addedTeams",
              value: [...leagueState.addedTeams, teamData],
            });
            return teamData;
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to fetch team data");
          });

        teams.push(team);
      });

      return teams;
    },
    []
  );

  useEffect(() => {
    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      getLeagueById(id)
        .then((res) => {
          let data = res.data();
          const teamIds = data.participatingTeams;
          fetchTeamsByIds(teamIds).then((teams) => {
            data.addedTeams = teams;
          });
          leagueDispatch({ type: "setLeagueData", value: data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchParams]);

  

  const handleSaveButton = useCallback( async () => {

    const leagueData = await leagueState.editorInstance.save().then( data => {
      return data;
    })

    const data = {
      title: leagueState.title,
      venue: leagueState.venue,
      timeFrom: leagueState.timeFrom,
      timeTo: leagueState.timeTo,
      dateSchedule: leagueState.dateSchedule,
      startDate: leagueState.startDate,
      leagueImage: leagueState.leagueImage,
      participatingTeams: leagueState.addedTeams.map((team) => team.id),
      leagueData,
    };

    console.log(data)

    if (searchParams.has("id")) {
      updateLeague(searchParams.get("id"), data)
        .then(() => {
          alert("League updated successfully");
          router.push("/admin/dashboard/leagues");
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    // Verify if all required fields are filled
    if (
      data.title === "" ||
      // data.venue === "" ||
      // data.timeFrom === "" ||
      // data.timeTo === "" ||
      // data.dateSchedule.length === 0 ||
      // data.participatingTeams.length === 0 ||
      // Object.keys(data.leagueData).length === 0 ||
      data.startDate === ""
    ) {
      alert("Please fill out all required fields");
      return;
    } else {
      createLeague(data)
        .then(() => {
          alert("League created successfully");
          router.push("/admin/dashboard/leagues");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [leagueState, router, searchParams]);

  const handleCancelButton = useCallback(() => {
    router.push("/admin/dashboard/leagues");
  }, [router]);

  const handleLeagueDataChange = useCallback((data) => {
    leagueDispatch({ type: "leagueData", value: data });
  }, []);

  const handleSearchTeams = useCallback(
    (e) => {
      e.preventDefault();
      const teams = getTeamByName(leagueState.searchValue)
        .then((res) => {
          const data = res.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          leagueDispatch({ type: "searchResult", value: data });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [leagueState.searchValue]
  );

  const handleAddTeam = useCallback(
    (team) => {
      const isAdded = leagueState.addedTeams.some(
        (addedTeam) => addedTeam.id === team.id
      );

      if (!isAdded) {
        leagueDispatch({
          type: "addedTeams",
          value: [...leagueState.addedTeams, team],
        });
        const updatedSearchResult = leagueState.searchResult.filter(
          (searchedTeam) => searchedTeam.id !== team.id
        );
        leagueDispatch({ type: "searchResult", value: updatedSearchResult });
      }
    },
    [leagueState.addedTeams, leagueState.searchResult]
  );

  const handleRemoveTeam = useCallback(
    (team) => {
      const updatedTeams = leagueState.addedTeams.filter(
        (addedTeam) => addedTeam.id !== team.id
      );
      leagueDispatch({ type: "addedTeams", value: updatedTeams });
    },
    [leagueState.addedTeams]
  );

  return (
    <div>
      <form action="#" method="post">
        <h1 className="py-4 text-xl md:text-2xl">New League</h1>
        <div className="gap-2 space-y-2 columns-1 md:columns-2">
          <Input
            label="League Title"
            required
            onValueChange={(value) => leagueDispatch({ type: "title", value })}
            value={leagueState.title}
          />
          <Input
            label="Venue"
            required
            onValueChange={(value) => leagueDispatch({ type: "venue", value })}
            value={leagueState.venue}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              leagueDispatch({ type: "leagueImage", value: file });
            }}
          />
          <div className="w-full break-inside-avoid">
            <div className="flex items-center justify-center gap-2">
              <span>From</span>
              <Input
                placeholder="From"
                type="time"
                required
                onValueChange={(value) =>
                  leagueDispatch({ type: "timeFrom", value })
                }
                value={leagueState.timeFrom}
              />
              <span>To</span>
              <Input
                placeholder="To"
                type="time"
                required
                onValueChange={(value) =>
                  leagueDispatch({ type: "timeTo", value })
                }
                value={leagueState.timeTo}
              />
            </div>
          </div>
          <CheckboxGroup
            label="Schedule Days"
            orientation="horizontal"
            value={leagueState.dateSchedule}
            onValueChange={(value) => {
              leagueDispatch({ type: "dateSchedule", value });
            }}
          >
            {days.map((day, index) => (
              <Checkbox
                value={day}
                key={index}
                isSelected={leagueState.dateSchedule.includes(day)}
              >
                {day}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <div>
            <Input
              label="Starting Date"
              type="date"
              value={leagueState.startDate}
              onValueChange={(value) =>
                leagueDispatch({ type: "startDate", value })
              }
            />
          </div>
        </div>
        <div>
          <h2 className="mt-4 mb-2 text-xl font-bold">League Details</h2>
          <ScrollShadow
            hideScrollBar
            className="min-h-[50px] max-h-[400px] overflow-y-scroll"
          >
            <Editor
              defaultData={leagueState.leagueData}
              editorInstance={leagueState.editorInstance}
              setEditorInstance={(editor) => {
                leagueDispatch({ type: "editorInstance", value: editor });
              }}
            />
          </ScrollShadow>
        </div>
      </form>
      <h2 className="mt-4 mb-2 text-xl font-bold">Participating Teams</h2>
      <div className=" columns-1 md:columns-2">
        <div className="flex flex-col space-y-2 break-inside-avoid ">
          <h3>Search Teams</h3>
          <form className="flex items-center justify-center gap-2 break-inside-avoid">
            <Input
              type="text"
              label="Search Teams"
              onValueChange={(value) => {
                leagueDispatch({ type: "searchValue", value });
              }}
            />
            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="sm"
              isIconOnly
              onClick={handleSearchTeams}
            >
              <SearchIcon />
            </Button>
          </form>
          <div id="search-results-container" className="">
            {/* Search Result */}
            <ScrollShadow
              hideScrollBar
              className="min-h-[50px] max-h-[300px] overflow-y-scroll"
            >
              <ul className="space-y-1">
                {leagueState.searchResult.length === 0 ? (
                  <p className="px-3 py-2 text-center text-danger">
                    No Data Found
                  </p>
                ) : (
                  leagueState.searchResult.map((team, index) => {
                    return (
                      <li
                        key={team.id}
                        className="flex items-center justify-between px-3 py-2 border-2 rounded-md border-neutral-400/50 hover:border-neutral-400 "
                      >
                        <div className="flex items-center justify-start gap-2">
                          <Avatar
                            src={team.teamLogo}
                            name={team.teamName}
                            showFallback
                          />
                          <div>
                            <h3 className="font-bold">
                              <span className="text-sm font-normal">
                                {team.teamAbbr}
                              </span>{" "}
                              {` ${team.teamName}`}
                            </h3>
                            <p className="text-xs">{`${team.wins} - ${team.loses}`}</p>
                          </div>
                        </div>
                        <Button
                          variant="light"
                          color="secondary"
                          size="sm"
                          isIconOnly
                          onClick={() => {
                            handleAddTeam(team);
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </li>
                    );
                  })
                )}
              </ul>
            </ScrollShadow>
          </div>
        </div>
        <div>
          <h3>Added Teams</h3>
          {leagueState.addedTeams.length === 0 ? (
            <p className="px-3 py-2 text-center text-danger">No Teams Added</p>
          ) : (
            <ScrollShadow
              hideScrollBar
              className="min-h-[50px] max-h-[400px] overflow-y-scroll"
            >
              <ul className="space-y-1">
                {leagueState.addedTeams.map((team, index) => {
                  return (
                    <li
                      key={team.id}
                      className="flex items-center justify-between px-3 py-2 border-2 rounded-md border-neutral-400/50 hover:border-neutral-400 "
                    >
                      <div className="flex items-center justify-start gap-2">
                        <Avatar
                          src={team.teamLogo}
                          name={team.teamName}
                          showFallback
                        />
                        <div>
                          <h3 className="font-bold">
                            <span className="text-sm font-normal">
                              {team.teamAbbr}
                            </span>{" "}
                            {` ${team.teamName}`}
                          </h3>
                          <p className="text-xs">{`${team.wins} - ${team.loses}`}</p>
                        </div>
                      </div>
                      <Button
                        variant="light"
                        color="secondary"
                        size="sm"
                        isIconOnly
                        onClick={() => {
                          handleRemoveTeam(team);
                        }}
                      >
                        <XIcon />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </ScrollShadow>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <Button onClick={handleSaveButton} variant="solid" color="primary">
          Save
        </Button>
        <Button onClick={handleCancelButton} variant="light" color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
