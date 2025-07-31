// import Image from "next/image";
// import Link from "next/link";
// import logo from '@/Img/logo.png';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Menu } from "lucide-react";
// import Sidebaar from "@/components/Sidebaar";
// import Search from "@/components/Search";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import ThemeToggler from '@/components/ThemeToggler';

// // Note: The above imports are for the UI components used in the Navbar
// const Navbar = () => {
//     return ( 
//     <div className="flex items-center justify-between  bg-primary-400 dark:bg-slate-700 text-white">
   
//        <div className="flex items-center gap-4">
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button className="p-4 rounded bg-slate-600 hover:bg-slate-500">
//               <Menu className="w-5 h-5 text-white" />
//          <Link href='/' >
//          <Image src={logo} alt="admin logo" width={40}/>
//         </Link>
         
//             </Button>
//           </SheetTrigger>

//           <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-slate-900">
//             <Sidebaar />
//           </SheetContent>
//         </Sheet>
//       </div>

//       <div className="hidden md:flex items-center justify-center w-full max-w-md">
//         <Search />
//       </div>
           
// <div className="flex items-center gap-2">
// <ThemeToggler />
// <DropdownMenu>
//   <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
//        <Avatar>
//   <AvatarImage src="https://github.com/shadcn.png"  alt='@shadcn'/>
//   <AvatarFallback className="text-black">CN</AvatarFallback>
// </Avatar>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>
//         <Link href={'/profile'}>Profile</Link>
//         </DropdownMenuItem>
//     <DropdownMenuItem>
//         <Link href='/auth'>Logout</Link>
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
// </div>
//    </div>
//      );
// }
 
// export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggler from '@/components/ThemeToggler';
import Sidebaar from "@/components/Sidebaar";
import Search from "@/components/Search";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    // 1. Uses standard theme variables for background and border for consistency.
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center gap-4 px-4 sm:px-6">
        
        {/* 2. Sidebar navigation, triggered by a menu icon on mobile. */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebaar />
            </SheetContent>
          </Sheet>
          {/* The logo/brand is part of the desktop sidebar, not duplicated here */}
        </div>

        {/* 3. Search bar is the central, flexible element. */}
        <div className="flex-1 max-w-xl mx-auto">
          <Search />
        </div>

        {/* 4. User account info and theme toggle are grouped to the right. */}
        <div className="flex flex-1 justify-end items-center gap-3">
          <ThemeToggler />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
