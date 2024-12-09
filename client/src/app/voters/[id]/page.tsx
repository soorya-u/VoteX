import { notFound } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { Mail, MapPin } from "lucide-react";

import { getContractData } from "@/lib/stellar";

import { ContractVariables } from "@/constants/contract";
import { PinataGateway } from "@/constants/pinata";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { TContractVoter } from "@/types/contract";
import { VoterDetailButton } from "@/components/custom/Details/Buttons";

type VoterDetailsPageProp = {
  params: { id: string };
};

export default async function VoterDetailsPage({
  params: { id },
}: VoterDetailsPageProp) {
  const voter = (await getContractData([
    ContractVariables.Voter,
    id,
  ])) as TContractVoter;

  if (!voter) return notFound();

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">
        {voter.name}'s Profile as a Voter
      </h1>
      <div className="flex w-full justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="flex md:flex-row flex-grow justify-center items-center w-full max-w-6xl mx-auto">
          <div className="w-full relative md:w-1/2 p-6 bg-[#00000060] backdrop-blur-sm rounded-lg flex flex-col">
            <div className="flex-grow flex flex-col justify-center gap-6 items-center w-full">
              <Badge
                className={`text-sm absolute top-3 right-2 px-3 py-1 ${
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
                className="rounded-full"
              />
              <div className="flex justify-center flex-col items-center gap-2">
                <h2 className="text-3xl text-center font-bold text-primary">
                  {voter.name}
                </h2>
                <h3 className="text-md text-center text-secondary/75">
                  {voter.occupation}
                </h3>
              </div>
              <div className="flex flex-wrap w-full justify-center items-center gap-y-2 gap-x-6">
                <div className="text-secondary flex flex-col justify-center items-center">
                  <p className="font-semibold">Gender</p>
                  <p>{voter.gender}</p>
                </div>
                <Separator
                  className="bg-secondary/45 h-10 hidden xs:block"
                  orientation="vertical"
                />
                <div className="text-secondary flex flex-col justify-center items-center">
                  <p className="font-semibold">Date of Birth</p>
                  <p>{moment(voter.dateOfBirth).format("MMM DD, YYYY")}</p>
                </div>
                <Separator
                  className="bg-secondary/45 h-10 hidden xs:block"
                  orientation="vertical"
                />
                <div className="text-secondary flex flex-col justify-center items-center">
                  <p className="font-semibold">Voter ID</p>
                  <p>{voter.voterId}</p>
                </div>
              </div>
              <div className="space-y-2 flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-1">
                  <Mail className="size-4" />
                  <p className="text-secondary text-lg">{voter.email}</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MapPin className="size-4" />
                  <p className="text-secondary text-lg">{voter.location}</p>
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
