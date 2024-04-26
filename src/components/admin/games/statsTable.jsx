import {
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  Card,
  TableBody,
  TableCell,
  Input,
} from "@nextui-org/react";
import React, { useCallback, useMemo } from "react";

export default function StatsTable({ teamData, players, setData }) {

  const { teamSide } = teamData;
  
  const handleInputChange = useCallback((stats, playerId) => {
    setData({type: "STATS", payload: {playerId, stats, teamSide}})
  },[setData, teamSide])
  
  return (
    <Card className="w-full p-4 overflow-auto">
      <table className="min-w-full text-left whitespace-no-wrap table-auto">
        <thead className="border-2 border-gray-200">
          <tr>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              #
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Players
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Rebound
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Assist
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Steals
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Blocks
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Turnovers
            </th>
            <th className="px-4 py-2 border-r border-gray-200" rowSpan={2}>
              Fouls
            </th>
            <th className="px-4 py-2 border-r border-gray-200" colSpan={2}>
              2 Points
            </th>
            <th className="px-4 py-2 border-r border-gray-200" colSpan={2}>
              3 Points
            </th>
            <th className="px-4 py-2 border-r border-gray-200" colSpan={2}>
              Free Throws
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2 border-t">Made</th>
            <th className="px-4 py-2 border-t border-r border-gray-200">
              Attempted
            </th>
            <th className="px-4 py-2 border-t">Made</th>
            <th className="px-4 py-2 border-t border-r border-gray-200">
              Attempted
            </th>
            <th className="px-4 py-2 border-t ">Made</th>
            <th className="px-4 py-2 border-t border-r border-gray-200">
              Attempted
            </th>
          </tr>
        </thead>
        <tbody className="min-h-[100px]">
          {players.map((player) => (
            <tr key={player.id}>
              <td className="px-2 py-4">{player.number}</td>
              <td className="px-2 py-4">{`${player.lastname}`}</td>
              <td className="px-2 py-4" >
                <Input id="input-rebounds" type="number" onValueChange={(value)=>{ 
                  handleInputChange({rebounds: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-assist" type="number" onValueChange={(value)=> {
                  handleInputChange({assist: value}, player.id)
                }}/>
              </td>
              <td className="px-2 py-4">
                <Input id="input-steals" type="number" onValueChange={(value) => {
                  handleInputChange({steals: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-blocks" type="number" onValueChange={(value) => {
                  handleInputChange({blocks: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-turnovers" type="number" onValueChange={(value) => {
                  handleInputChange({turnovers: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-fouls" type="number" onValueChange={(value) => {
                  handleInputChange({fouls: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-2made" type="number" onValueChange={(value) => {
                  handleInputChange({twoPointsMade: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-2attempt" type="number" onValueChange={(value) => {
                  handleInputChange({twoPointsAttempted: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-3made" type="number" onValueChange={(value) => {
                  handleInputChange({threePointsMade: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-3attempt" type="number" onValueChange={(value) => {
                  handleInputChange({threePointsAttempted: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-ftmade" type="number" onValueChange={(value) => {
                  handleInputChange({freeThrowsMade: value}, player.id)
                }} />
              </td>
              <td className="px-2 py-4">
                <Input id="input-ftattempt" type="number" onValueChange={(value) => {
                  handleInputChange({freeThrowsAttempted: value}, player.id)
                }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
