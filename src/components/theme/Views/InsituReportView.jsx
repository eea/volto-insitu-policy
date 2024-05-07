import React from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';
import { Grid, Image, Button } from 'semantic-ui-react';
import articleLine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/extras/article-line.svg';
import { HTMLField, isOldFormat } from '@eeacms/volto-insitu-policy/helpers';

import './styles.less';

function InsituReportView(props) {
  const { content } = props;
  const { description, file, report_category, ...filteredContent } = content;

  return (
    <div className="insitu-report-view">
      {isOldFormat(content) && <BannerTitle content={content} />}
      <div className="ui container">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {content?.description && (
                <>
                  <h3>Summary</h3>
                  <p className="documentDescription eea callout">
                    {content.description}
                  </p>
                </>
              )}
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
            <Grid.Column width={4}>
              {content.preview_image && (
                <Image
                  src={content?.preview_image.download}
                  alt="Descriptive Image"
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {isOldFormat(content) ? (
          <>
            <HTMLField value={content.text} />
          </>
        ) : (
          <RenderBlocks {...props} content={filteredContent} />
        )}
      </div>
    </div>
  );
}

export default InsituReportView;
