import React from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { HTMLField } from '@eeacms/volto-insitu-policy/helpers';
import './styles.less';

function NewsItemView(props) {
  const { content } = props;
  const lastMigrationDate = new Date('2025-05-01T00:00:00');

  return (
    <div className="insitu-newsitem-view">
      <div className="ui container">
        <p className="documentDescription eea callout">{content.description}</p>
        {!!content.image && new Date(content?.created) <= lastMigrationDate && (
          <div className="lead-img">
            <img
              className="main-img"
              src={content.image?.download}
              alt={content.title}
            />
            <p className="main-img-caption">{content.image_caption}</p>
          </div>
        )}
        <HTMLField value={content.text} />
        <RenderBlocks {...props} />
      </div>
    </div>
  );
}

export default NewsItemView;
