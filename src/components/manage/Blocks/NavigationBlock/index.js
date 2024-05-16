import worldSVG from '@plone/volto/icons/world.svg';
import NavEdit from './Edit';
import NavView from './View';
// import { blockSchema } from './schema';

export default function installNavigationBlock(config) {
  config.blocks.blocksConfig.navBlock = {
    id: 'navBlock',
    title: 'Custom Navigation Menu Block',
    icon: worldSVG,
    group: 'common',
    view: NavView,
    edit: NavEdit,
    // schema: blockSchema,
  };

  return config;
}
