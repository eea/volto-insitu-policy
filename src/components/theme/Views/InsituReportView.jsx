import React from 'react';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
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

const Publisher = (props) => {
  const publisher = props.content?.publisher;
  return publisher?.length > 0 ? (
    <div className="publisher">
      <h4>Publisher</h4>
      {publisher.map((item) => (
        <Label size="small" key={item.token}>
          {item.title}
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
        {!!content.file?.download && (
          <div className="file-download">
            <a href={content.file.download}>{content.file.filename}</a>
            <br />
            {(content.file.size / 1024).toFixed(2)} KB
          </div>
        )}
        <Publisher {...props} />
        <SubjectTags {...props} />
      </div>
    </div>
  );
}

export default InsituReportView;
