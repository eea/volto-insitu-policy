import cx from 'classnames';
import { Card as UiCard, Image } from 'semantic-ui-react';
import CardMeta from './CardMeta';
import CardTitle from './CardTitle';
import articleLine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/extras/article-line.svg';

const getStyles = (props) => {
  const { itemModel = {} } = props;
  const res = {};
  if (itemModel.maxDescription) {
    res[`max-${itemModel.maxDescription}-lines`] = true;
  }
  if (itemModel.maxTitle) {
    res[`title-max-${itemModel.maxTitle}-lines`] = true;
  }
  return res;
};

const ListingReportsTemplate = (props) => {
  const { className } = props;
  return (
    <UiCard
      fluid={true}
      className={cx(
        'u-card',
        getStyles(props),
        className,
        'item-card',
        'left-image-card',
      )}
    >
      <Image src={articleLine} />
      <UiCard.Content>
        <CardTitle {...props} />
        <CardMeta {...props} />
      </UiCard.Content>
    </UiCard>
  );
};

export default ListingReportsTemplate;
