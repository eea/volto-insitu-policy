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
// import eeaLogoWhite from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/eea-logo-white.svg';
import eeaLogoWhiteBy from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/eea-logo-white-by.svg';
import ReportsCardTemplate from '@eeacms/volto-insitu-policy/components/Blocks/Listing/item-templates/ReportsCardTemplate';
import {
  setCardModelSchema,
  setCardStylingSchema,
} from '@eeacms/volto-insitu-policy/components/Blocks/Listing/item-templates/schema';
import { composeSchema } from '@eeacms/volto-listing-block/schema-utils';

const applyConfig = (config) => {
  //Routes
  config.addonRoutes = [
    {
      path: '/sitemap',
      component: Sitemap,
    },
  ];

  config.settings.eea.headerOpts.partnerLinks.title = 'Copernicus Services';

  //EEA customizations
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
        link: 'https://www.eea.europa.eu/',
        src: athmosphere,
        alt: 'EEA',
        title: 'Atmosphere',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: marine,
        alt: 'EEA',
        title: 'Marine',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: land,
        alt: 'EEA',
        title: 'Land',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: security,
        alt: 'EEA',
        title: 'Security',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: climateChange,
        alt: 'EEA',
        title: 'Climate Change',
      },
      {
        link: 'https://www.eea.europa.eu/',
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
    ],
  };

  return config;
};

export default applyConfig;
