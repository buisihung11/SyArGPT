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
  costResult?: Cost | null
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
  const mockColumns = [
    "Service Name",
    "Monthly Cost",
    "Region",
    "Config Summary"
  ]

  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {mockColumns.map((column, idx) => (
                <TableHead
                  className={
                    idx === 0
                      ? "w-[100px]"
                      : idx === mockColumns.length - 1
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
          <TableBody className="bg-muted">
            {new Array(5).fill(undefined).map((_, idx) => (
              <TableRow key={idx}>
                {mockColumns.map((_, idx) => (
                  <TableCell
                    key={idx}
                    className={
                      idx === 0
                        ? "w-[100px]"
                        : idx === mockColumns.length - 1
                        ? "text-right"
                        : ""
                    }
                  >
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CostTab
