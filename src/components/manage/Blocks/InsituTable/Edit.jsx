import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';

import View from './View';
import EditSchema from './schema';

export default function Edit(props) {
  const { block, data = {}, onChangeBlock, selected, id, intl } = props;
  const schema = EditSchema({ intl });

  return (
    <div>
      <View data={data} id={id} mode="edit" />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          block={block}
          title={schema.title}
          schema={schema}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
        />
      </SidebarPortal>
    </div>
  );
}
