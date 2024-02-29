import React from 'react';
import { Grid } from 'semantic-ui-react';

const FooterActions = (props) => {
  if (props.children) {
    return <div>{props.children}</div>;
  }

  return (
    <div className="footer-menu-actions">
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={12} tablet={12} computer={12}>
            <div className="actions">
              {props.actions &&
                props.actions.map((action, index) => (
                  <a
                    href={action.link}
                    key={index}
                    // target={'_blank'}
                    rel={'noreferrer'}
                  >
                    {action.title}
                  </a>
                ))}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default FooterActions;
