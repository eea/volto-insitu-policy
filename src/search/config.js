import { mergeConfig } from '@eeacms/search';
import { build_runtime_mappings } from '@eeacms/volto-globalsearch/utils';
import { getClientProxyAddress, getSearchThumbUrl } from './utils';
import vocabs from './vocabulary';
import facets from './facets';

const insituConfig = {
  title: 'Insitu Main',
};

export const clusters = {
  name: 'op_cluster',
  field: 'objectProvides',
  clusters: [
    {
      name: 'News',
      values: ['News'],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Use Cases',
      values: ['insitu.use_case'],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Reports',
      values: ['insitu.report'],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Others',
      values: ['Webpage', 'Dashboard', 'Event', 'Link'],
      defaultResultView: 'horizontalCard',
    },
  ],
};

export default function install(config) {
  const envConfig = process.env.RAZZLE_ENV_CONFIG
    ? JSON.parse(process.env.RAZZLE_ENV_CONFIG)
    : insituConfig;

  const pjson = require('@eeacms/volto-insitu-policy/../package.json');

  envConfig.app_name = pjson.name;
  envConfig.app_version = pjson.version;

  config.searchui.insituSearch = {
    ...mergeConfig(envConfig, config.searchui.globalsearchbase),
    elastic_index: '_es/insituSearch',
    index_name: 'copernicus_searchui',
    host: process.env.RAZZLE_ES_PROXY_ADDR || 'http://localhost:3000',
    runtime_mappings: build_runtime_mappings(clusters),
    ...vocabs,
  };

  const { insituSearch } = config.searchui;

  insituSearch.permanentFilters.push({
    term: {
      cluster_name: 'copernicus_insitu',
    },
  });

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

  insituSearch.facets = facets;

  insituSearch.contentSectionsParams = {
    enable: true,
    sectionFacetsField: 'op_cluster',
    sections: clusters.clusters,
    clusterMapping: Object.assign(
      {},
      ...clusters.clusters.map(({ name, values }) =>
        Object.assign({}, ...values.map((v) => ({ [v]: name }))),
      ),
    ),
  };

  insituSearch.resultItemModel = {
    factory: 'ResultModel',
    urlField: 'about',
    titleField: 'title',
    metatypeField: 'objectProvides',
    descriptionField: 'description',
    tagsField: 'topic',
    issuedField: 'issued',
    getThumbnailUrl: 'getSearchThumbUrl',
    getIconUrl: 'getGlobalsearchIconUrl',
    fallbackThumbUrl:
      'https://react.semantic-ui.com/images/wireframe/white-image.png',
  };

  config.resolve.getSearchThumbUrl = getSearchThumbUrl();

  if (typeof window !== 'undefined') {
    config.searchui.insituSearch.host =
      process.env.RAZZLE_ES_PROXY_ADDR || getClientProxyAddress();
  }

  return config;
}
