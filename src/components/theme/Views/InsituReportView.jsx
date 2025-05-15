import React, { useEffect } from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { Grid, Image, Button } from 'semantic-ui-react';
import articleLine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/extras/article-line.svg';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import './styles.less';

function InsituReportView(props) {
  const { content } = props;
  const descriptionBlockId = Object.keys(content.blocks || {}).find(
    (blockId) => content.blocks?.[blockId]?.['@type'] === 'description',
  );
  const fileMetadataBlockId = Object.keys(content.blocks || {}).find(
    (blockId) =>
      content.blocks?.[blockId]?.['@type'] === 'metadata' &&
      content.blocks?.[blockId]?.data?.id === 'file',
  );
  const descriptionBlockValue = content.blocks?.[descriptionBlockId]?.value;

  useEffect(() => {
    const descriptionElement = document.querySelector(
      '.documentDescription.eea.callout',
    );
    if (descriptionElement) {
      descriptionElement.innerHTML = descriptionElement.innerHTML.replace(
        /&nbsp;/g,
        ' ',
      );
    }
  }, []);

  return (
    <div className="insitu-report-view">
      <div className="ui container">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {content?.description && (
                <>
                  <h3>Summary</h3>
                  <p className="documentDescription eea callout">
                    {descriptionBlockValue
                      ? serializeNodes(descriptionBlockValue)
                      : content.description}
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
        {/* Remove  the blocks that are rendered already via the layout,
        currently, these include the description and file metadata blocks. */}
        {Object.keys(content.blocks).length > 0 && (
          <RenderBlocks
            {...props}
            content={{
              ...content,
              blocks_layout: {
                ...content.blocks_layout,
                items: (content?.blocks_layout?.items || []).filter(
                  (blockId) =>
                    blockId !== descriptionBlockId &&
                    blockId !== fileMetadataBlockId,
                ),
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default InsituReportView;
