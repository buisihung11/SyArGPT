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
import { Skeleton } from "../ui/skeleton"

type CostTabType = {
  costResult?: CostResult
  isCostTabLoading: boolean
}

const CostTab: FC<CostTabType> = ({ costResult, isCostTabLoading }) => {
  if (isCostTabLoading) {
    return <TableSkeleton />
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
      <TableCaption>Cost Table.</TableCaption>
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

function TableSkeleton() {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Service</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">Montly Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(5).fill(undefined).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px] ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CostTab
