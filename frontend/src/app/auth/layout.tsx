import { FeatureCarousel, Logo } from "@/components/Auth"
import { TopLeftShine, TopRightShine } from "@/components/Auth/AuthStyle"
import { Separator } from "@/components/ui/separator"
import { auth } from "@clerk/nextjs/server"
import { Github } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import type React from "react"

export const dynamic = "force-dynamic"

const features = [
  "Automatically generate explanatory documents for the produced diagrams, aiding in system understanding and knowledge transfer.",
  `Provide code templates aligned with the diagram's design, facilitating faster implementation.`,
  `Estimate costs based on the generated system architecture diagram.`,
  `Provide code templates aligned with the diagram's design, facilitating faster implementation.`
]

export default async function AuthenticatedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (userId) {
    return redirect("/")
  }

  return (
    <div className="bg-black">
      <div className="pointer-events-none absolute left-0 top-0 flex w-screen justify-start overflow-hidden">
        <TopLeftShine />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 flex w-screen justify-end overflow-hidden">
        <TopRightShine />
      </div>
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Link
          className="flex h-8 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white duration-500 hover:bg-white hover:text-black"
          href="https://github.com/buisihung11/SyArGPT"
          target="_blank"
        >
          <Github className="h-4 w-4" strokeWidth={1} />
          GitHub
        </Link>
      </nav>
      <div className="-mt-16 flex min-h-screen pt-16">
        <div className="container relative flex flex-col items-center justify-center gap-8 lg:w-2/5">
          <div className="w-full max-w-sm">{children}</div>
          <div className="flex items-center justify-center">
            <p className="text-balance p-4 text-center text-xs text-white/50">
              By continuing, you agree to SyarGPT{" "}
              <Link className="underline" href="/policies/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/policies/privacy">
                Privacy Policy
              </Link>
              , and to receive periodic emails with updates.
            </p>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="-mt-16 hidden h-[100vh] bg-white/20 lg:block"
        />
        <div className="hidden h-[calc(100vh-4rem)] w-3/5 items-center justify-center lg:flex">
          <FeatureCarousel features={features} />
        </div>
      </div>
    </div>
  )
}
