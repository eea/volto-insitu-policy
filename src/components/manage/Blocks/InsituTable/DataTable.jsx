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
import SortButtons from './SortButtons';
import {
  simple_columns,
  network_columns,
  institution_columns,
} from './columns';

const DataProvidersTable = ({ dataProvider, tableType }) => {
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState([
    { id: 'countries', desc: false },
  ]);

  let defaultData;
  let columns;

  if (tableType === 'networks') {
    defaultData = dataProvider.network;
    columns = network_columns;
  } else if (tableType === 'national_institutions') {
    defaultData = dataProvider.simple.filter(
      (row) => row.countries.length === 1,
    );
    columns = institution_columns;
  } else if (tableType === 'all_organisations') {
    defaultData = dataProvider.simple;
    columns = simple_columns;
  }

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

  const toggleSorting = (columnId) => {
    setSorting((prevSorting) => {
      const currentSort = prevSorting.find((sort) => sort.id === columnId);
      if (!currentSort) {
        return [{ id: columnId, desc: false }];
      }
      if (!currentSort.desc) {
        return [{ id: columnId, desc: true }];
      }
      return [];
    });
  };

  const handleKeyDown = (event, columnId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleSorting(columnId);
    }
  };

  return (
    <>
      <SearchInput value={filtering} onChange={setFiltering} />
      <div
        style={{ overflowX: 'auto', maxWidth: '1120px' }}
        className="insitu-table"
      >
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.column.columnDef.width || 'auto' }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="header-cell">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleSorting(header.column.id)}
                          onKeyDown={(event) =>
                            handleKeyDown(event, header.column.id)
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
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
                  <td
                    key={cell.id}
                    style={{ width: cell.column.columnDef.width || 'auto' }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataProvidersTable;
