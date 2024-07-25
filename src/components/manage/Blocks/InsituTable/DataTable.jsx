import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState(
    tableType === 'national_institutions'
      ? [{ id: 'countries', desc: false }]
      : [],
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  let defaultData;
  let columns;

  if (tableType === 'networks') {
    defaultData = dataProvider.network;
    columns = network_columns;
  } else if (tableType === 'national_institutions') {
    defaultData = dataProvider.simple.filter(
      (row) =>
        row.countries.length === 1 &&
        row.countries[0] !== 'Multiple Countries /Not a specific country',
    );
    columns = institution_columns;
  } else if (tableType === 'all_organisations') {
    defaultData = dataProvider.simple;
    columns = simple_columns;
  }

  // useEffect(() => {
  //   if (
  //     tableType === 'national_institutions' ||
  //     tableType === 'all_organisations'
  //   ) {
  //     setSorting([{ id: 'countries', desc: false }]);
  //   }
  // }, [tableType]);

  // const sortedData = useMemo(() => {
  //   if (sorting.length === 0) return defaultData;
  //   const sorted = [...defaultData].sort((a, b) => {
  //     const colId = sorting[0].id;
  //     const aValue = a[colId] ? a[colId][0] : '';
  //     const bValue = b[colId] ? b[colId][0] : '';
  //     if (aValue < bValue) return sorting[0].desc ? 1 : -1;
  //     if (aValue > bValue) return sorting[0].desc ? -1 : 1;
  //     return 0;
  //   });
  //   return sorted;
  // }, [defaultData, sorting]);

  // const paginatedData = useMemo(() => {
  //   const start = pageIndex * pageSize;
  //   const end = start + pageSize;
  //   return sortedData.slice(start, end);
  // }, [sortedData, pageIndex, pageSize]);

  const table = useReactTable({
    columns,
    data: defaultData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      globalFilter: filtering,
      sorting,
      pagination,
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

  // const handleNextPage = () => {
  //   setPageIndex((prev) =>
  //     Math.min(prev + 1, Math.ceil(defaultData.length / pageSize) - 1),
  //   );
  // };

  // const handlePreviousPage = () => {
  //   setPageIndex((prev) => Math.max(prev - 1, 0));
  // };

  // const handleFirstPage = () => {
  //   setPageIndex(0);
  // };

  // const handleLastPage = () => {
  //   setPageIndex(Math.ceil(defaultData.length / pageSize) - 1);
  // };

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
        <div className="pagination-controls">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DataProvidersTable;
