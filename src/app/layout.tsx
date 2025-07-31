import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider }  from '@/components/StoreProvider';
import {ThemeProvider} from '@/components/Providers/ThemeProvider';
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Dashboard",
  description: "Personal Content Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <ThemeProvider   
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        <StoreProvider>
           <div className="flex min-h-screen w-full flex-col bg-background">
            
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          
        </StoreProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
