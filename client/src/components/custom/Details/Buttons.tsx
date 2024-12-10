"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { Loader2, SendHorizonal } from "lucide-react";

import { callContract } from "@/lib/stellar";

import { ContractFunctions } from "@/constants/contract";

import { useUser } from "@/hooks/use-context";
import { toast, useToast } from "@/hooks/use-toast";

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

import { bas64ToImage } from "@/utils/base64-image";
import { Input } from "@/components/ui/input";
import { usePayment } from "@/hooks/use-payment";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";

export function CandidateDetailsButtons({
  status,
  candidatePublicKey,
}: {
  status: string;
  candidatePublicKey: string;
}) {
  const { admin, publicKey } = useUser();
  const router = useRouter();
  if (!publicKey) return;

  const approveCandidateMutateFunc = async () => {
    const res = await approveCandidate(publicKey);
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

  const approveCandidateFailure = (err: any) => {
    console.log("Couldn't approve Candidate: ", err);
    return toast({
      title: "Candidate Approval Unsuccessfull",
      description: "Failed to approve Candidate! Try again Later",
    });
  };

  const rejectCandidateMutateFunc = async () => {
    const res = await rejectCandidate(publicKey);
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

  const rejectCandidateFailure = (err: any) => {
    console.log("Couldn't reject Candidate: ", err);
    return toast({
      title: "Candidate Rejection Unsuccessfull",
      description: "Failed to reject Candidate! Try again Later",
    });
  };

  const { mutateAsync: approveCandidateFn, isPending: isApprovalPending } =
    useMutation({
      mutationFn: approveCandidateMutateFunc,
      onError: approveCandidateFailure,
    });

  const { mutateAsync: rejectCandidateFn, isPending: isRejectionPending } =
    useMutation({
      mutationFn: rejectCandidateMutateFunc,
      onError: rejectCandidateFailure,
    });

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

      {status === "Approved" && (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-primary hover:bg-[#e62d4e] text-white">
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
          className="bg-primary text-secondary px-4 py-2 rounded-md"
          href="/update/voter"
        >
          Update your Profile
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-primary hover:bg-[#e62d4e] text-white">
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
          <Input id="amount" {...register("amount")} />
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
          className="px-3 rounded-full"
        >
          <span className="sr-only">Pay</span>
          <SendHorizonal />
        </Button>
      </form>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
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

  console.log({ publicKey });

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
  const [loading, setLoading] = useState(false);

  const { publicKey } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current?.getScreenshot()!;
    setImageSrc(imageSource);
    setIsCapturedState(true);
  }, [webCamRef]);

  const reCapture = () => {
    setImageSrc("");
    setIsCapturedState(false);
  };

  const submitFunc = async () => {
    try {
      setLoading(true);
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
    } catch (err) {
      return toast({
        title: "Something went Wrong!",
        description: "Something went wrong while capturing Image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? <Loader2 className="animate-spin" /> : "Capture"}
          </Button>
        ) : (
          <>
            <Button disabled={loading} onClick={reCapture}>
              {loading ? <Loader2 className="animate-spin" /> : "Recapture"}
            </Button>
            <Button disabled={loading} onClick={submitFunc}>
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  );
};
