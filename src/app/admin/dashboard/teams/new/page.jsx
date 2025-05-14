import NewTeam from "@/components/admin/teams/new/newTeam";

export const metadata = {
  title: "New Team",
};

export default async function NewTeamPage(props) {
  const params = await props.params;
  return (
    <div>
      <NewTeam {...params} />
    </div>
  );
}
