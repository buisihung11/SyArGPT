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

export const maxDuration = 60

export default function Dashboard() {
  return (
    <TooltipProvider>
      <div className="h-screen w-full pl-[56px]">
        <Nav />
        <div className="flex flex-col h-full">
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
    </TooltipProvider>
  )
}
