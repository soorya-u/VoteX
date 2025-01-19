import { notFound } from "next/navigation";
import Image from "next/image";
import { Mail, MapPin, GraduationCap, Cake } from "lucide-react";

import { ContractVariables } from "@/constants/contract";
import { getContractData } from "@/lib/stellar";
import { TContractCandidate } from "@/types/contract";
import { PinataGateway } from "@/constants/pinata";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { CandidateDetailsButtons } from "@/components/details-button";

type CandidateDetailsPageProp = {
  params: { id: string };
};

export default async function CandidateDetailsPage({
  params: { id },
}: CandidateDetailsPageProp) {
  const candidate = await getContractData([ContractVariables.Candidate, id])
    .then((res) => res as TContractCandidate)
    .catch(() => notFound());

  const startTime = (await getContractData(
    ContractVariables.StartTime,
  )) as number;
  const endTime = (await getContractData(ContractVariables.EndTime)) as number;

  const shouldDisplayVoteCount =
    startTime &&
    endTime &&
    moment().toDate().getTime() > startTime &&
    moment().toDate().getTime() < endTime;

  return (
    <div className="w-full p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">
        {candidate.name}&apos;s Profile as a Candidate
      </h1>
      <div className="flex min-h-[calc(100vh-12rem)] w-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-6xl flex-grow items-center justify-center md:flex-row">
          <div className="relative flex w-full flex-col rounded-lg bg-[#00000060] p-6 backdrop-blur-sm md:w-1/2">
            <div className="flex w-full flex-grow flex-col items-center justify-center gap-6">
              <Badge
                className={`absolute right-2 top-3 px-3 py-1 text-sm ${
                  candidate.status === "Approved"
                    ? "bg-green-500"
                    : candidate.status === "Pending"
                      ? "bg-yellow-600"
                      : candidate.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-gray-400"
                }`}
              >
                {candidate.status}
              </Badge>
              <Image
                src={`${PinataGateway}/${candidate.profileIpfsHash}`}
                alt={`${candidate.name}'s Profile`}
                width={140}
                height={140}
                className="aspect-square rounded-full object-cover"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-center text-3xl font-bold text-primary">
                  {candidate.name}
                </h2>
                <h3 className="text-md text-center text-secondary/75">
                  {candidate.partyName}
                </h3>
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="font-semibold">Gender</p>
                  <p>{candidate.gender}</p>
                </div>
                {candidate.status === "Approved" &&
                  !!shouldDisplayVoteCount && (
                    <>
                      <Separator
                        className="hidden h-10 bg-secondary/45 xs:block"
                        orientation="vertical"
                      />
                      <div className="flex flex-col items-center justify-center text-secondary">
                        <p className="font-semibold">Vote Count</p>
                        <p>{candidate.voteCount}</p>
                      </div>
                    </>
                  )}
                <Separator
                  className="hidden h-10 bg-secondary/45 xs:block"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="font-semibold">Income</p>
                  <p>&#x20B9;{candidate.currentIncome}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <Mail className="size-4" />
                  <p className="text-lg text-secondary">{candidate.email}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="size-4" />
                  <p className="text-lg text-secondary">{candidate.location}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Cake className="size-4" />
                  <p className="text-md text-secondary">
                    {moment(candidate.dateOfBirth).format("MMM DD, YYYY")}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <GraduationCap className="size-4" />
                  <p className="text-md text-secondary">
                    {candidate.degreeDetails}
                  </p>
                </div>
              </div>
              <CandidateDetailsButtons
                candidatePublicKey={candidate.candidateAddress}
                status={candidate.status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
