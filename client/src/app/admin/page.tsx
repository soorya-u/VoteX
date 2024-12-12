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
    <div className="w-full mt-8 max-w-3xl flex items-center gap-6 flex-col justify-start mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center w-full">Admin Page</h2>
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
        className="border rounded-md border-secondary"
      />

      <div className="flex justify-center items-center flex-col w-full gap-8">
        <Button
          disabled={
            isFetching && isResetContractLoading && isSetVotingPeriodLoading
          }
          onClick={setVotingPeriod}
          className="min-w-32 flex-1 mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#129992] text-white transition-colors duration-200 disabled:opacity-50"
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
          className="min-w-32 mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#129992] text-white transition-colors duration-200 disabled:opacity-50"
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
