import { AwardIcon, BookIcon, BriefcaseIcon, CodeIcon, GithubIcon, MessageCircleIcon, SearchIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-primary-foreground">
          <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background">
                Find Your Dream Internship or Job
              </h1>
              <p className="text-lg md:text-xl text-background">
                Our app helps you discover the best opportunities tailored to your profile, with real-time communication
                and access to valuable resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-primary px-8 text-sm font-medium text-background shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="500"
              height="500"
              alt="Hero"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-2 items-center">
            <img
              src="/placeholder.svg"
              width="500"
              height="500"
              alt="Features"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Discover the Best Opportunities
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Our app searches across multiple job platforms to provide you with the most relevant and tailored
                opportunities.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-6 shadow-md">
                  <SearchIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Search</h3>
                  <p className="text-muted-foreground mt-2">
                    Easily search for internships and jobs across various platforms.
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6 shadow-md">
                  <BriefcaseIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Tailored Matches</h3>
                  <p className="text-muted-foreground mt-2">
                    Get personalized recommendations based on your profile and preferences.
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6 shadow-md">
                  <GithubIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">GitHub Integration</h3>
                  <p className="text-muted-foreground mt-2">
                    Showcase your projects and skills with seamless GitHub integration.
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6 shadow-md">
                  <MessageCircleIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Real-Time Communication</h3>
                  <p className="text-muted-foreground mt-2">
                    Stay connected with employers and other users throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Unlock Your Potential</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Our app provides access to valuable resources and tools to help you grow and succeed.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <BookIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Learning Resources</h3>
                  <p className="text-muted-foreground mt-2">
                    Explore a curated collection of tutorials, courses, and guides to enhance your skills.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <CodeIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Project Showcase</h3>
                  <p className="text-muted-foreground mt-2">
                    Showcase your projects and achievements to potential employers.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <UsersIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Networking</h3>
                  <p className="text-muted-foreground mt-2">
                    Connect with like-minded individuals and build valuable connections.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <AwardIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground mt-4">Career Advancement</h3>
                  <p className="text-muted-foreground mt-2">
                    Gain insights and guidance to take your career to the next level.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="500"
              height="500"
              alt="Resources"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-2 items-center">
            <img
              src="/placeholder.svg"
              width="500"
              height="500"
              alt="Community"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Join Our Vibrant Community</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Connect with like-minded individuals, share insights, and support each other on your career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Join Now
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Jobfinder. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}