import { Outfit, Sarpanch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });
const sarpanch = Sarpanch({ weight: "500", subsets: ["latin"] });

export default function Home() {
  return (
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
        reviewing, analyzing and tracking every mark and grade earned throughout
        each semester.
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        <Button className="text-md bg-transparent" variant="outline">
          <Link href="/semester">Check out Candidates</Link>
        </Button>
        <Button className="text-md bg-transparent" variant="outline">
          <Link href="https://github.com/soorya-u/Grade-Grove">
            View Source Code
          </Link>
        </Button>
      </div>
    </section>
  );
}
