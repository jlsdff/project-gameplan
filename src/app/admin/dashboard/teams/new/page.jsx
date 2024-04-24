import NewTeam from "@/components/admin/teams/new/newTeam";

export const metadata = {
  title: "New Team",
};

export default function NewTeamPage({params}) {
  return (
    <div>
      <NewTeam {...params} />
    </div>
  );
}
