import { type Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown } from "lucide-react";

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
                        <div className="relative rounded-md">
                            <button className="w-16 flex justify-between items-center peer relative z-10 h-10 p-2 rounded-md dark:border-2 dark:border-gray-500 hover:bg-gray-500 hover:border-gray-500 hover:text-white hover:cursor-pointer">{table.getState().pagination.pageSize} <ChevronsUpDown className="w-5 h-5" /></button>
                            <div id="sortboxmenu" className="hidden dark:border-2 bg-gray-500 w-full text-center z-10 rounded-md absolute -top-44 dark:border-gray-500 shadow peer-focus:block ">
                                <button onMouseDown={() => {
                                    table.setPageSize(10)
                                }} className="w-10 h-10 hover:bg-gray-800 hover:text-white rounded-md text-center hover:cursor-pointer">10</button>
                                <button onMouseDown={() => {
                                    table.setPageSize(20)
                                }} className="w-10 h-10 hover:bg-gray-800 hover:text-white rounded-md text-center hover:cursor-pointer">20</button>
                                <button onMouseDown={() => {
                                    table.setPageSize(50)
                                }} className="w-10 h-10 hover:bg-gray-800 hover:text-white rounded-md text-center hover:cursor-pointer">50</button>
                                <button onMouseDown={() => {
                                    table.setPageSize(100)
                                }} className="w-10 h-10 hover:bg-gray-800 hover:text-white rounded-md text-center hover:cursor-pointer">100</button>
                            </div>
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
                        <button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}
                        >
                            <ChevronsLeft className="w-6 h-6 p-0" />
                        </button>
                        <button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            <ChevronLeft className="w-5 h-5 p-0" />
                        </button>

                    </div>
                    :
                    <div className='w-[24px] h-[24px]'></div>
                }

                <div>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>

                {table.getState().pagination.pageIndex + 1 < table.getPageCount() ?
                    <div className="flex">
                        <button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            <ChevronRight className="w-5 h-5 p-0" />
                        </button>
                        <button
                            className='text-white p-1 hover:cursor-pointer'
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        >
                            <ChevronsRight className="w-6 h-6 p-0" />
                        </button>
                    </div>
                    :
                    <div className='w-[24px] h-[24px]'></div>
                }
            </div>
        </div>
    )
}
