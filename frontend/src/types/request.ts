export type RequestWithMessage = Request & {
  message: string
}

export type RequestWithSessionIdAndMessage = Request &
  RequestWithMessage & {
    session_id: string
  }
