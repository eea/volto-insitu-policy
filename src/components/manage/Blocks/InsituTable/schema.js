import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Type: {
    id: 'insituTable',
    defaultMessage: 'Insitu Data Providers Table',
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
      fields: ['network'],
    },
  ],

  properties: {
    network: {
      title: intl.formatMessage(messages.Network),
      type: 'boolean',
    },
  },
  required: [],
});

export default EditSchema;
