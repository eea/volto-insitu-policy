import { Sitemap } from '@plone/volto/components';
import athmosphere from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/athmosphere.svg';
import marine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/marine.svg';
import land from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/land.svg';
import security from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/security.svg';
import climateChange from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/climate-change.svg';
import emergency from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/emergency.svg';
import copernicusLogoWhite from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Header/copernicus_eu_logo_white.svg';
import eeaLogoWhite from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/Footer/eea-logo-white.svg';

const applyConfig = (config) => {
  config.addonRoutes = [
    {
      path: '/sitemap',
      component: Sitemap,
    },
  ];

  config.settings.eea.footerOpts.managedBy = [
    {
      url: 'https://www.copernicus.eu/en',
      src: copernicusLogoWhite,
      alt: 'Copernicus Logo',
      className: 'site logo',
      columnSize: {
        mobile: 6,
        tablet: 12,
        computer: 5,
      },
    },
    {
      url: 'https://www.eea.europa.eu/',
      src: eeaLogoWhite,
      alt: 'Copernicus Logo',
      className: 'site logo',
      columnSize: {
        mobile: 6,
        tablet: 12,
        computer: 5,
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
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: marine,
        alt: 'EEA',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: land,
        alt: 'EEA',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: security,
        alt: 'EEA',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: climateChange,
        alt: 'EEA',
      },
      {
        link: 'https://www.eea.europa.eu/',
        src: emergency,
        alt: 'EEA',
      },
    ],
  };

  return config;
};

export default applyConfig;
