import { Sitemap } from '@plone/volto/components';
import copernicusLogo from '@eeacms/volto-insitu-policy/../theme/assets/images/Header/copernicus_eu_logo.svg';
import insituLogo from '@eeacms/volto-insitu-policy/../theme/assets/images/Header/in_situ_logo.svg';

const applyConfig = (config) => {
  //EEA customizations
  config.settings.eea = {
    ...(config.settings.eea || {}),
    headerOpts: {
      ...(config.settings.eea?.headerOpts || {}),
      logo: [copernicusLogo, insituLogo],
    },
  };

  //Routes
  config.addonRoutes = [
    {
      path: '/sitemap',
      component: Sitemap,
    },
  ];
  return config;
};

export default applyConfig;
