import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Type: {
    id: 'insituTable',
    defaultMessage: 'Insitu Data Providers Table',
  },
  TableType: {
    id: 'tableType',
    defaultMessage: 'Table Type',
  },
  NationalInstitutions: {
    id: 'national_institutions',
    defaultMessage: 'National Institutions',
  },
  AllOrganisations: {
    id: 'all_organisations',
    defaultMessage: 'All Organisations',
  },
  Networks: {
    id: 'networks',
    defaultMessage: 'Networks',
  },
});

const EditSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.Type),
  block: 'insituTable',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['tableType'],
    },
  ],

  properties: {
    tableType: {
      title: intl.formatMessage(messages.TableType),
      choices: [
        [
          'national_institutions',
          intl.formatMessage(messages.NationalInstitutions),
        ],
        ['all_organisations', intl.formatMessage(messages.AllOrganisations)],
        ['networks', intl.formatMessage(messages.Networks)],
      ],
      default: 'national_institutions',
    },
  },
  required: [],
});

export default EditSchema;
