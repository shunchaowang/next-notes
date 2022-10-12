import {
    HTMLProps,
    useState,
    useMemo,
    useReducer,
    useEffect,
    useRef,
} from "react"

import {
    Column,
    Table,
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table"
import { makeData, Person } from "./makeData"
import { BasicTable, IndeterminateCheckbox } from "../../components/BasicTable"

function App() {
    const rerender = useReducer(() => ({}), {})[1]

    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: "Name",
                footer: (props) => props.column.id,
                columns: [
                    {
                        accessorKey: "firstName",
                        header: ({ table }) => (
                            <>
                                <IndeterminateCheckbox
                                    {...{
                                        checked: table.getIsAllRowsSelected(),
                                        indeterminate:
                                            table.getIsSomeRowsSelected(),
                                        onChange:
                                            table.getToggleAllRowsSelectedHandler(),
                                    }}
                                />{" "}
                                <button
                                    {...{
                                        onClick:
                                            table.getToggleAllRowsExpandedHandler(),
                                    }}
                                >
                                    {table.getIsAllRowsExpanded() ? "👇" : "👉"}
                                </button>{" "}
                                First Name
                            </>
                        ),
                        cell: ({ row, getValue }) => (
                            <div
                                style={{
                                    // Since rows are flattened by default,
                                    // we can use the row.depth property
                                    // and paddingLeft to visually indicate the depth
                                    // of the row
                                    paddingLeft: `${row.depth * 2}rem`,
                                }}
                            >
                                <>
                                    <IndeterminateCheckbox
                                        {...{
                                            checked: row.getIsSelected(),
                                            indeterminate:
                                                row.getIsSomeSelected(),
                                            onChange:
                                                row.getToggleSelectedHandler(),
                                        }}
                                    />{" "}
                                    {row.getCanExpand() ? (
                                        <button
                                            {...{
                                                onClick:
                                                    row.getToggleExpandedHandler(),
                                                style: { cursor: "pointer" },
                                            }}
                                        >
                                            {row.getIsExpanded() ? "👇" : "👉"}
                                        </button>
                                    ) : (
                                        "🔵"
                                    )}{" "}
                                    {getValue()}
                                </>
                            </div>
                        ),
                        footer: (props) => props.column.id,
                    },
                    {
                        accessorFn: (row) => row.lastName,
                        id: "lastName",
                        cell: (info) => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: (props) => props.column.id,
                    },
                ],
            },
            {
                header: "Info",
                footer: (props) => props.column.id,
                columns: [
                    {
                        accessorKey: "age",
                        header: () => "Age",
                        footer: (props) => props.column.id,
                    },
                    {
                        header: "More Info",
                        columns: [
                            {
                                accessorKey: "visits",
                                header: () => <span>Visits</span>,
                                footer: (props) => props.column.id,
                            },
                            {
                                accessorKey: "status",
                                header: "Status",
                                footer: (props) => props.column.id,
                            },
                            {
                                accessorKey: "progress",
                                header: "Profile Progress",
                                footer: (props) => props.column.id,
                            },
                        ],
                    },
                ],
            },
        ],
        []
    )

    const [data, setData] = useState(() => makeData(100, 5, 3))
    const refreshData = () => setData(() => makeData(100, 5, 3))

    const [expanded, setExpanded] = useState<ExpandedState>({})

    const props = { data: data, columns: columns, header: "Persons" }

    return (
        <div className="p-2">
            <BasicTable {...props} />
            <div>
                <button onClick={() => rerender()}>Force Rerender</button>
            </div>
            <div>
                <button onClick={() => refreshData()}>Refresh Data</button>
            </div>
            <pre>{JSON.stringify(expanded, null, 2)}</pre>
        </div>
    )
}

export default App
