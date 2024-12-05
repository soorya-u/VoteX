import Link from "next/link";
import { Audiowide, Kode_Mono, Outfit } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import Navigator from "./Navigator";
import Hamburger from "./Hamburger";
import ConnectButton from "./ConnectButton";

import { cn } from "@/utils/cn";

const kode = Kode_Mono({ weight: "400", subsets: ["latin"] });
const outfit = Outfit({ weight: "500", subsets: ["latin"] });

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="flex h-[10vh] items-center justify-between rounded-b-md px-4 py-2 backdrop-blur-sm sm:px-8">
        <div className="flex items-center justify-start gap-x-6 sm:gap-x-8">
          <Hamburger className="block lg:hidden" />
          <Link
            href="/"
            className={cn(
              kode.className,
              "text-nowrap text-3xl hidden sm:flex"
            )}
          >
            DemocraChain
          </Link>
          <Navigator className="hidden lg:flex" />
        </div>
        <div className="ml-8 flex">
          {true ? (
            <>
              <RegisterButtons className="hidden 2xs:flex" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className={cn(outfit.className, "text-sm flex 2xs:hidden")}
                  >
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-md mx-auto">
                  <DialogHeader>
                    <DialogDescription>
                      <RegisterButtons className="flex flex-col" />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <ConnectButton />
          )}
        </div>
      </nav>
    </header>
  );
}

const RegisterButtons = ({ className = "" }) => (
  <div className={cn("items-center justify-center gap-4", className)}>
    <Link href="/auth/signup">
      <Button
        size="xs"
        variant="outline"
        className={cn(
          outfit.className,
          "text-sm  hover:translate-x-1 hover:-translate-y-1 transition-all"
        )}
      >
        Register as Candidate
      </Button>
    </Link>
    <Link href="/auth/login">
      <Button
        size="xs"
        className={cn(
          outfit.className,
          "text-sm hover:bg-secondary hover:text-primary hover:translate-x-1 hover:-translate-y-1 transition-all"
        )}
      >
        Register as Voter
      </Button>
    </Link>
  </div>
);
