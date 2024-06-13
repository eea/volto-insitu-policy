import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { StyleWrapperView } from '@eeacms/volto-block-style/StyleWrapper';
import { DefaultView } from './templates/default';

import config from '@plone/volto/registry';

import './less/edit.less';
import './less/tabs.less';

const NAV_BLOCK = 'navBlock';

const View = (props) => {
  const view = React.useRef(null);
  const { data = {}, uiContainer = '' } = props;
  const metadata = props.metadata || props.properties;
  const template = data.variation || 'default';
  const tabsData = data.data || {};
  const tabsList = tabsData.blocks_layout?.items || [];
  const tabs = tabsData.blocks || {};
  const theme = data.theme || 'light';

  const activeTemplate = config.blocks.blocksConfig[
    NAV_BLOCK
  ].variations.filter((v, _i) => v.id === template);

  const TabsView = activeTemplate?.[0]?.view || DefaultView;

  return (
    <StyleWrapperView
      {...props}
      data={data}
      styleData={data.styles || {}}
      styled={true}
    >
      <div
        className={cx('tabs-block', template, theme)}
        id={props.id}
        ref={view}
      >
        <TabsView
          {...props}
          node={view}
          metadata={metadata}
          parentRef={view}
          tabs={tabs}
          tabsData={tabsData}
          tabsList={tabsList}
          template={template}
          uiContainer={uiContainer}
        />
      </div>
    </StyleWrapperView>
  );
};

export default compose(withRouter(View));
