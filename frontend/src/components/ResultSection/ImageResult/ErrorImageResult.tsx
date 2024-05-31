import { RefreshCcw, TriangleAlert } from "lucide-react"
import React from "react"
import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"

const ErrorImageResult = () => {
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

export default ErrorImageResult
