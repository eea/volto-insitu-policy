import React from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { Label } from 'semantic-ui-react';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
import { HTMLField, isOldFormat } from '@eeacms/volto-insitu-policy/helpers';
import './styles.less';

const SubjectTags = (props) => {
  const tags = props.content?.subjects;
  return tags?.length > 0 ? (
    <>
      Filed under:{' '}
      {tags.map((tag) => (
        <Label key={tag}>{tag}</Label>
      ))}
    </>
  ) : null;
};

function NewsItemView(props) {
  const { content } = props;

  return (
    <div className="insitu-newsitem-view">
      <BannerTitle content={content} />
      <div className="ui container">
        {isOldFormat(content) && (
          <>
            <p className="documentDescription eea callout">
              {content.description}
            </p>
            <div className="lead-img">
              <img
                className="main-img"
                src={content.image.download}
                alt={content.title}
              />
              <p className="main-img-caption">{content.image_caption}</p>
            </div>
            <HTMLField value={content.text} />
          </>
        )}
        <RenderBlocks {...props} />
        <SubjectTags {...props} />
      </div>
    </div>
  );
}

export default NewsItemView;
