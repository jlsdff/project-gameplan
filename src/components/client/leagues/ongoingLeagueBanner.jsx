import { Image, Link, Spinner } from "@heroui/react";

export default function OngoingLeagueBanner({ ongoingLeagues }) {
  return (
    <>
      {ongoingLeagues.map((league) => {
        return (
          <>
            <Link
              href={`/leagues?id=${league.id}`}
              className="flex flex-col items-start justify-start gap-3 py-2 cursor-pointer sm:flex-row hover:underline "
            >
              <div className="w-full sm:max-w-sm">
                <Image
                  src={league.leagueImage}
                  alt={league.title}
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
                <h2 className="text-3xl font-bold sm:text-2xl text-primary">
                  {league.title || ""}
                </h2>
                <div className=" text-foreground">
                  {league.venue && (
                    <h3>
                      <span className="text-lg font-semibold">Venue:</span>
                      <br />
                      <span>{league.venue}</span>
                    </h3>
                  )}
                  {league.gameSchedule && (
                    <h3>
                      <span className="text-lg font-semibold">
                        Game Schedule:
                      </span>
                      <br />
                      <span>{displayGameShedule(league)}</span>
                    </h3>
                  )}
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
}
