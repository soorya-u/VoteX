"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/utils/cn";
import { useUser } from "@/hooks/use-context";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function NavigatorLink({ link }: { link: string }) {
  const pathname = usePathname();

  const { admin, publicKey } = useUser();

  if (link === "admin" && (!publicKey || publicKey !== admin)) return;
  return (
    <NavigationMenuItem>
      <Link
        href={`/${link}`}
        className={cn(
          outfit.className,
          "text-xl capitalize hover:text-white",
          pathname === `/${link}` ? "text-primary" : "text-[#ccccd2]",
        )}
      >
        {link}
      </Link>
    </NavigationMenuItem>
  );
}
