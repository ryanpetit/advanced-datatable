import { type Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DataTablePaginationProps<TData> {
    table: Table<TData>,
    selected_rows: number,
    PaginateList?: boolean
}

export default function Pagination<TData>({
    table,
    selected_rows,
    PaginateList
}: Readonly<DataTablePaginationProps<TData>>) {
    return (
        <div className='flex justify-between items-center mt-5'>
            <div className='relative flex items-center'>
                <div className='flex justify-center items-center gap-2'>
                    {PaginateList &&
                        <div className="relative">
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                }}
                            >
                                <SelectTrigger className="h-8 w-20" size="sm">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 50, 100].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>}
                    <div>Total: {table.getFilteredRowModel().rows.length}</div>
                </div>
                {selected_rows > 0 &&
                    <div className='flex font-light'>
                        <div className='pl-5'>{selected_rows} of {table.getState().pagination.pageSize} row(s) selected</div>
                    </div>
                }
            </div>
            <div className='flex justify-between items-center pr-5'>
                {table.getState().pagination.pageIndex + 1 > 1 ?
                    <div className="flex">
                        <Button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}
                        >
                            <ChevronsLeft className="w-6 h-6 p-0" />
                        </Button>
                        <Button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            <ChevronLeft className="w-5 h-5 p-0" />
                        </Button>

                    </div>
                    :
                    <div className='w-[24px] h-[24px]'></div>
                }

                <div>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>

                {table.getState().pagination.pageIndex + 1 < table.getPageCount() ?
                    <div className="flex">
                        <Button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            <ChevronRight className="w-5 h-5 p-0" />
                        </Button>
                        <Button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        >
                            <ChevronsRight className="w-6 h-6 p-0" />
                        </Button>
                    </div>
                    :
                    <div className='w-[24px] h-[24px]'></div>
                }
            </div>
        </div>
    )
}
