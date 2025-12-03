import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"
import { AdvancedFilter } from "./advanced-filter"
import { GlobalSearch } from "./global-search"

type ProductColumn = {
  name: string
  price: number
  stock: number
  category: string
  tags: string
  inStock: boolean
  releaseDate: string
  rating: number
}

const productTableColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    meta: {
      filter_type: "text",
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    meta: {
      filter_type: "number",
    },
    cell: ({ row }) => `$${row.getValue("price")}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    meta: {
      filter_type: "range",
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    meta: {
      filter_type: "select",
      options: [
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Books", value: "books" },
        { label: "Home & Garden", value: "home" },
      ],
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    meta: {
      filter_type: "multiSelect",
      options: [
        { label: "New", value: "new" },
        { label: "Sale", value: "sale" },
        { label: "Popular", value: "popular" },
        { label: "Limited", value: "limited" },
      ],
    },
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    meta: {
      filter_type: "boolean",
    },
    cell: ({ row }) => (row.getValue("inStock") ? "Yes" : "No"),
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    meta: {
      filter_type: "dateRange",
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    meta: {
      filter_type: "range",
    },
    cell: ({ row }) => `${row.getValue("rating")} ⭐`,
  },
]

const sampleProducts: ProductColumn[] = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    stock: 45,
    category: "electronics",
    tags: "new,popular",
    inStock: true,
    releaseDate: "2024-01-15",
    rating: 4.5,
  },
  {
    name: "Cotton T-Shirt",
    price: 19.99,
    stock: 120,
    category: "clothing",
    tags: "sale",
    inStock: true,
    releaseDate: "2024-03-20",
    rating: 4.2,
  },
  {
    name: "JavaScript Guide",
    price: 34.99,
    stock: 0,
    category: "books",
    tags: "popular",
    inStock: false,
    releaseDate: "2023-11-10",
    rating: 4.8,
  },
  {
    name: "Garden Hose",
    price: 24.99,
    stock: 30,
    category: "home",
    tags: "new,sale",
    inStock: true,
    releaseDate: "2024-02-05",
    rating: 3.9,
  },
  {
    name: "Smart Watch",
    price: 249.99,
    stock: 15,
    category: "electronics",
    tags: "new,limited",
    inStock: true,
    releaseDate: "2024-04-01",
    rating: 4.7,
  },
  {
    name: "Yoga Mat",
    price: 39.99,
    stock: 80,
    category: "home",
    tags: "popular,sale",
    inStock: true,
    releaseDate: "2024-01-20",
    rating: 4.3,
  },
]

export default function AdvancedTable(){
    return(
      <div>
          <DataTable data={sampleProducts} columns={productTableColumns} Search={GlobalSearch} AdvancedSearch={AdvancedFilter}/>
      </div>
    )
}