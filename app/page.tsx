
import Link from "next/link"

export default function Home() {

  return (
    <main className="min-h-screen">
      <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48 min-h-screen ">
          <div className="mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to TournaMentor!
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Your ultimate solution for managing and participating in tournaments.
            </p>
            <Link
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              href="#"
            >
              Get Started
            </Link>
          </div>
        </section>
    </main>
  )
}
