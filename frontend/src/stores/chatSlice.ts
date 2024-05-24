import { StateCreator } from "zustand"

export type ChatSlice = {
  messages: Message[]
  prompt: string
  onInputPrompt: (prompt: string) => void
  onConversation: (message: Message) => void
  currentMessage: Message | null
}

const input = `
        from diagrams import Cluster, Diagram
        from diagrams.aws.compute import ECS, EKS, Lambda
        from diagrams.aws.database import Redshift
        from diagrams.aws.integration import SQS
        from diagrams.aws.storage import S3
        
        with Diagram("Event Processing", show=False):
            source = EKS("k8s source")
        
            with Cluster("Event Flows"):
                with Cluster("Event Workers"):
                    workers = [ECS("worker1"),
                              ECS("worker2"),
                              ECS("worker3")]
        
                queue = SQS("event queue")
        
                with Cluster("Processing"):
                    handlers = [Lambda("proc1"),
                                Lambda("proc2"),
                                Lambda("proc3")]
        
            store = S3("events store")
            dw = Redshift("analytics")
        
            source >> workers >> queue >> handlers
            handlers >> store
            handlers >> dw
      `

export const createBearSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set,
  get
) => ({
  messages: [],
  prompt: input,
  onInputPrompt: prompt => {
    set(state => ({ prompt }))
  },
  onConversation: message => {
    set(state => {
      return {
        messages: [...state.messages, message],
        currentMessage: message
      }
    })
  },
  currentMessage: null,
  costResult: {
    summary: "",
    rows: [],
    columns: []
  }
})
