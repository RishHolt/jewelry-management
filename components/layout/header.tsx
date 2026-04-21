"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const routeLabels: Record<string, string> = {
  "/dashboard":  "Dashboard",
  "/inventory":  "Inventory",
  "/sales":      "Sales & Orders",
  "/customers":  "Customers",
};

function getPageTitle(pathname: string): string {
  for (const [route, label] of Object.entries(routeLabels)) {
    if (pathname === route || pathname.startsWith(route + "/")) return label;
  }
  return "Dashboard";
}

function LiveClock() {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(new Date());
    const timeoutId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="hidden flex-col items-end text-right sm:flex">
      <span className="text-sm font-medium tabular-nums text-foreground">{time}</span>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = getPageTitle(pathname);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>

      <div className="flex items-center gap-6">
        <LiveClock />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gold-100 text-gold-700 text-xs font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Admin
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
