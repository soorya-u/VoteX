import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavigatorLink from "./NavigatorLink";

export default function Navigator({ className }: { className: string }) {
  return (
    <NavigationMenu className={`w-1/2 ${className}`}>
      <NavigationMenuList className="w-full flex-shrink-0 gap-8">
        {["candidates", "voters", "owner", "about"].map((link, idx) => (
          <NavigatorLink key={idx} link={link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
