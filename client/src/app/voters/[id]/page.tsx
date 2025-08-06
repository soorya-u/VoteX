import { notFound } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { Mail, MapPin } from "lucide-react";

import { getContractData } from "@/lib/stellar";

import { ContractVariables } from "@/constants/contract";
import { PinataGateway } from "@/constants/pinata";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VoterDetailButton } from "@/components/details-button";

import { TContractVoter } from "@/types/contract";
import { tryCatch } from "@/utils/error";

type VoterDetailsPageProp = {
  params: { id: string };
};

export default async function VoterDetailsPage({
  params: { id },
}: VoterDetailsPageProp) {
  const [voter, voterErr] = await tryCatch<TContractVoter>(
    getContractData([ContractVariables.Voter, id]),
  );

  if (voterErr) notFound();

  return (
    <div className="w-full p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">
        {voter.name}&apos;s Profile as a Voter
      </h1>
      <div className="flex min-h-[calc(100vh-12rem)] w-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-6xl flex-grow items-center justify-center md:flex-row">
          <div className="relative flex w-full flex-col rounded-lg bg-[#00000060] p-6 backdrop-blur-sm md:w-1/2">
            <div className="flex w-full flex-grow flex-col items-center justify-center gap-6">
              <Badge
                className={`absolute right-2 top-3 px-3 py-1 text-sm ${
                  voter.status === "Approved"
                    ? "bg-green-500"
                    : voter.status === "Pending"
                      ? "bg-yellow-600"
                      : voter.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-gray-400"
                }`}
              >
                {voter.status}
              </Badge>
              <Image
                src={`${PinataGateway}/${voter.profileIpfsHash}`}
                alt={`${voter.name}'s Profile`}
                width={140}
                height={140}
                className="aspect-square rounded-full object-cover"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-center text-3xl font-bold text-primary">
                  {voter.name}
                </h2>
                <h3 className="text-md text-center text-secondary/75">
                  {voter.occupation}
                </h3>
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="font-semibold">Gender</p>
                  <p>{voter.gender}</p>
                </div>
                <Separator
                  className="hidden h-10 bg-secondary/45 xs:block"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="font-semibold">Date of Birth</p>
                  <p>{moment(voter.dateOfBirth).format("MMM DD, YYYY")}</p>
                </div>
                <Separator
                  className="hidden h-10 bg-secondary/45 xs:block"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="font-semibold">Voter ID</p>
                  <p>{voter.voterId}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <Mail className="size-4" />
                  <p className="text-lg text-secondary">{voter.email}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="size-4" />
                  <p className="text-lg text-secondary">{voter.location}</p>
                </div>
              </div>
              <VoterDetailButton voterPublicKey={voter.voterAddress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
