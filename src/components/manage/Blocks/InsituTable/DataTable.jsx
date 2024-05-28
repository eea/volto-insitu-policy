import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import './styles.less';
import SearchInput from './SearchInput';
import SortButtons from './SortButtons'; // Import the SortButtons component
import { simple_columns, network_columns } from './columns'; // Import columns

const DataProvidersTable = ({ is_network, dataProvider }) => {
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState([]);

  const { defaultData, columns } = is_network
    ? { defaultData: dataProvider.network, columns: network_columns }
    : { defaultData: dataProvider.simple, columns: simple_columns };

  const table = useReactTable({
    columns,
    data: defaultData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  const handleSort = (columnId, direction) => {
    setSorting([{ id: columnId, desc: direction === 'desc' }]);
  };

  return (
    <>
      <SearchInput value={filtering} onChange={setFiltering} />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className="header-cell">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <SortButtons
                          columnId={header.column.id}
                          handleSort={handleSort}
                          currentSorting={sorting}
                        />
                      )}
                    </div>
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataProvidersTable;
