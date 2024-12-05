"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/utils/cn";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function NavigatorLink({ link }: { link: string }) {
  const pathname = usePathname();
  return (
    <NavigationMenuItem>
      <Link
        href={`/${link}`}
        className={cn(
          outfit.className,
          "text-xl hover:text-white capitalize",
          pathname === `/${link}` ? "text-white" : "text-[#ccccd2]"
        )}
      >
        {link}
      </Link>
    </NavigationMenuItem>
  );
}
