import Image from "next/image";
import Link from "next/link";
import { Outfit } from "next/font/google";

import { cn } from "@/utils/cn";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="m-auto flex min-h-16 w-[85vw] flex-col items-center justify-between gap-y-4 border-t-[2px] border-t-[#f738589b] py-3 mt-5 md-lg:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Image src="/logo.png" width={28} height={28} alt="Elite-AIML-Logo" />
        <p className={cn(outfit.className, "text-center text-gray-200")}>
          Built by{" "}
          <Link
            href="https://twitter.com/sooryaa_u"
            className="underline underline-offset-2"
            target="_blank"
          >
            soorya-u
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/soorya-u/DemocraChain"
            className="underline underline-offset-2"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <p className={cn(outfit.className, "text-center text-gray-200")}>
          Check these Projects Out:
        </p>
        <Link href="https://belief.soorya-u.dev" target="_blank">
          <Image
            src="https://belief.soorya-u.dev/logo.png"
            width={28}
            height={28}
            alt="Belief-Logo"
          />
        </Link>
      </div>
    </footer>
  );
}
