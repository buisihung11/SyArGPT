"use client"

import { useBoundStore } from "@/stores/useBoundStore"

const HistorySection = () => {
  const messages = useBoundStore(state => state.messages)

  return (
    <div className="relative flex h-36 flex-col p-4 bg-background border-t-2">
      <h1 className="text-xl font-semibold">History</h1>
      {messages.map((message, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold">{message.role}</p>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistorySection
