"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import moment from "moment";

import { resetContract, setVotingPeriod } from "@/api/contract";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { useUser } from "@/hooks/use-context";
import { useToast } from "@/hooks/use-toast";


export default function AdminPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const { publicKey, admin } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!publicKey || publicKey !== admin) {
      toast({
        title: "Unauthorized Route",
        description: "The Route is secured and you cannot access it!",
        variant: "destructive",
      });
      return router.replace("/");
    }
  }, [publicKey]);

  const setVotingPeriodFunc = async () => {
    setLoading(true);
    try {
      if (!fromDate || !toDate)
        return toast({
          title: "Dates hasnt not been Set",
          description: "The Start Date or End Date has not been set",
          variant: "destructive",
        });
      const res = await setVotingPeriod(fromDate.getTime(), toDate.getTime());
      if (res._tag === "error")
        return toast({
          title: res.title,
          description: res.description,
          variant: "destructive",
        });
      toast({
        title: "Voting Period has been set Successfully",
        description: `Voting Period is set between ${moment(fromDate).format(
          "MMM DD, YYYY"
        )} and ${moment(toDate).format("MMM DD, YYYY")}`,
      });

      return router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  const resetContractFunc = async () => {
    setLoading(true);
    try {
      const res = await resetContract();
      if (res._tag === "error")
        return toast({
          title: res.title,
          description: res.description,
          variant: "destructive",
        });
      toast({
        title: "Contract Reset Complete",
        description: `Contract has been completely reset! You can start over again.`,
      });

      return router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-8 max-w-3xl flex items-center gap-6 flex-col justify-start mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center w-full">Admin Page</h2>
      <Calendar
        classNames={{
          day_range_middle: "bg-[#F73859]/15 rounded-none",
          day_range_start: "rounded-r-none",
          day_range_end: "rounded-l-none",
        }}
        initialFocus
        mode="range"
        selected={{ from: fromDate, to: toDate }}
        onSelect={(d) => {
          setFromDate(d?.from);
          setToDate(d?.to);
        }}
        numberOfMonths={2}
        className="border rounded-md border-secondary"
      />

      <div className="flex justify-center items-center flex-col w-full gap-8">
        <Button
          disabled={loading}
          onClick={setVotingPeriodFunc}
          className="mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#e62d4e] text-white transition-colors duration-200"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Set Voting Period"}
        </Button>
        <Button
          disabled={loading}
          onClick={resetContractFunc}
          className="mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#e62d4e] text-white transition-colors duration-200"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Reset Contract"}
        </Button>
      </div>
    </div>
  );
}
