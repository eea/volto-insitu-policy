import { booleanFacet } from '@eeacms/search';
import { getTodayWithTime } from './utils';

export const include_archived = booleanFacet(() => ({
  field: 'IncludeArchived',
  label: 'Include archived content',
  id: 'archived-facet',
  showInFacetsList: false,
  showInSecondaryFacetsList: true,
  isFilter: true, // filters don't need facet options to show up

  // we want this to be applied by default
  // when the facet is checked, then apply the `on` key:
  off: {
    constant_score: {
      filter: {
        bool: {
          should: [
            { bool: { must_not: { exists: { field: 'expires' } } } },
            // Functions should be supported in the buildFilters
            { range: { expires: { gte: getTodayWithTime() } } },
          ],
        },
      },
    },
  },
  on: null,
}));

export const objectProvides = {
  field: 'objectProvides',
  factory: 'MultiTermFacet',
  label: 'Type of item',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
  iconsFamily: 'Content types',
  optionsFilter: 'typesForClustersOptionsFilter',
};

export const issued_date = {
  field: 'issued.date',
  factory: 'DropdownRangeFilter',
  wrapper: 'DummySUIFacetWrapper',
  label: ' ',
  showInFacetsList: false,
  filterType: 'any',
  isFilterable: false,
  activeFilterLabel: 'Published',
  isFilter: true,
  showInSecondaryFacetsList: true,
  isMulti: false,
  ignoreFromNlp: true,
  ranges: [
    {
      key: 'All time',
    },
    {
      key: 'Last week',
      from: 'now-1w',
      to: 'now',
    },
    {
      key: 'Last month',
      from: 'now-1m',
      to: 'now',
    },
    {
      key: 'Last 3 months',
      from: 'now-3m',
      to: 'now',
    },
    {
      key: 'Last year',
      from: 'now-1y',
      to: 'now',
    },
    {
      key: 'Last 2 years',
      from: 'now-2y',
      to: 'now',
    },
    {
      key: 'Last 5 years',
      from: 'now-5y',
      to: 'now',
    },
  ],
  default: {
    values: ['All time'],
    type: 'any',
  },
};

const facets = [
  include_archived,
  // clusters,
  objectProvides,
  issued_date,
];

export default facets;
