"use client";
import React, { useReducer, useCallback, useMemo } from "react";
import {
  Input,
  Tooltip,
  CheckboxGroup,
  Checkbox,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import AddIcon from "@/assets/addIcon";
import Editor from "@/components/ui/editorJs/editorJs";
import SearchIcon from "@/assets/searchIcon";

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
    case "leagueImage":
      return { ...state, leagueImage: action.value };
    default:
      return state;
  }
};

export default function NewLeague() {
  const [leagueState, leagueDispatch] = useReducer(reducer, {
    title: "",
    venue: "",
    timeFrom: "",
    timeTo: "",
    leagueImage: null,
    dateSchedule: [],
    leagueData: [],
  });

  const days = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  const handleSaveButton = useCallback(() => {
    // TODO: Save League
    // TODO: handle Dependencies
    console.log("Saving League State", leagueState);
  });

  const handleCancelButton = useCallback(() => {
    // TODO: Cancel League
    // TODO: handle Dependencies
    console.log("Cancelling League State", leagueState);
  });

  const handleLeagueDataChange = useCallback((data) => {
    leagueDispatch({ type: "leagueData", value: data });
  }, []);
  return (
    <div>
      <form action="#" method="post">
        <div className="items-center justify-between block md:flex">
          <h1 className="py-4 text-xl md:text-2xl">New League</h1>
          <div className="items-center justify-center hidden gap-2 md:flex">
            <Button onClick={handleSaveButton} variant="solid" color="primary">
              Save
            </Button>
            <Button
              onClick={handleCancelButton}
              variant="light"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="gap-2 space-y-2 columns-1 md:columns-2">
          <Input
            label="League Title"
            required
            onValueChange={(value) => leagueDispatch({ type: "title", value })}
          />
          <Input
            label="Venue"
            required
            onValueChange={(value) => leagueDispatch({ type: "venue", value })}
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
              />
              <span>To</span>
              <Input
                placeholder="To"
                type="time"
                required
                onValueChange={(value) =>
                  leagueDispatch({ type: "timeTo", value })
                }
              />
            </div>
          </div>
          <CheckboxGroup
            label="Schedule Days"
            orientation="horizontal"
            value={leagueState.dateSchedule}
            onValueChange={(value) => {
              console.log(value);
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
        </div>
        <div>
          <h2>League Details</h2>
          <ScrollShadow
            hideScrollBar
            className="min-h-[50px] max-h-[400px] overflow-y-scroll"
          >
            <Editor onChange={handleLeagueDataChange} />
          </ScrollShadow>
        </div>
      </form>
      <div className="my-4 columns-1 md:columns-2">
        <form className="flex items-center justify-center gap-2 break-inside-avoid">
          <Input
            type="text"
            label="Search Teams"
            onValueChange={(value) => {
              console.log(value); // TODO: Search Teams
            }}
          />
          <Button type="submit" variant="solid" color="primary" size="sm" isIconOnly>
            <SearchIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}
