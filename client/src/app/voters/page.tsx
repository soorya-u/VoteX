import UserCards from "@/components/cards";
import { ContractVariables } from "@/constants/contract";
import { PinataGateway } from "@/constants/pinata";
import { getContractData } from "@/lib/stellar";
import { TContractVoter } from "@/types/contract";

type User = {
  name: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Transgender";
  image: string;
  status: "NotVer" | "Pending" | "Approved" | "Rejected";
  address: string;
};

export default async function VotersPage() {
  const votersAddress = await getContractData(ContractVariables.Voters)
    .then((res) => Array.from(new Set(res)) as string[])
    .catch(() => [] as string[]);

  const voterFields: Promise<User>[] = votersAddress.map(async (voter) => {
    const v = (await getContractData([
      ContractVariables.Voter,
      voter,
    ])) as TContractVoter;

    return {
      address: v.voterAddress,
      dateOfBirth: new Date(v.dateOfBirth),
      gender: v.gender,
      image: `${PinataGateway}/${v.profileIpfsHash}`,
      name: v.name,
      status: v.status,
    };
  });

  const voters = await Promise.all(voterFields);

  return (
    <div className="min-h-screen p-8">
      <UserCards userType="Voters" users={voters} />
    </div>
  );
}
