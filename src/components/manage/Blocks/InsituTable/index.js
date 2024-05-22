import tableSVG from '@plone/volto/icons/table.svg';
import Edit from './Edit';
import View from './View';

export default function installInsituTable(config) {
  const blocksConfig = config.blocks.blocksConfig;

  blocksConfig.insituTable = {
    id: 'insituTable',
    title: 'InSitu Table',
    icon: tableSVG,
    group: 'data_visualizations',
    view: View,
    edit: Edit,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    variations: [],
    restricted: false,
  };

  return config;
}
