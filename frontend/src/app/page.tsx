import ChatSection from "@/components/ChatSection"
import ExplainSection from "@/components/ExplainSection/ExplainSection"
import Header from "@/components/Header"
import Nav from "@/components/Nav"
import ResultSection from "@/components/ResultSection/ResultSection"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Providers } from "@/components/shared"

export const maxDuration = 60

export default function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    return redirect("/auth/sign-in")
  }

  return (
    <TooltipProvider>
      <Providers>
        <div className="h-screen w-full pl-[56px]">
          <Nav />
          <div className="flex h-full flex-col">
            <Header />

            <main className="flex-1 overflow-auto">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={20} defaultSize={20}>
                  <ChatSection />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60}>
                  <ResultSection />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={20}>
                  <ExplainSection />
                </ResizablePanel>
              </ResizablePanelGroup>
            </main>
          </div>
        </div>
      </Providers>
    </TooltipProvider>
  )
}
