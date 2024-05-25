export type RequestWithSessionIdAndMessage = Request & {
  session_id: string
  message: string
}
