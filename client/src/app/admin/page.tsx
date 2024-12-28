"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { useAdmin } from "@/hooks/use-admin";

export default function AdminPage() {
  const {
    endTime,
    fromDate,
    isFetching,
    isResetContractLoading,
    isSetVotingPeriodLoading,
    resetContract,
    setDates,
    setVotingPeriod,
    startTime,
    toDate,
  } = useAdmin();

  return (
    <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col items-center justify-start gap-6 rounded-lg bg-transparent p-8 shadow-lg md:bg-[#3c3b3b7b]">
      <h2 className="w-full text-center text-3xl text-primary">Admin Page</h2>
      <Calendar
        disabled={!!startTime && !!endTime}
        classNames={{
          day_today:
            "bg-secondary text-black ring-secondary hover:text-black hover:bg-secondary hover:opacity-75 transition-all",
          day_range_middle: "bg-[#F73859]/15 rounded-none",
          day_range_start: "rounded-r-none",
          day_range_end: "rounded-l-none",
        }}
        initialFocus
        mode="range"
        selected={{ from: fromDate, to: toDate }}
        onSelect={setDates}
        numberOfMonths={2}
        className="rounded-md border border-secondary"
      />

      <div className="flex w-full flex-col items-center justify-center gap-8">
        <Button
          disabled={
            isFetching && isResetContractLoading && isSetVotingPeriodLoading
          }
          onClick={setVotingPeriod}
          className="mx-auto min-w-32 flex-1 rounded-md bg-primary px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-[#129992] disabled:opacity-50"
        >
          {isSetVotingPeriodLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Set Voting Period"
          )}
        </Button>
        <Button
          disabled={
            isFetching && isResetContractLoading && isSetVotingPeriodLoading
          }
          onClick={resetContract}
          className="mx-auto min-w-32 rounded-md bg-primary px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-[#129992] disabled:opacity-50"
        >
          {isResetContractLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Reset Contract"
          )}
        </Button>
      </div>
    </div>
  );
}
