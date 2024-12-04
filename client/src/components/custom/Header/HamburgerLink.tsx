"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";
import { SheetClose } from "@/components/ui/sheet";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function HamburgerLink({ link }: { link: string }) {
  const pathname = usePathname();

  return (
    <SheetClose asChild>
      <Link
        href={`/${link}`}
        className={cn(
          outfit.className,
          "px-2 bg-transparent py-3 text-lg capitalize",
          pathname === `/${link}` ? "text-primary" : "text-secondary"
        )}
      >
        {link}
      </Link>
    </SheetClose>
  );
}
