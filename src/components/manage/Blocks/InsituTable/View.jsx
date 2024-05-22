import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const defaultData = [
  {
    Name: 'Test data provider 1',
    Country: 'Romania',
    Website: 'https://google.com',
    Type: 'Institutional',
    'Requirement groups': ['Atmosphere', 'Cryosphere', 'Hidrology'],
  },
  {
    Name: 'Test data provider 2',
    Country: 'Romania',
    Website: 'https://yahoo.com',
    Type: 'Institutional',
    'Requirement groups': ['Atmosphere', 'Cryosphere'],
  },
  {
    Name: 'Test data provider 3',
    Country: 'France',
    Website: 'https://yahoo.com',
    Type: 'Bla bla',
    'Requirement groups': ['Atmosphere'],
  },
];

const LinkCell = (cell) => {
  return <a href={cell.getValue()}>{cell.getValue()}</a>;
};

const ListCell = ({ cell }) => {
  return (
    <>
      {cell.map((item) => (
        <>
          <span>{item}</span>
          <br />
        </>
      ))}
    </>
  );
};

const columns = [
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  {
    accessorKey: 'Country',
    header: 'Country',
  },
  {
    accessorKey: 'Website',
    header: 'Website',
    cell: LinkCell,
  },
  {
    accessorKey: 'Type',
    header: 'Type',
  },
  {
    accessorFn: (row) => row['Requirement groups'].join('|||'),
    accessorKey: 'Requirement groups',
    header: 'Requirement groups',
    cell: ({ cell }) => {
      console.log(cell.getValue());
      console.log(cell.getValue().split('|||'));
      return <ListCell cell={cell.getValue().split('|||')} />;
    },
  },
];

// cell: (info) => <a href={info.getValue()}>{info.getValue()}</a>,
// cell: (info) => (
//   <>
//     {info.getValue().map((item) => (
//       <>
//         <span>{item} ZZZZ</span>
//         <br />
//       </>
//     ))}
//   </>
// ),
const BasicTable = () => {
  const finalData = defaultData;
  const finalColumnDef = columns;

  const [filtering, setFiltering] = React.useState('');

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChanged: setFiltering,
  });

  //   console.log("test", tableInstance.getHeaderGroups());

  return (
    <>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <hr />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default function View(props) {
  return <BasicTable />;
}
