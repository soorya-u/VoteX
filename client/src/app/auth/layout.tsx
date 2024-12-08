"use client";

import { useContract } from "@/hooks/use-context";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { publicKey } = useContract();

  useEffect(() => {
    if (!publicKey) router.push("/");
  }, [publicKey]);

  return children;
}
