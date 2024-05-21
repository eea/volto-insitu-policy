import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { Menu, Tab, Icon, Image } from 'semantic-ui-react';
import { getMenuPosition } from '../../utils';

import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

import '../../less/menu.less';

export const AssetTab = ({ props, tabIndex, tabTitle }) => {
  const {
    icon,
    image,
    assetType,
    assetPosition,
    iconSize,
    imageSize,
    hideTitle,
  } = props;
  const imageObject = image?.[0];
  return (
    <div
      className={cx('asset-position', {
        'asset-top': assetPosition === 'top',
        'asset-left': assetPosition === 'left',
        'asset-right': assetPosition === 'right',
      })}
    >
      {assetType === 'icon' && icon && (
        <Icon
          className={cx('tab-icon', icon, iconSize, 'aligned')}
          {...{
            ...(hideTitle && {
              role: 'img',
              'aria-hidden': 'false',
              'aria-label': tabTitle,
            }),
          }}
        />
      )}

      {assetType === 'image' && imageObject && (
        <Image
          src={
            isInternalURL(imageObject['@id'])
              ? `${flattenToAppURL(imageObject['@id'])}/${
                  imageObject?.image_scales?.image?.[0].scales?.[imageSize]
                    ?.download || imageObject?.image_scales?.image?.[0].download
                }`
              : imageObject['@id']
          }
          className={cx('ui', imageSize, 'aligned')}
          alt={hideTitle ? tabTitle : ''}
        />
      )}

      {!hideTitle && (
        <div>
          <span className="menu-item-count">{tabIndex}</span>
          <span className="menu-item-text">{tabTitle}</span>
        </div>
      )}
    </div>
  );
};

const MenuItem = (props) => {
  const { activeTab = null, tabs = {} } = props;
  const { tab, index } = props;
  const tabIndex = index + 1;
  const defaultTitle = `Tab ${tabIndex}`;
  const tabSettings = tabs[tab];
  const { title, assetType } = tabSettings;
  const tabTitle = title || defaultTitle;

  return (
    <React.Fragment>
      <Menu.Item
        name={defaultTitle}
        aria-selected={tab === activeTab}
        tabIndex={0}
      >
        <>
          {assetType ? (
            <AssetTab
              props={tabSettings}
              tabTitle={tabTitle}
              tabIndex={tabIndex}
            />
          ) : (
            <>
              <span className="menu-item-count">{tabIndex}</span>
              <span className="menu-item-text">{tabTitle}</span>
            </>
          )}
        </>
      </Menu.Item>
    </React.Fragment>
  );
};

const View = (props) => {
  const { data = {}, tabsList = [], tabs = {}, activeTabIndex = 0 } = props;
  const [menuPosition, setMenuPosition] = React.useState({});
  React.useEffect(() => {
    if (Object.keys(menuPosition).length === 0) {
      setMenuPosition(getMenuPosition(data));
    }
  }, [data, menuPosition]);

  const {
    title,
    description,
    align,
    menuBorderless,
    menuColor,
    menuCompact,
    menuFluid,
    menuInverted,
    menuPointing,
    menuSecondary,
    menuSize,
    menuStackable,
    menuTabular,
    menuText,
    menuAlign,
  } = data;
  const isContainer = align === 'full';

  const panes = tabsList.map((tab, index) => {
    const { linkToPage } = tabs[tab];
    const hasLink = !!linkToPage;
    const url =
      hasLink && isInternalURL(linkToPage)
        ? flattenToAppURL(linkToPage)
        : linkToPage;
    return {
      id: tab,
      menuItem: hasLink ? (
        <a href={url} key={tab}>
          <MenuItem
            {...props}
            tab={tab}
            index={index}
            tabsTitle={title}
            tabsDescription={description}
            blockId={props?.id || ''}
          />
        </a>
      ) : (
        <MenuItem
          {...props}
          key={tab}
          tab={tab}
          index={index}
          tabsTitle={title}
          blockId={props?.id || ''}
        />
      ),
      pane: '',
    };
  });

  return (
    <>
      <Tab
        activeIndex={activeTabIndex}
        className="default tabs tabs-accessibility"
        renderActiveOnly={false}
        menu={{
          role: 'tablist',
          attached: menuPosition.attached,
          borderless: menuBorderless,
          color: menuColor,
          compact: menuCompact,
          fluid: menuFluid,
          inverted: menuInverted,
          pointing: menuPointing,
          secondary: menuSecondary,
          size: menuSize,
          stackable: menuStackable,
          tabular: menuTabular,
          text: menuText,
          className: cx(
            'tabs-secondary-variant',
            menuAlign,
            menuPosition.direction === 'left' ? 'border-right' : '',
            menuPosition.direction === 'right' ? 'border-left' : '',
            menuPosition.direction === 'top' ? 'border-bottom' : '',
            menuPosition.direction === 'bottom' ? 'border-top' : '',
            { container: isContainer },
          ),
        }}
        menuPosition={menuPosition.direction}
        panes={panes}
        grid={{ paneWidth: 9, tabWidth: 3 }}
      />
    </>
  );
};

export default compose(withRouter(View));
