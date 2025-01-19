import { Menu } from "lucide-react";
import Link from "next/link";
import { Fondamento } from "next/font/google";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import HamburgerLink from "./hamburger-link";

import { cn } from "@/utils/cn";

const fondamento = Fondamento({ weight: "400", subsets: ["latin"] });

export default async function Hamburger({ className }: { className: string }) {
  return (
    <Sheet>
      <SheetTrigger className={className}>
        <Menu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="min-h-[80vh] bg-[#00000040] backdrop-blur-sm"
      >
        <SheetTitle className="mb-4 mt-8">
          <Link
            href="/"
            className={cn(fondamento.className, "text-nowrap text-2xl")}
          >
            VoteX
          </Link>
        </SheetTitle>
        <SheetDescription className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {["candidates", "voters", "admin", "about"].map((link, idx) => (
              <HamburgerLink link={link} key={idx} />
            ))}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
