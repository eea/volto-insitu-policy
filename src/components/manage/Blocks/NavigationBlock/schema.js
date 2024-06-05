import { cloneDeepSchema } from '@plone/volto/helpers/Utils/Utils';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  AssetPosition: {
    defaultMessage: 'Asset position',
    id: 'assetPosition',
  },
  AssetSize: {
    defaultMessage: 'Asset size',
    id: 'assetSize',
  },
  AssetType: {
    defaultMessage: 'Asset',
    id: 'assetType',
  },
  Bottom: {
    defaultMessage: 'Bottom',
    id: 'bottom',
  },
  Default: {
    defaultMessage: 'Default',
    id: 'default',
  },
  Image: {
    defaultMessage: 'Image',
    id: 'image',
  },
  LeftSide: {
    id: 'left-side',
    defaultMessage: 'Left side',
  },
  RightSide: {
    id: 'right-side',
    defaultMessage: 'Right side',
  },
  Medium: {
    defaultMessage: 'Medium',
    id: 'Medium',
  },
  Middle: {
    defaultMessage: 'Middle',
    id: 'middle',
  },
  Small: {
    id: 'small',
    defaultMessage: 'Small',
  },
  NavItems: {
    defaultMessage: 'Navigation items',
    id: 'navItems',
  },
  NavBlock: {
    defaultMessage: 'Navigation block',
    id: 'navigation-block',
  },
  ItemTitle: {
    defaultMessage: 'Item title',
    id: 'itemTitle',
  },
  Top: {
    defaultMessage: 'Top',
    id: 'top',
  },
  VerticalAlign: {
    defaultMessage: 'Vertical align',
    id: 'vertical-align',
  },
  Item: {
    id: 'item',
    defaultMessage: 'item',
  },
  HideTitle: {
    id: 'hideTitle',
    defaultMessage: 'Hide item title?',
  },
  Large: {
    id: 'large',
    defaultMessage: 'Large',
  },
  linkToPage: {
    id: 'linkToPage',
    defaultMessage: 'Link to page',
  },
  isActive: {
    id: 'isActive',
    defaultMessage: 'Set as active page',
  },
});

const navItemSchema = (props) => {
  const intl = props.intl;
  return {
    title: intl.formatMessage(messages.Item),

    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.Default),
        fields: ['title', 'assetType', 'linkToPage', 'isActive'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.ItemTitle),
      },
      linkToPage: {
        title: 'Link page',
        widget: 'url',
      },
      assetType: {
        title: intl.formatMessage(messages.AssetType),
        choices: [['image', intl.formatMessage(messages.Image)]],
      },
      assetPosition: {
        title: intl.formatMessage(messages.AssetPosition),
        choices: [
          ['top', intl.formatMessage(messages.Top)],
          ['left', intl.formatMessage(messages.LeftSide)],
          ['right', intl.formatMessage(messages.RightSide)],
        ],
        default: 'top',
      },
      image: {
        title: intl.formatMessage(messages.Image),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
        selectedItemAttrs: ['image_field', 'image_scales'],
      },
      imageSize: {
        title: intl.formatMessage(messages.AssetSize),
        choices: [
          ['icon', intl.formatMessage(messages.Small)],
          ['tile', intl.formatMessage(messages.Medium)],
          ['thumb', intl.formatMessage(messages.Large)],
        ],
        default: 'icon',
      },
      isActive: {
        title: intl.formatMessage(messages.isActive),
        type: 'boolean',
        default: false,
      },
      hideTitle: {
        title: intl.formatMessage(messages.HideTitle),
        type: 'boolean',
      },
    },

    required: [],
  };
};
const toggleIconField = (schema, child) => {
  const cloned = cloneDeepSchema(schema);

  cloned.fieldsets[0].fields = [
    ...cloned.fieldsets[0].fields,
    ...(child.assetType === 'image'
      ? ['image', 'imageSize', 'assetPosition', 'hideTitle']
      : []),
  ];

  return cloned;
};

export const blockSchema = (props) => {
  const intl = props.intl;
  return {
    title: intl.formatMessage(messages.NavBlock),
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.Default),
        fields: ['verticalAlign', 'data'],
      },
    ],
    properties: {
      data: {
        title: intl.formatMessage(messages.NavItems),
        type: 'tabs',
        schema: navItemSchema(props),
        schemaExtender: toggleIconField,
      },
      verticalAlign: {
        title: intl.formatMessage(messages.VerticalAlign),
        choices: [
          ['flex-start', intl.formatMessage(messages.Top)],
          ['center', intl.formatMessage(messages.Middle)],
          ['flex-end', intl.formatMessage(messages.Bottom)],
        ],
        default: 'flex-start',
      },
    },
    required: [],
  };
};
