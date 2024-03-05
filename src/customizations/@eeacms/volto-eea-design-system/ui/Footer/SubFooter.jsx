import React from 'react';

import { Grid, Image } from 'semantic-ui-react';

const SubFooter = (props) => {
  if (props.children) {
    return <div>{props.children}</div>;
  }

  return (
    <div className={'subfooter'}>
      <div className="subfooter-logo-container">
        {props.managedBy &&
          props.managedBy.map((manager, index) => (
            <div className="item">
              <div className={manager.className}>
                <a href={manager.url}>
                  <Image
                    src={manager.src}
                    alt={manager.alt}
                    loading="lazy"
                  ></Image>
                </a>
              </div>
            </div>
            // </Grid.Column>
          ))}
      </div>

      <Grid className="mobile only">
        {props.managedBy &&
          props.managedBy.map((manager, index) => (
            <Grid.Column
              mobile={manager.columnSize.mobile}
              tablet={manager.columnSize.tablet}
              computer={manager.columnSize.computer}
              key={index}
            >
              <div className="item">
                <div className={manager.className}>
                  <a href={manager.url}>
                    <Image
                      src={manager.src}
                      alt={manager.alt}
                      loading="lazy"
                    ></Image>
                  </a>
                </div>
              </div>
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
};

export default SubFooter;
