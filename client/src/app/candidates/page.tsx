import UserCards from "@/components/custom/Cards";
import { ContractVariables } from "@/constants/contract";
import { PinataGateway } from "@/constants/pinata";
import { getContractData } from "@/lib/stellar";
import { TContractCandidate } from "@/types/contract";

type User = {
  name: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Transgender";
  image: string;
  status: "NotVer" | "Pending" | "Approved" | "Rejected";
  address: string;
};

export default async function CandidatesPage() {
  const candidatesAddress = await getContractData(ContractVariables.Candidates)
    .then((res) => Array.from(new Set(res)) as string[])
    .catch(() => [] as string[]);

  const candidateFields: Promise<User>[] = candidatesAddress.map(
    async (candidate) => {
      const c = (await getContractData([
        ContractVariables.Candidate,
        candidate,
      ])) as TContractCandidate;

      return {
        address: c.candidateAddress,
        dateOfBirth: new Date(c.dateOfBirth),
        gender: c.gender,
        image: `${PinataGateway}/${c.profileIpfsHash}`,
        name: c.name,
        status: c.status,
      };
    },
  );

  const candidates = await Promise.all(candidateFields);

  return (
    <div className="min-h-screen p-8">
      <UserCards userType="Candidates" users={candidates} />
    </div>
  );
}
