"use client"

import { Button } from "@/components/ui/button"
import { AppSlice, useAppStore, useChatStore } from "@/stores"
import { File, RefreshCcw, TriangleAlert } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { DrawIoEmbedRef, EventExport } from "react-drawio"
import { GridBackgroundDemo } from "../GridBackground/GridBackground"
import HistorySection from "../HistorySection/HistorySection"

const sampleData = [
  {
    name: "PDF Ai Chatbot",
    prompt: `Cloud architecture for a service that can take PDF files and allow users to have AI chat sessions regarding the content of the PDF files.

    - Vectorize the PDF files using AWS Bedrock Embedding API
    - Store them on a cloud vector database
    - store the text chunks in a separate storage.
    
    During a chat session, when a user asks a question
    - turn the question in to a vector using AWS Bedrock
    - query the vector database
    - Use query result vectors to retrieve the associated text chunks.
    - Query AWS Bedrock with the retrieved text chunks and the original user question
    - Return results from AWS Bedrock to the user. 
    Use AWS infrastructure where applicable.
    `
  },
  {
    name: "Git Marketplace",
    prompt: `
    Cloud architecture for a marketplace for freelance developers to find work. Allow authentication via GitHub and LinkedIn.
    Use machine learning to recommend listings.
    Use React for the frontend
    Use a graph database to store user activities, use a SQL database for job listings. Use AWS infrastructure where applicable.
    `
  },
  {
    name: "Wallet Application",
    prompt: `The Wallet application aims to offer users a secure and convenient way to manage their finances, including storing, sending, and receiving money, paying for services, and tracking financial activities. Key features include user authentication (via email, phone, Google, Facebook),money management (add money, send/receive money, request money), payment services (QR code payments, direct payments), transaction history (view and filter transactions), security features (two-factor authentication, activity monitoring, data encryption), and customer support (in-app chat and email support).\nThe application will leverage various AWS services: AWS Cognito for user authentication, Amazon RDS for data storage, AWS Lambda for payment processing, AWS CloudTrail and Shield for security and monitoring, Amazon SageMaker for machine learning, Amazon QuickSight for analytics, and Amazon SNS/SQS for messaging and notifications. The technology stack includes React.js for the frontend, Node.js for the backend, MySQL/PostgreSQL with Amazon RDS for the database, and Stripe for payment processing. This setup ensures a robust, scalable, and secure financial management platform.`
  },
  {
    name: "Banking System",
    prompt: `Design a banking system architecture`
  }
]

const ResultSection = () => {
  const { imageResult, codeResult } = useAppStore((state: AppSlice) => state)
  const currentMessage = useChatStore(state => state.currentMessage)
  const isInit = !imageResult

  const [viewMode, setViewMode] = useState<"image" | "edit">("image")
  const [isLoaded, setIsLoaded] = useState(false)
  const [fetchingXMLFile, setFetchingXMLFile] = useState(false)
  const setPrompt = useChatStore(state => state.onInputPrompt)
  const drawioRef = useRef<DrawIoEmbedRef>(null)
  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  const [loadImageError, setLoadImageError] = useState(false)

  useEffect(() => {
    if (drawioRef.current && isLoaded) {
      drawioRef.current.layout({
        layouts: []
      })
    }
  }, [isLoaded])

  const onExportFile = (data: EventExport) => {
    const link = downloadRef.current
    if (!link) {
      return
    }

    link.href = data.data
    link.download = `image_${new Date().toUTCString()}.${data.format}`
    ;(link as any).click()
  }

  if ((!imageResult && codeResult) || loadImageError) {
    return <ErrorResult />
  }

  // TODO: Handle when image is null

  return (
    <div className="relative flex flex-col h-full min-h-[50vh]">
      <a ref={downloadRef} className="hidden" />
      <GridBackgroundDemo />
      {isInit ? (
        <div className="h-full p-6 text-center flex flex-col gap-2 w-full justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Image
              width={40}
              height={40}
              src="/assets/images/wave_hand.webp"
              alt="Online collaboration"
              unoptimized
            />
            <h1 className="text-4xl font-semibold mt-1">Welcome to SyArGPT!</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Start by creating a new diagram or loading an existing one to begin
            collaborating.
          </p>
          <div className="mt-4">
            <h4 className="text-sm font-semibold tracking-tight mb-2">
              Or try our samples
            </h4>
            <div className="w-full flex flex-row gap-2 items-center justify-center flex-wrap">
              {sampleData.map((data, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    setPrompt(data.prompt)
                  }}
                  variant="outline"
                  size="sm"
                >
                  {data.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 h-full">
          <div
            className={`p-4 flex flex-col gap-2 h-full items-center w-full justify-center ${
              viewMode !== "image" && "hidden"
            }`}
          >
            <div className="bg-muted shadow-md w-full h-full max-w-[800px] mx-auto relative">
              {imageResult && (
                <Image
                  onError={() => {
                    setLoadImageError(true)
                  }}
                  src={imageResult as unknown as string}
                  alt="Cloud Architecture Diagram"
                  fill
                  objectFit="contain"
                  className="rounded-md object-cover cursor-pointer"
                />
              )}
            </div>
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => {
                  drawioRef.current?.exportDiagram({
                    format: "png"
                  })
                }}
                variant="outline"
                size="sm"
              >
                <File className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="h-48 min-h-36 justify-self-end">
        <HistorySection />
      </div>
    </div>
  )
}

function ErrorResult() {
  const router = useRouter()

  return (
    <div
      key="1"
      className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-red-500 rounded-full p-4">
            <TriangleAlert className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Oops, something went wrong!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            We are sorry, but an unexpected error has occurred. Please try again
            later or contact support if the problem persists.
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => {
                router.refresh()
              }}
              variant="outline"
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultSection
