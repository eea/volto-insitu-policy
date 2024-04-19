import config from '@plone/volto/registry';
// import { hasTypeOfBlock } from '@eeacms/volto-insitu-policy/utils';

const BannerTitle = (props) => {
  const { content } = props;
  // const { blocks } = content;
  const {
    blocks: { blocksConfig },
  } = config;
  const TitleBlockView = blocksConfig?.title?.view;
  // const hasTitleBlock = hasTypeOfBlock(blocks, '@type', 'title');
  const types = ['Subsite', 'LRF', 'Plone Site'];
  const isHomePage = types.indexOf(content?.['@type']) > -1;

  return !isHomePage ? (
    <>
      <TitleBlockView
        {...props}
        data={{
          info: [{ description: '' }],
          hideContentType: false,
          hideCreationDate: false,
          hideModificationDate: false,
          hidePublishingDate: false,
          hideDownloadButton: true,
          hideShareButton: true,
        }}
        metadata={content}
      />
    </>
  ) : null;
};

export default BannerTitle;
