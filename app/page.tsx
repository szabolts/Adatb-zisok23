
import Link from "next/link"
import FainButton from "@/app/ui/about/FainButton"

export default function Home() {

  return (
    <main className="">
      <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48 min-h-screen ">
          <div className="mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter py-4 sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to TournaMentor!
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Your ultimate solution for managing and participating in tournaments.
            </p>
            
            <FainButton />
          </div>
        </section>
    </main>
  )
}
