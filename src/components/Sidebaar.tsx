"use client";

import { LayoutDashboard, TrendingUp, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from '@/Img/logo.png';

// 1. Sticking strictly to the menu items required by the assignment.
const items = [
  { title: "Personalized Feed", href: "/", icon: LayoutDashboard },
  { title: "Trending", href: "/trending", icon: TrendingUp },
  { title: "Favorites", href: "/favorites", icon: Star },
];

/**
 * Renders the navigation content for the sidebar panel.
 * This component is now 'dumb' and only displays the links.
 */
const Sidebaar = () => {
    const pathname = usePathname();

    return ( 
       <div className="flex h-full flex-col">
            {/* 2. Consistent header within the sidebar for branding. */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image src={logo} alt="Dashboard Logo" width={28} height={28} />
                    <span className="">Content Dashboard</span>
                </Link>
            </div>
            <nav className="grid items-start p-4 text-sm font-medium">
                {items.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary",
                            pathname === item.href && "bg-muted text-primary font-bold" // Clearer active state
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </nav>
       </div>
     );
}
 
export default Sidebaar;
