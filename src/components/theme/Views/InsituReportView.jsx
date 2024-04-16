import React from 'react';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { Label } from 'semantic-ui-react';
import './styles.less';

const SubjectTags = (props) => {
  const tags = props.content?.subjects;
  return tags?.length > 0 ? (
    <div className="subject-tags">
      Filed under:{' '}
      {tags.map((tag) => (
        <Label size="small" key={tag}>
          {tag}
        </Label>
      ))}
    </div>
  ) : null;
};

function InsituReportView(props) {
  const { content } = props;

  return (
    <div className="insitu-report-view">
      <BannerTitle content={content} />
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
        <RenderBlocks {...props} />
        <SubjectTags {...props} />
      </div>
    </div>
  );
}

export default InsituReportView;
