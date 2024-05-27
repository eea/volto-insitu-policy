import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import './styles.less';
import { useSelector } from 'react-redux';

// Custom sorting function to remove special characters before sorting
const removeSpecialCharsSortingFn = (rowA, rowB, columnId) => {
  const getCleanedValue = (row) =>
    row.original[columnId].replace(/[^\w\s]/gi, '');
  const a = getCleanedValue(rowA);
  const b = getCleanedValue(rowB);
  return a.localeCompare(b);
};

const LinkCell = ({ cell }) => {
  return <a href={cell.getValue()}>{cell.getValue()}</a>;
};

const ListCell = ({ cell }) => {
  return (
    <>
      {cell
        .getValue()
        .split('|||')
        .map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <br />
          </React.Fragment>
        ))}
    </>
  );
};

const fnMembersList = (row) => {
  return JSON.stringify(row['members']);
};

const LinksList = ({ cell }) => {
  return (
    <>
      {JSON.parse(cell.getValue()).map((item, index) => (
        <React.Fragment key={index}>
          <a href={item.link}>{item.name}</a>
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

const simple_columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: removeSpecialCharsSortingFn, // Apply custom sorting function
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: ListCell,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
  },
  {
    accessorKey: 'provider_type',
    header: 'Type',
  },
  {
    accessorFn: (row) => row['requirement_groups'].join('|||'),
    id: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
  },
];

const network_columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: removeSpecialCharsSortingFn, // Apply custom sorting function
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: ListCell,
  },
  {
    accessorFn: (row) => fnMembersList(row),
    id: 'members',
    header: 'Members',
    cell: LinksList,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
  },
  {
    accessorKey: 'provider_type',
    header: 'Type',
  },
  {
    accessorFn: (row) => row['requirement_groups'].join('|||'),
    id: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
  },
];

const DataProvidersTable = (props) => {
  const { is_network, dataProvider } = props;
  const [filtering, setFiltering] = React.useState('');
  const [sorting, setSorting] = React.useState([]);

  let defaultData = '';
  let columns = '';
  if (is_network) {
    defaultData = dataProvider.network;
    columns = network_columns;
  } else {
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

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Start typing to filter by any column value"
          className="search-input"
        />
        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 36 36"
          >
            <path
              fillRule="evenodd"
              d="M7,16 C7,11.038 11.037,7 16,7 C20.963,7 25,11.038 25,16 C25,20.962 20.963,25 16,25 C11.037,25 7,20.962 7,16 L7,16 Z M32.707,31.293 L24.448,23.034 C26.039,21.125 27,18.673 27,16 C27,9.935 22.065,5 16,5 C9.935,5 5,9.935 5,16 C5,22.065 9.935,27 16,27 C18.673,27 21.125,26.039 23.034,24.448 L31.293,32.707 L32.707,31.293 Z"
              fill="none"
              stroke="#783f34"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
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
                        <div className="sort-buttons">
                          <button
                            onClick={() => handleSort(header.column.id, 'asc')}
                            aria-label={`Sort ${header.column.id} ascending`}
                          >
                            <span role="img" aria-label="sort ascending">
                              🔼
                            </span>
                          </button>
                          <button
                            onClick={() => handleSort(header.column.id, 'desc')}
                            aria-label={`Sort ${header.column.id} descending`}
                          >
                            <span role="img" aria-label="sort descending">
                              🔽
                            </span>
                          </button>
                        </div>
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

const View = (props) => {
  const content = useSelector((state) => state.content);
  const data_providers_table =
    content.data?.['@components']?.data_providers_table;
  const { data } = props;
  const is_network = data.network;
  return data_providers_table ? (
    <DataProvidersTable
      is_network={is_network}
      dataProvider={data_providers_table}
    />
  ) : (
    'Please enable interface data_providers'
  );
};

export default View;
