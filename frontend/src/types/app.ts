export type Cost = {
  summary: string
  rows: string[]
  columns: string[]
}

export type AppResponse = {
  cost: Cost
  codeBlock: string
  explain: string
  image?: URL
}
