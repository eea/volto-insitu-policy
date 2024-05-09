import React from 'react';
import cx from 'classnames';
import Tag from '@eeacms/volto-eea-design-system/ui/Tag/Tag';
import config from '@plone/volto/registry';

export const TokenWidget = ({ value, children, className }) =>
  value ? (
    <div className={cx(className, 'token', 'widget', 'tags-content')}>
      {value.map((tag) => (
        <Tag
          href={`https://${config.settings.eea.siteroot}${config.settings.eea.headerSearchBox[0].path}?q=${tag}`}
          key={tag}
        >
          {children ? children(tag) : tag}
        </Tag>
      ))}
    </div>
  ) : (
    ''
  );
