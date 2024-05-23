import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import './styles.less';
import { useSelector } from 'react-redux';

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
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    accessorKey: 'countries',
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
    accessorKey: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
  },
];

const network_columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    accessorKey: 'countries',
    header: 'Countries',
    cell: ListCell,
  },
  {
    accessorFn: (row) => fnMembersList(row),
    accessorKey: 'members',
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
    accessorKey: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
  },
];

const DataProvidersTable = (props) => {
  const { is_network } = props;
  const [filtering, setFiltering] = React.useState('');

  const content = useSelector((state) => state.content);
  const data_providers_table =
    content.data?.['@components']?.data_providers_table;

  let defaultData = '';
  let columns = '';
  if (is_network) {
    defaultData = data_providers_table.network;
    columns = network_columns;
  } else {
    defaultData = data_providers_table.simple;
    columns = simple_columns;
  }

  const tableInstance = useReactTable({
    columns,
    data: defaultData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChanged: setFiltering,
  });

  return (
    <>
      <div className="search-container">
        <div className="search-icon-container">
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
          {/* <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 36 36"
            >
              <path
                fill-rule="evenodd"
                d="M7,16 C7,11.038 11.037,7 16,7 C20.963,7 25,11.038 25,16 C25,20.962 20.963,25 16,25 C11.037,25 7,20.962 7,16 L7,16 Z M32.707,31.293 L24.448,23.034 C26.039,21.125 27,18.673 27,16 C27,9.935 22.065,5 16,5 C9.935,5 5,9.935 5,16 C5,22.065 9.935,27 16,27 C18.673,27 21.125,26.039 23.034,24.448 L31.293,32.707 L32.707,31.293 Z"
              />
            </svg>
          </div> */}
        </div>
      </div>
      <hr />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
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
  const { data } = props;
  const is_network = data.network;
  return <DataProvidersTable is_network={is_network} />;
};

export default View;
