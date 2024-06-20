import { Sitemap } from '@plone/volto/components';
import copernicusLogo from '@eeacms/volto-insitu-policy/../theme/assets/images/Header/copernicus_eu_logo.svg';
import insituLogo from '@eeacms/volto-insitu-policy/../theme/assets/images/Header/in_situ_logo.svg';
import athmosphere from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/athmosphere.svg';
import marine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/marine.svg';
import land from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/land.svg';
import security from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/security.svg';
import climateChange from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/climate-change.svg';
import emergency from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/emergency.svg';
import copernicusLogoWhite from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Header/copernicus_eu_logo_white.svg';
import eeaLogoWhiteBy from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/eea-logo-white-by.svg';
import ReportsCardTemplate from '@eeacms/volto-insitu-policy/components/manage/Blocks/Listing/item-templates/ReportsCardTemplate';
import ListingReportsTemplate from '@eeacms/volto-insitu-policy/components/manage/Blocks/Listing/item-templates/ListingReportsTemplate';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

import {
  setCardModelSchema,
  setCardStylingSchema,
} from '@eeacms/volto-insitu-policy/components/manage/Blocks/Listing/item-templates/schema';
import { composeSchema } from '@eeacms/volto-listing-block/schema-utils';
import NewsItemView from './components/theme/Views/NewsItemView';
import InsituReportView from './components/theme/Views/InsituReportView';
import DataProviderListWidget from './components/theme/Widgets/DataProviderListWidget';
import installNavigationBlock from './components/manage/Blocks/NavigationBlock/index';
import installInsituTable from './components/manage/Blocks/InsituTable';

import installSearchEngine from './search';

const applyConfig = (config) => {
  //Routes
  config.addonRoutes = [
    {
      path: '/sitemap',
      component: Sitemap,
    },
  ];
  config.settings.eea.headerSearchBox[0] = {
    ...config.settings.eea.headerSearchBox[0],
    searchSuggestions: '',
    description:
      'Looking for more information? Try searching the full EEA website content',
    path: '/advanced-search',
    placeholder: 'Search InSitu...',
    buttonUrl: 'https://www.eea.europa.eu/en/advanced-search',
  };

  //In situ customizations

  config.settings.eea.headerOpts.partnerLinks.title = 'Copernicus Services';
  config.settings.eea.headerOpts.partnerLinks.links = [
    {
      title: 'Copernicus Atmosphere',
      href: 'https://atmosphere.copernicus.eu/',
    },
    { title: 'Copernicus Marine', href: 'https://marine.copernicus.eu/' },
    { title: 'Copernicus Land', href: 'https://land.copernicus.eu/' },
    {
      title: 'Copernicus Security',
      href: 'https://www.copernicus.eu/en/copernicus-services/security',
    },
    {
      title: 'Copernicus Climate Change',
      href: 'https://climate.copernicus.eu/',
    },
    { title: 'Copernicus Emergency', href: 'https://emergency.copernicus.eu/' },
    {
      title: 'Copernicus Space Component',
      href: 'https://www.copernicus.eu/en/about-copernicus/infrastructure-overview',
    },
  ];

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    'News Item': NewsItemView,
    'insitu.report': InsituReportView,
  };

  config.settings.eea = {
    ...(config.settings.eea || {}),
    headerOpts: {
      ...(config.settings.eea?.headerOpts || {}),
      logo: [copernicusLogo, insituLogo],
    },
    logoTargetUrl: ['https://www.copernicus.eu/en', '/'],
  };

  config.settings.eea.footerOpts.managedBy = [
    {
      url: 'https://www.copernicus.eu/en',
      src: copernicusLogoWhite,
      alt: 'Copernicus Logo',
      className: 'site logo copernicus',
      columnSize: {
        mobile: 6,
        tablet: 6,
        computer: 6,
      },
    },
    {
      url: 'https://www.eea.europa.eu/',
      src: eeaLogoWhiteBy,
      alt: 'Copernicus Logo',
      className: 'site logo eea',
      columnSize: {
        mobile: 6,
        tablet: 6,
        computer: 6,
      },
    },
  ];

  config.settings.eea.footerOpts = {
    ...config.settings.eea.footerOpts,
    sites: [
      {
        link: 'https://atmosphere.copernicus.eu/',
        src: athmosphere,
        alt: 'EEA',
        title: 'Atmosphere',
      },
      {
        link: 'https://marine.copernicus.eu/',
        src: marine,
        alt: 'EEA',
        title: 'Marine',
      },
      {
        link: 'https://land.copernicus.eu/en',
        src: land,
        alt: 'EEA',
        title: 'Land',
      },
      {
        link: 'https://www.copernicus.eu/en/copernicus-services/security',
        src: security,
        alt: 'EEA',
        title: 'Security',
      },
      {
        link: 'https://climate.copernicus.eu/',
        src: climateChange,
        alt: 'EEA',
        title: 'Climate Change',
      },
      {
        link: 'https://emergency.copernicus.eu/',
        src: emergency,
        alt: 'EEA',
        title: 'Emergency',
      },
    ],
  };

  config.blocks.blocksConfig.listing.extensions = {
    ...config.blocks.blocksConfig.listing.extensions,
    cardTemplates: [
      ...config.blocks.blocksConfig.listing.extensions.cardTemplates,
      {
        id: 'reports-card',
        isDefault: false,
        title: 'Reports Card',
        template: ReportsCardTemplate,
        schemaEnhancer: composeSchema(setCardModelSchema, setCardStylingSchema),
      },
      {
        id: 'listing-reports',
        isDefault: false,
        title: 'Listing Reports',
        template: ListingReportsTemplate,
        schemaEnhancer: composeSchema(setCardModelSchema, setCardStylingSchema),
      },
    ],
  };

  config.widgets.id.copernicus_components = TokenWidget;
  config.widgets.views.id.data_providers_list = DataProviderListWidget;
  config.widgets.id.copernicus_themes = TokenWidget;

  const final = [
    installNavigationBlock,
    installInsituTable,
    installSearchEngine,
  ].reduce((acc, apply) => apply(acc), config);

  return final;
};

export default applyConfig;
