"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import LeaguesDisplay from "./leaguesDisplay";
import LeaguePage from "./leaguePage";
import { Skeleton } from "@nextui-org/react";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import LeagueDisplay from "./v2/leagueDisplay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function LeaguesPage() {
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const id = params.get("id");

  if (id) {
    return <LeaguePage id={id} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LeagueDisplayLoading />}>
        <LeagueDisplay page={page} />
        {/* <LeaguesDisplay page={page} /> */}
      </Suspense>
    </QueryClientProvider>
  );
}

const LeagueDisplayLoading = () => {
  return (
    <section className="min-h-screen px-8 py-4 sm:py-8 sm:px-16">
      <div className="mb-2.5">
        <Skeleton className="h-8 rounded-full w-60 mb-2.5" />
        <div className="flex gap-2.5">
          <Skeleton className="w-full rounded-2xl sm:max-w-sm aspect-video" />
          <div className="flex flex-col gap-2">
            <Skeleton className="hidden h-4 rounded-lg sm:block w-60 " />
            <Skeleton className="hidden h-4 rounded-lg sm:block w-60 " />
            <Skeleton className="hidden h-4 rounded-lg sm:block w-60 " />
          </div>
        </div>
      </div>
      <TableSkeleton />
    </section>
  );
};
