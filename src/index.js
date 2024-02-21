import { Sitemap } from '@plone/volto/components';

const applyConfig = (config) => {
  config.addonRoutes = [
    {
      path: '/sitemap',
      component: Sitemap,
    },
  ];
  return config;
};

export default applyConfig;
