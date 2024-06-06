import { mergeConfig } from '@eeacms/search';
import { build_runtime_mappings } from '@eeacms/volto-globalsearch/utils';
import { getClientProxyAddress } from './utils';
import vocabs from './vocabulary';

import facets from './facets';

const insituConfig = {
  title: 'Insitu Main',
};

export const clusters = {
  name: 'op_cluster',
  field: 'objectProvides',
  clusters: [
    // {
    //   name: 'Type1',
    //   icon: { name: 'bullhorn' },
    //   values: ['Video', 'Guidance'],
    //   defaultResultView: 'horizontalCard',
    // },
  ],
};

export default function installMainSearch(config) {
  const envConfig = process.env.RAZZLE_ENV_CONFIG
    ? JSON.parse(process.env.RAZZLE_ENV_CONFIG)
    : insituConfig;

  const pjson = require('@eeacms/volto-insitu-policy/../package.json');

  envConfig.app_name = pjson.name;
  envConfig.app_version = pjson.version;

  config.searchui.insituSearch = {
    ...mergeConfig(envConfig, config.searchui.globalsearchbase),
    elastic_index: '_es/globalsearch',
    index_name: 'copernicus_searchui',
    host: process.env.RAZZLE_ES_PROXY_ADDR || 'http://localhost:3000',
    runtime_mappings: build_runtime_mappings(clusters),
    ...vocabs,
  };

  const { insituSearch } = config.searchui;

  insituSearch.permanentFilters.push({
    term: {
      cluster_name: 'insitu',
    },
  });

  insituSearch.permanentFilters.push({
    terms: {
      objectProvides: [
        // TODO update
        'News Item',
        'Event',
        'insitu.report',
      ],
    },
  });

  insituSearch.facets = facets;

  insituSearch.initialView.tilesLandingPageParams.sections = [
    {
      id: 'types',
      title: 'Types',
      facetField: 'objectProvides',
      sortOn: 'alpha',
      icon: {
        family: 'Content types',
      },
    },
  ];

  if (typeof window !== 'undefined') {
    config.searchui.insituSearch.host =
      process.env.RAZZLE_ES_PROXY_ADDR || getClientProxyAddress();
  }

  return config;
}
