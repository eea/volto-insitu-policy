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
  national_institutions_columns,
  networks_columns,
  all_organisations_columns,
} from './columns';
import { whiteListCountries } from './utils';

const DataProvidersTable = ({ dataProvider, tableType }) => {
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState(
    tableType === 'national_institutions'
      ? [{ id: 'countries', desc: false }]
      : [],
  );
  let defaultData;
  let columns;

  if (tableType === 'networks') {
    defaultData = dataProvider.network;
    columns = networks_columns;
  } else if (tableType === 'national_institutions') {
    defaultData = dataProvider.simple.filter(
      (row) =>
        row.countries.length === 1 &&
        row.countries[0] !== 'Multiple Countries /Not a specific country' &&
        whiteListCountries.includes(row.countries[0]),
    );
    columns = national_institutions_columns;
  } else if (tableType === 'all_organisations') {
    defaultData = dataProvider.simple;
    columns = all_organisations_columns;
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
    if (columnId === 'link') {
      // Disabled sorting for Website column
      return;
    }

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
  const getClass = (column) => {
    if (column === 'link') {
      return 'no-sort-column';
    }
    return 'sort-column';
  };

  const isEditDefaultMode = (table) => {
    // Don't crash when adding the block in the page.
    try {
      const headerGroups = table?.getHeaderGroups();
      headerGroups.map((item) => {
        return item;
      });
      return false;
    } catch (error) {
      return true;
    }
  };

  if (isEditDefaultMode(table)) {
    return <div>Table placeholder</div>;
  }

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
                          className={getClass(header.column.id)}
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
