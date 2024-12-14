"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueries,
  type UseQueryOptions,
} from "@tanstack/react-query";
import Webcam from "react-webcam";
import { Loader2, SendHorizonal } from "lucide-react";

import { callContract, getContractData } from "@/lib/stellar";

import { ContractFunctions, ContractVariables } from "@/constants/contract";

import { useUser } from "@/hooks/use-context";
import { toast, useToast } from "@/hooks/use-toast";
import { usePayment } from "@/hooks/use-payment";

import { approveCandidate, rejectCandidate } from "@/api/contract";
import { compareFace } from "@/api/face";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { bas64ToImage } from "@/utils/base64-image";
import moment from "moment";

type TQueries = UseQueryOptions<number>[];

export function CandidateDetailsButtons({
  status,
  candidatePublicKey,
}: {
  status: string;
  candidatePublicKey: string;
}) {
  const { admin, publicKey, userAsVoter } = useUser();
  const router = useRouter();

  const [{ data: startTime }, { data: endTime }] = useQueries<TQueries>({
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

  const isVotingPeriod =
    !!startTime &&
    !!endTime &&
    moment().toDate().getTime() > startTime &&
    moment().toDate().getTime() < endTime;

  const approveCandidateMutateFunc = async () => {
    const res = await approveCandidate(candidatePublicKey);
    if (res._tag === "error")
      return toast({
        title: res.title,
        description: res.description,
        variant: "destructive",
      });

    toast({
      title: "Candidate has been Approved",
      description: "Candidate has been Approved and can now recieve Votes",
    });

    return router.replace("/candidates");
  };

  const rejectCandidateMutateFunc = async () => {
    const res = await rejectCandidate(candidatePublicKey);
    if (res._tag === "error")
      return toast({
        title: res.title,
        description: res.description,
        variant: "destructive",
      });

    toast({
      title: "Candidate has been Rejected",
      description:
        "Candidate has been Rejected and cannot participate in Election",
    });

    return router.replace("/candidates");
  };

  const { mutateAsync: approveCandidateFn, isPending: isApprovalPending } =
    useMutation({ mutationFn: approveCandidateMutateFunc });

  const { mutateAsync: rejectCandidateFn, isPending: isRejectionPending } =
    useMutation({ mutationFn: rejectCandidateMutateFunc });

  if (!publicKey) return;

  return (
    <div className="flex flex-col justify-center item-center gap-4 pb-8">
      {admin === publicKey && status === "Pending" && (
        <div className="flex justify-center items-center gap-4">
          <Button
            disabled={isApprovalPending || isRejectionPending}
            onClick={() => approveCandidateFn()}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {isApprovalPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Approve"
            )}
          </Button>
          <Button
            disabled={isApprovalPending || isRejectionPending}
            onClick={() => rejectCandidateFn()}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isRejectionPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Reject"
            )}
          </Button>
        </div>
      )}

      {status === "Approved" &&
        userAsVoter &&
        userAsVoter.status === "Approved" &&
        isVotingPeriod &&
        !userAsVoter.hasVoted && (
          <Dialog>
            <DialogTrigger>
              <Button className="bg-primary hover:bg-[#129992] text-white">
                Vote Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <WebCamModalContent candidatePublicKey={candidatePublicKey} />
            </DialogContent>
          </Dialog>
        )}

      {candidatePublicKey === publicKey ? (
        <Link
          className="bg-primary text-secondary text-sm px-4 py-2 rounded-md"
          href="/update/candidate"
        >
          Update your Profile
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-primary hover:bg-[#129992] text-white">
              Donate to Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <PaymentModal candidatePublicKey={candidatePublicKey} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const PaymentModal = ({
  candidatePublicKey,
}: {
  candidatePublicKey: string;
}) => {
  const { register, errors, handleSubmit, isSubmitting } =
    usePayment(candidatePublicKey);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Donate to Candidate</DialogTitle>
        <DialogDescription>
          Send Payments to Candidates Anonymously.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="amount" className="sr-only">
            Amount
          </Label>
          <Input
            type="number"
            placeholder="Enter Amount in XLM"
            className="border-primary"
            id="amount"
            {...register("amount")}
          />
          {errors && errors.amount && (
            <span className="text-red-500 text-xs">
              {errors.amount.message}
            </span>
          )}
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          size="sm"
          className="aspect-square rounded-full"
        >
          <span className="sr-only">Pay</span>
          {isSubmitting ? <Loader2 /> : <SendHorizonal />}
        </Button>
      </form>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button
            className="bg-primary hover:bg-primary/75"
            type="button"
            variant="secondary"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export function VoterDetailButton({
  voterPublicKey,
}: {
  voterPublicKey: string;
}) {
  const { publicKey } = useUser();

  if (voterPublicKey !== publicKey) return;

  return (
    <Link
      className="bg-primary text-secondary px-4 py-2 rounded-md"
      href="/update/voter"
    >
      Update your Profile
    </Link>
  );
}

const WebCamModalContent = ({
  candidatePublicKey,
}: {
  candidatePublicKey: string;
}) => {
  const webCamRef = useRef<Webcam>(null);

  const [isCapturedState, setIsCapturedState] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const { publicKey } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current && webCamRef.current.getScreenshot()!;
    if (!imageSource) return;
    setImageSrc(imageSource);
    setIsCapturedState(true);
  }, [webCamRef]);

  const reCapture = () => {
    setImageSrc("");
    setIsCapturedState(false);
  };

  const mutationFn = async () => {
    try {
      if (!imageSrc)
        return toast({
          title: "Invalid Image",
          description: "Image might not have been Captured",
          variant: "destructive",
        });

      const file = bas64ToImage(imageSrc);

      const formData = new FormData();
      formData.append("file", file);

      const res = await compareFace(formData, publicKey);

      if (res._tag === "error")
        return toast({
          title: res.title,
          description: res.description,
          variant: "destructive",
        });

      await callContract(
        ContractFunctions.GiveVote,
        [candidatePublicKey, publicKey],
        publicKey
      )
        .then(() => {
          toast({
            title: "You Vote has been casted Successfully!",
            description:
              "Your Voter has been casted Successfully to your Desired Candidate",
          });
        })
        .catch(() => {
          toast({
            title: "Something went Wrong!",
            description: "Failed to Invoke ",
          });
        });
      router.replace("/");
    } catch {
      return toast({
        title: "Something went Wrong!",
        description: "Something went wrong while capturing Image",
        variant: "destructive",
      });
    }
  };

  const { mutateAsync, isPending: loading } = useMutation({ mutationFn });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          Verify your Face Verification
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-center items-center flex-col gap-2">
        {imageSrc ? (
          <img src={imageSrc} />
        ) : (
          <Webcam
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "user" }}
            screenshotQuality={1}
            ref={webCamRef}
            className="rounded-md"
          />
        )}
      </div>
      <DialogFooter className="sm:justify-center">
        {!isCapturedState ? (
          <Button disabled={loading} onClick={capture}>
            Capture
          </Button>
        ) : (
          <>
            <Button disabled={loading} onClick={reCapture}>
              Recapture
            </Button>
            <Button
              disabled={loading}
              onClick={async () => await mutateAsync()}
              className="min-w-32"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  );
};
