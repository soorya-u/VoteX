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
import { CandidateDetailsButtons } from "@/components/custom/Details/Buttons";

type CandidateDetailsPageProp = {
  params: { id: string };
};

export default async function CandidateDetailsPage({
  params: { id },
}: CandidateDetailsPageProp) {
  const candidate = (await getContractData([
    ContractVariables.Candidate,
    id,
  ])) as TContractCandidate;

  const startTime = (await getContractData(
    ContractVariables.StartTime,
    "u64"
  )) as number;
  const endTime = (await getContractData(
    ContractVariables.EndTime,
    "u64"
  )) as number;

  const shouldDisplayVoteCount =
    startTime &&
    endTime &&
    moment().toDate().getTime() > startTime &&
    moment().toDate().getTime() < endTime;

  if (!candidate) return notFound();

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">
        {candidate.name}'s Profile as a Candidate
      </h1>
      <div className="flex w-full justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="flex md:flex-row flex-grow justify-center items-center w-full max-w-6xl mx-auto">
          <div className="w-full relative md:w-1/2 p-6 bg-[#00000060] backdrop-blur-sm rounded-lg flex flex-col">
            <div className="flex-grow flex flex-col justify-center gap-6 items-center w-full">
              <Badge
                className={`text-sm absolute top-3 right-2 px-3 py-1 ${
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
                className="rounded-full aspect-square"
              />
              <div className="flex justify-center flex-col items-center gap-2">
                <h2 className="text-3xl text-center font-bold text-primary">
                  {candidate.name}
                </h2>
                <h3 className="text-md text-center text-secondary/75">
                  {candidate.partyName}
                </h3>
              </div>
              <div className="flex flex-wrap w-full justify-center items-center gap-y-2 gap-x-6">
                <div className="text-secondary flex flex-col justify-center items-center">
                  <p className="font-semibold">Gender</p>
                  <p>{candidate.gender}</p>
                </div>
                {candidate.status === "Approved" && shouldDisplayVoteCount && (
                  <>
                    <Separator
                      className="bg-secondary/45 h-10 hidden xs:block"
                      orientation="vertical"
                    />
                    <div className="text-secondary flex flex-col justify-center items-center">
                      <p className="font-semibold">Vote Count</p>
                      <p>{candidate.voteCount}</p>
                    </div>
                  </>
                )}
                <Separator
                  className="bg-secondary/45 h-10 hidden xs:block"
                  orientation="vertical"
                />
                <div className="text-secondary flex flex-col justify-center items-center">
                  <p className="font-semibold">Income</p>
                  <p>&#x20B9;{candidate.currentIncome}</p>
                </div>
              </div>
              <div className="space-y-2 flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-1">
                  <Mail className="size-4" />
                  <p className="text-secondary text-lg">{candidate.email}</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MapPin className="size-4" />
                  <p className="text-secondary text-lg">{candidate.location}</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <Cake className="size-4" />
                  <p className="text-secondary text-md">
                    {moment(candidate.dateOfBirth).format("MMM DD, YYYY")}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <GraduationCap className="size-4" />
                  <p className="text-secondary text-md">
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
