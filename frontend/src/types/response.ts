export type AppResponseFromDownStream = Response & {
  code_block: string
  explain: string
  image: string
}

export type AppExplanResponseFromStream = Response & {
  explain: string
}
