"use client";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { JSX, SVGProps } from "react";
import {
  BriefcaseBusiness,
  Earth,
  Fullscreen,
  Github,
  HomeIcon,
  LayoutDashboardIcon,
  LifeBuoy,
  LogIn,
  LogOut,
  MenuIcon,
  MessageCircleMore,
  SettingsIcon,
  User,
  Users,
} from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { ImYoutube } from "react-icons/im";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function NewResponsiveNav() {
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col bg-background  ">
      <header className=" flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={true}>
          <span className="text-lg font-semibold text-primary">
            Show<span className="text-[#F59E0B]">OFF</span>
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6 transition-transform duration-300 group-[.open]:rotate-90" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-card p-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                prefetch={true}
              >
                <span className="text-lg font-semibold text-primary">
                  Show<span className="text-[#F59E0B]">OFF</span>
                </span>
                {user?.id && (
                  <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      {user.firstName && user.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
              </Link>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-transform duration-300 group-[.open]:rotate-45"
                >
                  <span className="sr-only">Close navigation</span>
                </Button>
              </SheetClose>
            </div>
            <nav className="mt-6 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                prefetch={true}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <SignedIn>
                {/*here comes the extra */}
                  <Link
                  href="/dashboard/jobs"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <BriefcaseBusiness className="h-5 w-5" />
                  Apply for Jobs
                </Link>
                <Link
                  href="/dashboard/github"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <Github className="h-5 w-5" />
                  Repositories
                </Link>
                <Link
                  href="/dashboard/youtube"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <ImYoutube className="h-5 w-5" />
                  Resources
                </Link>
                
                <Link
                  href="/dashboard/myposts"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <Fullscreen className="h-5 w-5" />
                  My Posts
                </Link>
                <Link
                  href="/dashboard/globe"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <Earth className="h-5 w-5" />
                  Global
                </Link>
                <Link
                  href="/member"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <Users className="h-5 w-5" />
                  Our Members
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <MessageCircleMore className="h-5 w-5" />
                  My Messages
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={true}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Profile
                </Link>
              </SignedIn>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                prefetch={true}
              >
                <LifeBuoy className="h-5 w-5" />
                Contact Us
              </Link>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
                <SignedOut>
                  <LogIn className="h-5 w-5" />
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <LogOut className="h-5 w-5" />
                  <SignOutButton />
                </SignedIn>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                prefetch={true}
              >
                Home
              </Link>
            </NavigationMenuLink>
            <SignedIn>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Dashboard
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[200px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/jobs"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <BriefcaseBusiness className="h-5 w-5" />
                          Apply for Jobs
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/github"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <Github className="h-5 w-5" />
                          Repositories
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/youtube"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <ImYoutube className="h-5 w-5" />
                          Resources
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/messages"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <MessageCircleMore className="h-5 w-5" />
                          My Messages
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/myposts"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                        <Fullscreen className="h-5 w-5" />
                        My Posts
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/globe"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                        <Earth className="h-5 w-5" />
                        Global
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/member"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={true}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <Users className="h-5 w-5" />
                          Our Members
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* issue */}
              <NavigationMenuLink asChild>
                <Link
                  href="/profile"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={true}
                >
                  <User /> Profile
                </Link>
              </NavigationMenuLink>
            </SignedIn>
            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                prefetch={true}
              >
                Contact Us
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <div className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                <SignedOut>
                  <LogIn className="mr-2 h-4 w-4" />
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <LogOut className="mr-2 h-4 w-4" />
                  <SignOutButton />
                </SignedIn>
              </div>
            </NavigationMenuLink>
            {/* issue */}
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
  );
}
