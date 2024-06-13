import { v4 as uuid } from 'uuid';
import { emptyBlocksForm, applySchemaDefaults } from '@plone/volto/helpers';

export const empty = ({ schema, intl }) => {
  const tabId = uuid();
  const data = {
    '@type': 'tab',
    ...emptyBlocksForm(),
  };

  return {
    blocks: {
      [tabId]: applySchemaDefaults({ data, schema, intl }),
    },
    blocks_layout: {
      items: [tabId],
    },
  };
};

export const emptyTab = ({ schema, intl }) => {
  const data = {
    '@type': 'tab',
    ...emptyBlocksForm(),
  };
  return applySchemaDefaults({ data, schema, intl });
};
