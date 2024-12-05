import {
  removeSpecialCharsSortingFn,
  LinkCell,
  ServicesComponentsCell,
  ListCellMembers,
  ProviderNameNativeNameCell,
  ProviderNameAcronymCell,
  countriesCell,
  fnName,
  fnServices,
} from './utils';

// Copernicus Participating Countries data providers - National Institutions
const national_institutions_columns = [
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Country',
    cell: countriesCell,
    width: 120,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: fnName,
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ProviderNameNativeNameCell,
    sortingFn: removeSpecialCharsSortingFn,
    width: 230,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
    width: 120,
    enableSorting: false,
    disableSortBy: true,
  },
  {
    accessorKey: 'provider_type',
    header: 'Type',
    width: 80,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: fnServices,
    id: 'services',
    header: 'Services/Components',
    cell: ServicesComponentsCell,
    width: 150,
    sortingFn: 'alphanumeric',
  },
];

// Data Provider Networks - Networks
const networks_columns = [
  {
    accessorFn: fnName,
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ProviderNameAcronymCell,
    sortingFn: removeSpecialCharsSortingFn,
    width: 180,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
    enableSorting: false,
    disableSortBy: true,
    width: 120,
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: countriesCell,
    width: 150,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: (row) => JSON.stringify(row['members']),
    id: 'members',
    accessorKey: 'members',
    header: 'Members',
    cell: ListCellMembers,
    sortingFn: 'alphanumeric',
    width: 220,
  },
  {
    accessorFn: fnServices,
    id: 'services',
    header: 'Services/Components',
    cell: ServicesComponentsCell,
    width: 150,
    sortingFn: 'alphanumeric',
  },
];

// All Data Providers - All Organisations
const all_organisations_columns = [
  {
    accessorFn: fnName,
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ProviderNameNativeNameCell,
    sortingFn: removeSpecialCharsSortingFn,
    width: 250,
  },
  {
    accessorKey: 'link',
    header: 'Website',
    cell: LinkCell,
    width: 100,
    enableSorting: false,
    disableSortBy: true,
  },
  {
    accessorFn: (row) => row['countries'].join('|||'),
    id: 'countries',
    header: 'Countries',
    cell: countriesCell,
    width: 150,
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'provider_type',
    header: 'Type',
    width: 100,
    sortingFn: 'alphanumeric',
  },
  {
    accessorFn: fnServices,
    id: 'services',
    header: 'Services/Components',
    cell: ServicesComponentsCell,
    width: 150,
    sortingFn: 'alphanumeric',
  },
];

export {
  national_institutions_columns,
  networks_columns,
  all_organisations_columns,
};
