import { Outfit, Sarpanch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getContractData } from "@/lib/stellar";

import { cn } from "@/utils/cn";
import { ContractVariables } from "@/constants/contract";
import moment from "moment";
import Footer from "@/components/custom/Footer";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });
const sarpanch = Sarpanch({ weight: "500", subsets: ["latin"] });

export default async function HomePage() {
  const startTime = (await getContractData(
    ContractVariables.StartTime
  )) as number;
  const endTime = (await getContractData(ContractVariables.EndTime)) as number;

  return (
    <>
      <section className="flex flex-1 max-w-full flex-col flex-wrap items-center justify-center gap-6">
        <Image
          priority
          src="/logo.png"
          alt="logo"
          height={7 * 16}
          width={7 * 16}
        />
        <h1
          className={cn(
            "w-full px-3 text-wrap text-center text-5xl text-white 2xs:text-6xl 2xs:px-12",
            sarpanch.className
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
          Take a panoramic dive into your academic progress by effortlessly
          reviewing, analyzing and tracking every mark and grade earned
          throughout each semester.
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
                <p>Voting Period has been started</p>
                <p>
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
                  <p>The Voting has been Completed.</p>
                  <p>
                    Click{" "}
                    <Link
                      className="underline hover:text-primary/60 transition-colors duration-300"
                      href=""
                    >
                      here
                    </Link>{" "}
                    to see the Winning Candidate
                  </p>
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
              <Link href="https://github.com/soorya-u/DemocraChain">
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
