import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { FC } from "react"

interface TableProps {
    data: any[]
    columns: any[]
}

// define the styles
const styles = {
    table: ``,
    thead: ``,
}

const Table: FC<TableProps> = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        // <Styles>
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.footer,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
        // </Styles>
    )

    // return (
    // <>
    //     <TableHead>
    //         {getHeaderGroups().map((headerGroup) => (
    //             <TableRow key={headerGroup.id}>
    //                 {headerGroup.headers.map((header) => (
    //                     <TableCell key={header.id}>
    //                         {header.isPlaceholder
    //                             ? null
    //                             : flexRender(
    //                                   header.column.columnDef.header,
    //                                   header.getContext()
    //                               )}
    //                     </TableCell>
    //                 ))}
    //             </TableRow>
    //         ))}
    //     </TableHead>
    //     <TableBody>
    //         {getRowModel().rows.map((row) => (
    //             <TableRow key={row.id}>
    //                 {row.getVisibleCells().map((cell) => (
    //                     <TableCell key={cell.id}>
    //                         {flexRender(
    //                             cell.column.columnDef.cell,
    //                             cell.getContext()
    //                         )}
    //                     </TableCell>
    //                 ))}
    //             </TableRow>
    //         ))}
    //     </TableBody>
    // </MuiTable>
    // )
}

export default Table
