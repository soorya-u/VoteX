"use client";

import { useContract } from "@/hooks/use-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function UpdateLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { publicKey } = useContract();
  const { toast } = useToast();

  useEffect(() => {
    if (!publicKey) {
      toast({
        title: "Wallet hasn't been Connected",
        description: "Updation cannot proceed until the Wallet is Connected",
        variant: "destructive",
      });

      return router.replace("/");
    }
  }, [publicKey, toast, router]);

  return children;
}
