import { Sitemap } from '@plone/volto/components';

const applyConfig = (config) => {
  config.addonRoutes = [
    {
      path: `/(${config.settings?.supportedLanguages.join('|')})/sitemap`,
      component: Sitemap,
    },
  ];
  return config;
};

export default applyConfig;
