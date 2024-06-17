import globalSearchBaseConfig from '@eeacms/volto-globalsearch/config/global-search-base-config.js';

export const copernicus_components = {
  field: 'taxonomy_copernicus_components.keyword',
  factory: 'MultiTermFacet',
  label: 'Copernicus components',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

export const copernicus_services = {
  field: 'copernicus_services.keyword',
  factory: 'MultiTermFacet',
  label: 'Copernicus services',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

export const copernicus_themes = {
  field: 'taxonomy_copernicus_themes.keyword',
  factory: 'MultiTermFacet',
  label: 'Copernicus themes',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

export const data_providers = {
  field: 'data_providers_list.keyword',
  factory: 'MultiTermFacet',
  label: 'Data providers',
  showInFacetsList: true,
  filterType: 'any',
  isFilterable: false,
  show: 10000,
  isMulti: true,
};

const facets = [
  copernicus_components,
  copernicus_themes,
  copernicus_services,
  data_providers,
  ...globalSearchBaseConfig.facets,
];

export default facets;
