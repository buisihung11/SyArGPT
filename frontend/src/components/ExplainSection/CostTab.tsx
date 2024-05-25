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
import { Skeleton } from "../ui/skeleton"
import { Cost } from "@/types"

type CostTabType = {
  costResult?: Cost
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

  return (
    <Table>
      <TableCaption>Cost Table.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column, idx) => (
            <TableHead
              className={
                idx === 0
                  ? "w-[100px]"
                  : idx === columns.length - 1
                  ? "text-right"
                  : ""
              }
              key={idx}
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(cost => (
          <TableRow key={cost[0]}>
            {cost.map((cell, idx) => (
              <TableCell
                key={idx}
                className={
                  idx === 0
                    ? "w-[100px]"
                    : idx === cost.length - 1
                    ? "text-right"
                    : ""
                }
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={columns.length}>{summary}</TableCell>
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
              <TableHead className="text-right">Monthly Cost</TableHead>
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
