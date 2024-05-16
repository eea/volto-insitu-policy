import NavEdit from './Edit';
import NavView from './View';
import layoutSchema from './layoutSchema';
import { blockSchema } from './schema';
import { DefaultEdit, DefaultView } from './templates/default';
import {
  HorizontalResponsiveEdit,
  HorizontalResponsiveView,
} from './templates/horizontal-responsive';
import { defineMessages } from 'react-intl';
import worldSVG from '@plone/volto/icons/world.svg';

import { TabsWidget } from './widgets';

defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  horizontalResponsive: {
    defaultMessage: 'Horizontal responsive',
    id: 'Horizontal responsive',
  },
});

export default function installNavigationBlock(config) {
  config.blocks.blocksConfig.navBlock = {
    id: 'navBlock',
    title: 'Custom navigation block',
    icon: worldSVG,
    group: 'common',
    edit: NavEdit,
    view: NavView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasOwnFocusManagement: true,
    blockSchema: blockSchema,
    schema: layoutSchema(config),
    variations: [
      {
        id: 'default',
        title: 'Default',
        isDefault: true,
        edit: DefaultEdit,
        view: DefaultView,
        schemaEnhancer: DefaultEdit.schemaEnhancer,
      },
      {
        id: 'horizontal-responsive',
        title: 'Horizontal responsive',
        edit: HorizontalResponsiveEdit,
        view: HorizontalResponsiveView,
        schemaEnhancer: HorizontalResponsiveEdit.schemaEnhancer,
      },
    ],
  };

  config.widgets.type.tabs = TabsWidget;

  return config;
}
