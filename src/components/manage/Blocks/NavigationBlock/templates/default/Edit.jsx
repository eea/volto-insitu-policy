import React from 'react';
import cx from 'classnames';
import { Menu, Tab } from 'semantic-ui-react';
import { defaultSchemaEnhancer } from './schema';
import { AssetTab } from './View';
import { getMenuPosition } from '../../utils';

import '../../less/menu.less';

import noop from 'lodash/noop';

export const MenuItem = (props) => {
  const { tabs = {} } = props;
  const { tab, index } = props;
  const tabIndex = index + 1;
  const defaultTitle = `Item ${tabIndex}`;
  const tabSettings = tabs[tab];
  const { title, assetType } = tabSettings;
  const tabTitle = title || defaultTitle;

  return (
    <>
      <Menu.Item className="remove-margin">
        <>
          {assetType ? (
            <AssetTab
              props={tabSettings}
              tabTitle={tabTitle}
              tabIndex={tabIndex}
            />
          ) : (
            <span>{tabTitle}</span>
          )}
        </>
      </Menu.Item>
    </>
  );
};

const Edit = (props) => {
  const {
    data = {},
    tabsList = [],
    setEditingTab = noop,
    schema,
    customTabsClass = '',
  } = props;
  const menuPosition = getMenuPosition(data);
  const {
    title,
    description,
    align,
    menuSecondary,
    menuSize,
    menuText,
    menuAlign,
  } = data;
  const isContainer = align === 'full';
  const panes = tabsList.map((tab, index) => {
    return {
      id: tab,
      menuItem: (
        <MenuItem
          {...props}
          key={tab}
          index={index}
          setEditingTab={setEditingTab}
          tab={tab}
          tabsTitle={title}
          tabsDescription={description}
          schema={schema}
        />
      ),
    };
  });
  return (
    <>
      <Tab
        className={cx('default tabs', customTabsClass)}
        menu={{
          attached: menuPosition.attached,
          secondary: menuSecondary,
          size: menuSize,
          text: menuText,
          className: cx(
            'tabs-secondary-variant',
            data.menuAlign,
            menuAlign,
            menuPosition.direction === 'left' ? 'border-right' : '',
            menuPosition.direction === 'right' ? 'border-left' : '',
            menuPosition.direction === 'top' ? 'border-bottom' : '',
            menuPosition.direction === 'bottom' ? 'border-top' : '',
            { container: isContainer },
            props.addTabsOptions ? props.addTabsOptions(data) : '',
          ),
        }}
        menuPosition={menuPosition.direction}
        panes={panes}
        grid={{ paneWidth: 9, tabWidth: 3 }}
      />
    </>
  );
};

Edit.schemaEnhancer = defaultSchemaEnhancer;

export default Edit;
