import {
  removeSpecialCharsSortingFn,
  LinkCell,
  ListCell,
  ListCellMembers,
  ProviderNameCell,
  countriesCell,
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
    width: 200,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: countriesCell,
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

const institution_columns = [
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Country',
    cell: countriesCell,
    width: 200,
    sortingFn: 'alphanumeric',
  },
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
    accessorKey: 'name',
    header: 'Name',
    cell: ProviderNameCell,
    sortingFn: removeSpecialCharsSortingFn,
    width: 250,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
    sortingFn: 'alphanumeric',
    width: 200,
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: countriesCell,
    width: 200,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: (row) => JSON.stringify(row['members']),
    id: 'members',
    accessorKey: 'members',
    header: 'Members',
    cell: ListCellMembers,
    sortingFn: 'alphanumeric',
    width: 250,
  },
  {
    accessorFn: (row) => row['requirement_groups'].join('|||'),
    id: 'requirement_groups',
    header: 'Requirement groups',
    cell: ListCell,
    sortingFn: 'alphanumeric',
    width: 240,
  },
];

export { simple_columns, network_columns, institution_columns };
