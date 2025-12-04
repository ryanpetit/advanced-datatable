"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type Table as ReactTableType,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "./data-table-pagination"
import { ArrowUpDown } from "lucide-react"
import { type JSX, useState, useMemo } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  PaginateList?: boolean
  initialPageSize?: number
  Search?: (table: { table: ReactTableType<TData> }) => JSX.Element
  AdvancedFilter?: (table: { table: ReactTableType<TData> }) => JSX.Element
}

export function DataTable<TData, TValue>({
  columns,
  data,
  PaginateList = true,
  initialPageSize = 10,
  Search,
  AdvancedFilter,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("")

  const enhancedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      filterFn:
        col.filterFn ||
        ((row, columnId, filterValue) => {
          if (!filterValue) return true
          if (typeof filterValue === "object" && filterValue.matchFn) {
            return filterValue.matchFn(row.getValue(columnId))
          }
          return true
        }),
    }))
  }, [columns])

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    initialState: { pagination: { pageSize: initialPageSize } },
  })

  return (
    <div className="w-full h-full flex flex-col justify p-5 rounded-md flex-1">
      <button
        className="flex justify-end w-full hover:cursor-pointer"
        onClick={() => {
          table.reset()
          table.resetColumnFilters()
        }}
      >
        Reset Table
      </button>
      {Search && <Search table={table} />}
      {AdvancedFilter && <AdvancedFilter table={table} />}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold">
                    <div className="flex align-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <button className="ml-2" onClick={header.column.getToggleSortingHandler()}>
                          <ArrowUpDown className="w-5 h-5 hover:cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-0 text-left">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        table={table}
        selected_rows={table.getFilteredSelectedRowModel().rows.length}
        PaginateList={PaginateList}
      />
    </div>
  )
}
