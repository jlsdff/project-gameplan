"use client";
import React, { useReducer, useCallback, useMemo } from "react";
import {
  Input,
  Tooltip,
  CheckboxGroup,
  Checkbox,
  Button,
} from "@nextui-org/react";
import AddIcon from "@/assets/addIcon";

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
    dateSchedule: [],
  });

  const days = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  const handleSaveButton = useCallback(() => {
    // TODO: Save League
    // TODO: handle Dependencies
  });

  const handleCancelButton = useCallback(() => {
    // TODO: Cancel League
    // TODO: handle Dependencies
  });

  return (
    <div>
      <h1 className="py-4 text-xl md:text-2xl">New League</h1>
      <form action="#" method="post">
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
        <div className="columns-1 md:flex">
          <div className="min-h-[200px] w-full md:w-1/3 flex flex-col space-y-2 p-4 break-inside-avoid">
            <h3>
              <Input size="sm" placeholder="Info Title" />
            </h3>
            <ul>
              <li>
                <Input size="sm" />
              </li>
            </ul>
            <Button>
              <AddIcon />
            </Button>
          </div>
          <div className="p-4 min-h-[200px] w-full md:w-1/3">
            <Tooltip content="Add League Info">
              <Button className="w-full h-full">
                <AddIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </form>
    </div>
  );
}
