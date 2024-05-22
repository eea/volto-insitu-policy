import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Type: {
    id: 'insituTable',
    defaultMessage: 'Insitu Data Table',
  },
  Endpoint: {
    id: 'endpoint',
    defaultMessage: 'Endpoint',
  },
  DefaultEndpoint: {
    id: 'defaultEndpoint',
    defaultMessage: ' Default endpoint',
  },
  Network: {
    id: 'network',
    defaultMessage: 'Network',
  },
});

const EditSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.Type),
  block: 'insituTable',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['text', 'network'],
    },
  ],

  properties: {
    text: {
      title: intl.formatMessage(messages.Endpoint),
      default: intl.formatMessage(messages.DefaultEndpoint),
    },
    network: {
      title: intl.formatMessage(messages.Network),
      type: 'boolean',
    },
  },
  required: [],
});

export default EditSchema;
