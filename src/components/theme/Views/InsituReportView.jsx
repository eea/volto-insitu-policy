import React from 'react';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
import { Label, Grid, Image, Button } from 'semantic-ui-react';
import articleLine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/extras/article-line.svg';

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
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <h3>Summary</h3>
              <p className="documentDescription eea callout">
                {content.description}
              </p>
            </Grid.Column>
            <Grid.Column width={4}>
              {content.preview_image && (
                <Image
                  src={content?.preview_image.download}
                  alt="Descriptive Image"
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              {!!content.file?.download && (
                <div className="file-download">
                  <div className="file-title">
                    <Image src={articleLine} />
                    <div>
                      <a href={content.file.download}>
                        {content.file.filename}
                      </a>
                      <br />
                      <p>{(content.file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <Button as="a" href={content.file.download} download>
                    Download
                  </Button>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Publisher {...props} />
        <SubjectTags {...props} />
      </div>
    </div>
  );
}

export default InsituReportView;
