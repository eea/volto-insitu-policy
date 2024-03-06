import React from 'react';
import { Card as UiCard } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { formatDate } from '@plone/volto/helpers/Utils/Date';

const CardMeta = (props) => {
  const { item, itemModel = {}, head_title } = props;
  const { EffectiveDate } = item;
  const locale = config.settings.dateLocale || 'en-gb';
  const showDate = itemModel.hasDate !== false && EffectiveDate !== 'None';
  const showMeta = !!(head_title || (itemModel?.hasMetaType && item['@type']));

  // TODO: <EEAFormattedDate data={EffectiveDate} />

  return showMeta || showDate ? (
    <UiCard.Meta>
      {showMeta && (
        <span className="text-left">{head_title || item['type_title']}</span>
      )}

      {showDate && (
        <span className="text-right date">
          {formatDate({
            date: EffectiveDate,
            format: {
              year: 'numeric',
              month: 'long',
            },
            locale: locale,
          })}
        </span>
      )}
    </UiCard.Meta>
  ) : null;
};

export default CardMeta;
