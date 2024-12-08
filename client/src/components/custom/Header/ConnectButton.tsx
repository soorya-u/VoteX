"use client";

import { Outfit } from "next/font/google";
import Link from "next/link";

import { useContract } from "@/hooks/use-context";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/utils/cn";

const outfit = Outfit({ weight: "500", subsets: ["latin"] });

export default function ConnectButton() {
  const { connectWallet, publicKey } = useContract();

  return publicKey ? (
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
    <Button
      size="xs"
      onClick={connectWallet}
      className={cn(
        outfit.className,
        "text-sm flex hover:translate-x-1 hover:-translate-y-1 transition-all"
      )}
    >
      Connect Wallet
    </Button>
  );
}

const RegisterButtons = ({ className = "" }) => (
  <div className={cn("items-center justify-center gap-4", className)}>
    <Link href="/auth/candidate">
      <Button
        size="xs"
        variant="outline"
        className={cn(
          outfit.className,
          "text-sm hover:translate-x-1 hover:-translate-y-1 transition-all"
        )}
      >
        Register as Candidate
      </Button>
    </Link>
    <Link href="/auth/voter">
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
