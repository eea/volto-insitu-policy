import React from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
import { HTMLField, isOldFormat } from '@eeacms/volto-insitu-policy/helpers';
import './styles.less';

function NewsItemView(props) {
  const { content } = props;

  return (
    <div className="insitu-newsitem-view">
      {isOldFormat(content) && <BannerTitle content={content} />}
      <div className="ui container">
        <p className="documentDescription eea callout">{content.description}</p>
        {!!content.image && (
          <div className="lead-img">
            <img
              className="main-img"
              src={content.image?.download}
              alt={content.title}
            />
            <p className="main-img-caption">{content.image_caption}</p>
          </div>
        )}
        {isOldFormat(content) ? (
          <>
            <HTMLField value={content.text} />
          </>
        ) : (
          <RenderBlocks {...props} />
        )}
      </div>
    </div>
  );
}

export default NewsItemView;
