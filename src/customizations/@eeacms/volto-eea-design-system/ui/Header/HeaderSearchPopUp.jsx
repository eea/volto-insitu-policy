import React, { useEffect } from 'react';
import { Container, Input, List } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import {
  useClickOutside,
  handleEnterKeyPress,
} from '@eeacms/volto-eea-design-system/helpers';

const getRandomItems = (arr, max) => {
  return (
    arr?.slice(0, max).map(function () {
      return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, arr.slice()) || []
  );
};

const getSearchInput = (config = [], location) => {
  const matchesPath = (item) => {
    const path = item.matchpath ? item.matchpath : item.path;
    return path && location.pathname.match(path);
  };

  return (
    config.filter((v) => v.type === 'search-input' && matchesPath(v))[0] ||
    config.filter((v) => v.type === 'search-input')[0] ||
    config.filter((v) => v.isDefault)[0] ||
    config[0] ||
    {}
  );
};

function HeaderSearchPopUp({
  history,
  location,
  onClose,
  searchInputRef,
  headerSearchBox,
  triggerRefs = [],
}) {
  const nodeRef = React.useRef();
  const headerSearchViews = headerSearchBox || [];
  const activeView = getSearchInput(headerSearchViews, location);

  const {
    path = '',
    buttonTitle,
    buttonUrl,
    description,
    placeholder = 'Search',
    searchSuggestions,
  } = activeView || {};
  const { suggestionsTitle, suggestions, maxToShow } = searchSuggestions || {};
  const defaultView =
    headerSearchViews.filter((v) => v.isDefault)[0] || activeView;

  const [visibleSuggestions, setVisibileSuggestions] = React.useState(
    getRandomItems(suggestions, maxToShow),
  );

  useEffect(() => {
    setVisibileSuggestions(getRandomItems(suggestions, maxToShow));
  }, [maxToShow, suggestions]);

  useClickOutside({ targetRefs: [nodeRef, ...triggerRefs], callback: onClose });

  const onSubmit = (event) => {
    const text = searchInputRef?.current?.inputRef?.current?.value;
    history.push(`${path}?q=${encodeURIComponent(text)}`);

    if (window?.searchContext?.resetSearch) {
      window.searchContext.resetSearch({ searchTerm: text });
    }

    onClose();
    event.preventDefault();
  };

  const onClickHandler = (suggestion) => {
    if (window?.searchContext?.resetSearch) {
      window.searchContext.resetSearch({ searchTerm: suggestion });
    }

    onClose();
  };

  return (
    <div id="search-box" ref={nodeRef}>
      <div className="wrapper">
        <Container>
          <form method="get" onSubmit={onSubmit}>
            <Input
              ref={searchInputRef}
              className="icon search"
              action={{
                className: 'icon ri-search-line',
                'aria-label': 'Submit search',
                onClick: onSubmit,
                onKeyDown: (event) => {
                  handleEnterKeyPress(event, onSubmit);
                },
              }}
              placeholder={placeholder}
              fluid
            />
          </form>
          {searchSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestionsTitle && <h4>{suggestionsTitle}</h4>}

              <List>
                {visibleSuggestions.map((item, i) => {
                  return (
                    <List.Item key={i}>
                      <Link
                        to={`${path}?q=${encodeURIComponent(item)}`}
                        onClick={() => onClickHandler(item)}
                      >
                        {item}
                      </Link>
                    </List.Item>
                  );
                })}
              </List>
            </div>
          )}
        </Container>
        {buttonTitle && (
          <div className="advanced-search">
            <Container>
              <div>{description}</div>
              <a
                href={buttonUrl || defaultView.path}
                className="ui button white inverted"
                title="Advanced search"
              >
                {buttonTitle}
              </a>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(HeaderSearchPopUp);
