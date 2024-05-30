import {
  removeSpecialCharsSortingFn,
  fnMembersList,
  LinkCell,
  ListCell,
  LinksList,
  ProviderNameCell,
  fnName,
} from './utils';

const simple_columns = [
  {
    accessorFn: fnName,
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ProviderNameCell,
    sortingFn: removeSpecialCharsSortingFn,
    width: 300,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
    width: 250,
    sortingFn: 'alphanumeric', // Example of a default sorting function
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: ListCell,
    width: 200,
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'provider_type',
    header: 'Type',
    width: 150,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: (row) => row['requirement_groups'].join('|||'),
    id: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
    width: 200,
    sortingFn: 'alphanumeric',
  },
];

const network_columns = [
  {
    accessorFn: fnName,
    id: 'name',
    header: 'Name',
    cell: ProviderNameCell,
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

export { simple_columns, network_columns };
