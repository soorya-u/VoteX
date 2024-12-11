import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useQueries,
  useMutation,
  type UseQueryOptions,
} from "@tanstack/react-query";
import moment from "moment";
import { type DateRange } from "react-day-picker";

import { useUser } from "./use-context";
import { useToast } from "./use-toast";
import { resetContract, setVotingPeriod } from "@/api/contract";
import { getContractData } from "@/lib/stellar";
import { ContractVariables } from "@/constants/contract";

type TQueries = UseQueryOptions<number>[];

export const useAdmin = () => {
  const [
    { data: startTime, isPending: isStartTimePending },
    { data: endTime, isPending: isEndTimePending },
  ] = useQueries<TQueries>({
    queries: [
      {
        queryKey: ["start-date"],
        queryFn: async () => await getContractData(ContractVariables.StartTime),
      },
      {
        queryKey: ["end-date"],
        queryFn: async () => await getContractData(ContractVariables.EndTime),
      },
    ],
  });

  const [fromDate, setFromDate] = useState(
    !!startTime ? new Date(startTime) : undefined
  );
  const [toDate, setToDate] = useState(
    !!endTime ? new Date(endTime) : undefined
  );

  const setDates = (d: DateRange | undefined) => {
    setFromDate(d?.from);
    setToDate(d?.to);
  };

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
  }, [publicKey, toast, router, admin]);

  const setVotingPeriodMutateFunc = async () => {
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
  };

  const resetContractMutateFunc = async () => {
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
  };

  const {
    mutateAsync: setVotingPeriodFunc,
    isPending: isSetVotingPeriodLoading,
  } = useMutation({
    mutationFn: setVotingPeriodMutateFunc,
  });
  const { mutateAsync: resetContractFunc, isPending: isResetContractLoading } =
    useMutation({
      mutationFn: resetContractMutateFunc,
    });

  return {
    isFetching: isEndTimePending && isStartTimePending,
    setDates,
    fromDate,
    toDate,
    setVotingPeriod: async () => await setVotingPeriodFunc(),
    resetContract: async () => resetContractFunc(),
    isSetVotingPeriodLoading,
    isResetContractLoading,
    startTime,
    endTime,
  };
};
