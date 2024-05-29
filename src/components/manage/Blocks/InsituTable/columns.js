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
    // accessorFn: (row) => row.name.title,
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
