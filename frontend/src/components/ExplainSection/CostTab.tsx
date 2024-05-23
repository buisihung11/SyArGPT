"use client"
import { FC } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CostResult } from "@/stores/costSlice"

type CostTabType = {
  costResult?: CostResult
  isCostTabLoading: boolean
}

const CostTab: FC<CostTabType> = ({ costResult, isCostTabLoading }) => {
  if (isCostTabLoading) {
    return <h1>loading...</h1>
  }

  if (!costResult) {
    return <h1>No Cost found</h1>
  }

  const { summary, rows, columns } = costResult

  const mappedCostList = rows.map(row => {
    return {
      service: row[0],
      costCalculation: row[1],
      monthlyCost: row[2]
    }
  })
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{columns[0]}</TableHead>
          <TableHead>{columns[1]}</TableHead>
          <TableHead className="text-right">{columns[2]}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mappedCostList.map(cost => (
          <TableRow key={cost.service}>
            <TableCell className="font-medium">{cost.service}</TableCell>
            <TableCell>{cost.costCalculation}</TableCell>
            <TableCell className="text-right">{cost.monthlyCost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>{summary}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default CostTab
