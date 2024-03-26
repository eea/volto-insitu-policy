import messages from '@eeacms/volto-listing-block/messages';
import config from '@plone/volto/registry';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';

const ALIGN_INFO_MAP = {
  left: [alignLeftSVG, 'Left'],
  center: [alignCenterSVG, 'Center'],
};

export const setCardModelSchema = (args) => {
  const { formData, schema } = args;

  const itemModelSchema = schema.properties.itemModel.schema;
  itemModelSchema.fieldsets[0].fields = [
    ...itemModelSchema.fieldsets[0].fields,
    'hasLink',
    'maxTitle',
    'hasDate',
    'hasEventDate',
    'hasDescription',
    ...(formData?.itemModel?.hasDescription ? ['maxDescription'] : []),
  ];
  itemModelSchema.properties = {
    ...itemModelSchema.properties,
    hasLink: {
      title: 'Enable link',
      description: 'Link to source content',
      type: 'boolean',
      default: true,
    },
    hasDate: {
      title: 'Publication date',
      type: 'boolean',
      default: true,
    },
    hasEventDate: {
      title: 'Event date',
      type: 'boolean',
      default: false,
    },
    hasDescription: {
      title: 'Description',
      type: 'boolean',
    },
    maxTitle: {
      title: 'Title max lines',
      description:
        "Limit title to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
    maxDescription: {
      title: 'Description max lines',
      description:
        "Limit description to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
  };
  return schema;
};

export const setItemModelSchema = (args) => {
  const { formData, schema } = args;

  const itemModelSchema = schema.properties.itemModel.schema;

  itemModelSchema.fieldsets[0].fields = [
    ...itemModelSchema.fieldsets[0].fields,
    'maxTitle',
    'hasDate',
    'hasEventDate',
    'hasDescription',
    'maxDescription',
    'hasImage',
    ...(formData.itemModel?.hasImage ? ['imageOnRightSide'] : []),
    'hasIcon',
    ...(formData.itemModel?.hasIcon ? ['icon'] : []),
    // 'hasMetaType',
    // 'hasLabel',
    // 'hasTags',
    // 'callToAction',
  ];
  itemModelSchema.properties = {
    ...itemModelSchema.properties,

    hasDate: {
      title: 'Publication date',
      type: 'boolean',
    },
    hasEventDate: {
      title: 'Event date',
      type: 'boolean',
      default: false,
    },
    hasDescription: {
      title: 'Description',
      type: 'boolean',
      default: true,
    },
    maxTitle: {
      title: 'Title max lines',
      description:
        "Limit title to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
    maxDescription: {
      title: 'Description max lines',
      description:
        "Limit description to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
    hasImage: {
      title: 'Image',
      type: 'boolean',
      default: true,
    },
    hasIcon: {
      title: 'Icon',
      type: 'boolean',
      default: false,
    },
    icon: {
      title: 'Icon name',
      description: "Ex.: 'ri-arrow-right-line'. See Remix Icon set",
    },
    imageOnRightSide: {
      title: 'Image on Right (Default is Left)',
      type: 'boolean',
    },
    // hasMetaType: {
    //   title: 'Show portal type',
    //   type: 'boolean',
    // },
    // hasLabel: {
    //   title: 'Show new/archived label',
    //   type: 'boolean',
    // },
    // hasTags: {
    //   title: 'Show tags',
    //   type: 'boolean',
    // },
  };
  return schema;
};

export const setSimpleItemModelSchema = (args) => {
  const { schema } = args;
  const itemModelSchema = schema.properties.itemModel.schema;

  itemModelSchema.fieldsets[0].fields = [
    ...itemModelSchema.fieldsets[0].fields,
    'maxTitle',
    'hasMetaType',
  ];
  itemModelSchema.properties = {
    ...itemModelSchema.properties,
    maxTitle: {
      title: 'Title max lines',
      description:
        "Limit title to a maximum number of lines by adding trailing '...'",
      type: 'number',
      default: 2,
      minimum: 0,
      maximum: 5,
    },
    hasMetaType: {
      title: 'Show portal type',
      type: 'boolean',
    },
  };
  return schema;
};

export const setSimpleItemStylingSchema = ({ schema, intl }) => {
  // populate the 'styling' fieldset of the cards
  const itemModelSchema = schema.properties.itemModel;
  const styleSchema = itemModelSchema.schema.properties.styles.schema;
  const fieldset = styleSchema.fieldsets.find(({ id }) => id === 'default');
  fieldset.fields.push(
    'theme:noprefix',
    'inverted:bool',
    'bordered:bool',
    'text',
  );
  styleSchema.properties = {
    ...styleSchema.properties,
    'theme:noprefix': {
      title: intl.formatMessage(messages.Theme),
      description: intl.formatMessage(messages.ThemeHelp),
      widget: 'theme_picker',
      colors: [
        ...(config.settings && config.settings.themeColors
          ? config.settings.themeColors.map(({ value, title }) => ({
              name: value,
              label: title,
            }))
          : []),
        //and add extra ones here
      ],
    },
    'inverted:bool': {
      title: intl.formatMessage(messages.Inverted),
      description: intl.formatMessage(messages.InvertedHelp),
      type: 'boolean',
    },
    'bordered:bool': {
      title: intl.formatMessage(messages.Bordered),
      type: 'boolean',
    },
    text: {
      title: 'Text align',
      widget: 'style_text_align',
      actions: Object.keys(ALIGN_INFO_MAP),
      actionsInfoMap: ALIGN_INFO_MAP,
    },
  };

  return schema;
};

export const setCardStylingSchema = ({ schema, intl }) => {
  // populate the 'styling' fieldset of the cards
  const itemModelSchema = schema.properties.itemModel;
  const styleSchema = itemModelSchema.schema.properties.styles.schema;
  const fieldset = styleSchema.fieldsets.find(({ id }) => id === 'default');
  fieldset.fields.push(
    'theme:noprefix',
    'inverted:bool',
    'rounded:bool',
    'text',
    'objectFit',
    'objectPosition',
  );
  styleSchema.properties = {
    ...styleSchema.properties,
    'theme:noprefix': {
      title: intl.formatMessage(messages.Theme),
      description: intl.formatMessage(messages.ThemeHelp),
      widget: 'theme_picker',
      colors: [
        ...(config.settings && config.settings.themeColors
          ? config.settings.themeColors.map(({ value, title }) => ({
              name: value,
              label: title,
            }))
          : []),
        //and add extra ones here
      ],
    },
    'inverted:bool': {
      title: intl.formatMessage(messages.Inverted),
      description: intl.formatMessage(messages.InvertedHelp),
      type: 'boolean',
    },
    'rounded:bool': {
      title: intl.formatMessage(messages.Rounded),
      description: intl.formatMessage(messages.RoundedHelp),
      type: 'boolean',
    },
    text: {
      title: 'Text align',
      widget: 'style_text_align',
      actions: Object.keys(ALIGN_INFO_MAP),
      actionsInfoMap: ALIGN_INFO_MAP,
    },
    objectFit: {
      title: intl.formatMessage(messages.ObjectFit),
      description: intl.formatMessage(messages.ObjectFitHelp),
      choices: [
        ['cover', 'cover'],
        ['contain', 'contain'],
        ['fill', 'fill'],
        ['scale-down', 'scale-down'],
        ['none', 'none'],
      ],
    },
    objectPosition: {
      title: intl.formatMessage(messages.ObjectPosition),
      description: intl.formatMessage(messages.ObjectPositionHelp),
      choices: [
        ['top', 'top'],
        ['bottom', 'bottom'],
        ['left', 'left'],
        ['right', 'right'],
        ['center', 'center'],
      ],
    },
  };

  return schema;
};
