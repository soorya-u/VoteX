"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";
import { SheetClose } from "@/components/ui/sheet";
import { useUser } from "@/hooks/use-context";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function HamburgerLink({ link }: { link: string }) {
  const pathname = usePathname();

  const { publicKey, admin } = useUser();

  if (link === "admin" && (!publicKey || publicKey !== admin)) return;

  return (
    <SheetClose asChild>
      <Link
        href={`/${link}`}
        className={cn(
          outfit.className,
          "bg-transparent px-2 py-3 text-lg capitalize",
          pathname === `/${link}` ? "text-primary" : "text-secondary",
        )}
      >
        {link}
      </Link>
    </SheetClose>
  );
}
