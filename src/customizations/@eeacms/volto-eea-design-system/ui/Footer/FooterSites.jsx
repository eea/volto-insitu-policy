import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

import PropTypes from 'prop-types';

const Sites = (props) => {
  const getLogoColumns = (logos) => {
    let column = [];
    for (let i = 0; i < logos.length; i += 1) {
      const item = logos[i];
      column.push(
        <Grid.Column className="logo" key={i}>
          <a className="logo" href={item.link} aria-label={item.alt}>
            <Image
              className={item.className}
              src={item.src}
              alt={''}
              loading="lazy"
            ></Image>
            <div className="logo-title">{item.title}</div>
          </a>
        </Grid.Column>,
      );
    }
    return column;
  };

  if (props.children) {
    return <div>{props.children}</div>;
  }

  //fallback to props
  return (
    <div className="theme-sites">
      <div className="logos">
        <Grid columns={3} relaxed>
          <Grid.Row>{getLogoColumns(props.sites)}</Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

Sites.propTypes = {
  sites: PropTypes.array,
};

export default Sites;
