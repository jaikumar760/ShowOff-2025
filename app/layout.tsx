import type { Metadata } from "next";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import {Toaster} from "react-hot-toast"
import "./globals.css";
import { cn } from "@/lib/utils";
import NewResponsiveNav from "@/components/BasicNav/NewResponsiveNav";
import { SocketProvider } from "@/components/Context/SocketContext";
import Link from "next/link";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ShowOFF",
  description: "Welcome to the World of Opportunities with ShowOFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "h-screen w-full relative flex-col  antialiased",
            "antialiased",
            fontHeading.variable,
            fontBody.variable
          )}
        >
          <SocketProvider>
          <Toaster/>
          <NewResponsiveNav/>
<div className="min-h-[80vh]">
          {children}
</div>
          </SocketProvider>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ShowOff by Saurabh Anand. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
