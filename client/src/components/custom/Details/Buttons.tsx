"use client";

import { Button } from "@/components/ui/button";
import { useContract } from "@/hooks/use-context";
import Link from "next/link";

export function CandidateDetailsButtons({
  status,
  candidatePublicKey,
}: {
  status: string;
  candidatePublicKey: string;
}) {
  const { admin, publicKey } = useContract();

  if (!publicKey) return;

  return (
    <div className="flex flex-col justify-center item-center gap-4 pb-8">
      {admin === publicKey && status === "Pending" && (
        <div className="flex justify-center items-center gap-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Approve
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Reject
          </Button>
        </div>
      )}

      {status === "Approved" && (
        <Button
          className="bg-primary hover:bg-[#e62d4e] text-white"
          disabled={status !== "Approved"}
        >
          Vote Candidate
        </Button>
      )}

      {candidatePublicKey === publicKey && (
        <Link
          className="bg-primary text-secondary px-4 py-2 rounded-md"
          href="/update/voter"
        >
          Update your Profile
        </Link>
      )}
    </div>
  );
}

export function VoterDetailButton({
  voterPublicKey,
}: {
  voterPublicKey: string;
}) {
  const { publicKey } = useContract();

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
