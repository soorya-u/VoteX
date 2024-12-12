import { Outfit, El_Messiri } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { Button } from "@/components/ui/button";

import { getContractData } from "@/lib/stellar";

import { cn } from "@/utils/cn";
import { ContractVariables } from "@/constants/contract";
import Footer from "@/components/custom/Footer";
import { TContractCandidate } from "@/types/contract";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });
const elMessiri = El_Messiri({ weight: "600", subsets: ["arabic"] });

export default async function HomePage() {
  const startTime = (await getContractData(
    ContractVariables.StartTime
  )) as number;
  const endTime = (await getContractData(ContractVariables.EndTime)) as number;

  const candidatesAddress = await getContractData(ContractVariables.Candidates)
    .then((res) => res as string[])
    .catch(() => [] as string[]);

  const candidatesPromise = candidatesAddress.map(async (address) => {
    const c = (await getContractData([
      ContractVariables.Candidate,
      address,
    ])) as TContractCandidate;

    return {
      address: c.candidateAddress,
      voteCount: c.voteCount,
    };
  });

  const candidates = await Promise.all(candidatesPromise);

  const winningCandidate =
    candidates.length > 0
      ? candidates.reduce(
          (max, curr) => (curr.voteCount > max.voteCount ? curr : max),
          candidates[0]
        )
      : undefined;

  return (
    <>
      <section className="flex flex-1 max-w-full flex-col flex-wrap items-center mt-6 justify-center gap-6">
        <Image
          priority
          src="/logo.png"
          alt="logo"
          height={7 * 16}
          width={7 * 16}
        />
        <h1
          className={cn(
            "w-full px-3 text-wrap text-center text-5xl text-secondary 2xs:text-6xl 2xs:px-12",
            elMessiri.className
          )}
        >
          Tamper-Proof Elections for a Brighter Democracy{" "}
        </h1>
        <h2
          className={cn(
            outfit.className,
            "w-2/3 text-center text-xl text-[#ccccd2]"
          )}
        >
          Embark on a seamless journey of secure and transparent voting by
          harnessing the power of Stellar blockchain technology and AI-driven
          models for flawless authentication and tamper-proof results.
        </h2>
        {startTime && endTime ? (
          <div>
            {moment(startTime) > moment() ? (
              <p className="text-center">
                Voting Period will start from{" "}
                {moment(startTime).format("MMM DD, YYYY")} and end at{" "}
                {moment(endTime).format("MMM DD, YYYY")}
              </p>
            ) : moment() > moment(startTime) && moment() < moment(endTime) ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-center">Voting Period has been started</p>
                <p className="text-center">
                  <Link
                    href="/candidates"
                    className="underline hover:text-primary transition-all"
                  >
                    Cast you vote
                  </Link>{" "}
                  with no worries of Privacy and Security
                </p>
              </div>
            ) : (
              moment() > moment(endTime) && (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg text-center">
                    The Voting has been Completed.
                  </p>
                  {winningCandidate && (
                    <p className="text-lg text-center">
                      Click{" "}
                      <Link
                        className="underline hover:text-primary transition-colors duration-300"
                        href={`/candidates/${winningCandidate.address}`}
                      >
                        here
                      </Link>{" "}
                      to see the Winning Candidate
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <Button
              className="text-md hover:-translate-x-1 hover:-translate-y-1 transition-all"
              variant="outline"
            >
              <Link href="/candidates">Check out Candidates</Link>
            </Button>
            <Button
              className="text-md hover:translate-x-1 hover:-translate-y-1 transition-all"
              variant="outline"
            >
              <Link href="https://github.com/soorya-u/VoteX">
                View Source Code
              </Link>
            </Button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
