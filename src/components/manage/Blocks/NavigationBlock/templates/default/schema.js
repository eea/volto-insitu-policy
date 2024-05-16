import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Default: {
    id: 'default',
    defaultMessage: 'Default',
  },
  Menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
  Position: {
    id: 'position',
    defaultMessage: 'Position',
  },
  Top: {
    id: 'top',
    defaultMessage: 'Top',
  },
  Bottom: {
    id: 'bottom',
    defaultMessage: 'Bottom',
  },
  LeftSide: {
    id: 'left-side',
    defaultMessage: 'Left side',
  },
  RightSide: {
    id: 'right-side',
    defaultMessage: 'Right side',
  },
  Alignment: {
    id: 'alignment',
    defaultMessage: 'Alignment',
  },
  Left: {
    id: 'left',
    defaultMessage: 'Left',
  },
  Center: {
    id: 'center',
    defaultMessage: 'Center',
  },
  Right: {
    id: 'right',
    defaultMessage: 'Right',
  },
  SpaceBetween: {
    id: 'space-between',
    defaultMessage: 'Space between',
  },
});

export const defaultSchemaEnhancer = ({ schema, intl }) => {
  schema.fieldsets.splice(1, 0, {
    id: 'menu',
    title: intl.formatMessage(messages.Menu),
    fields: ['menuAlign', 'menuPosition'],
  });
  schema.properties = {
    ...schema.properties,
    menuPosition: {
      title: intl.formatMessage(messages.Position),
      choices: [
        ['top', intl.formatMessage(messages.Top)],
        ['bottom', intl.formatMessage(messages.Bottom)],
        ['left side', intl.formatMessage(messages.LeftSide)],
        ['right side', intl.formatMessage(messages.RightSide)],
      ],
    },
    menuAlign: {
      title: intl.formatMessage(messages.Alignment),
      choices: [
        ['left', intl.formatMessage(messages.Left)],
        ['center', intl.formatMessage(messages.Center)],
        ['right', intl.formatMessage(messages.Right)],
        ['space-between', intl.formatMessage(messages.SpaceBetween)],
      ],
    },
  };
  return schema;
};
