/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import EEAFooter from '@eeacms/volto-eea-design-system/ui/Footer/Footer';
import config from '@plone/volto/registry';
import { Grid, Divider } from 'semantic-ui-react';

const Footer = () => {
  const { eea } = config.settings;
  const { footerActions = [], socialActions = [] } = useSelector(
    (state) => ({
      footerActions: state.actions?.actions?.footer_actions,
      copyrightActions: state.actions?.actions?.copyright_actions,
      socialActions: state.actions?.actions?.social_actions,
    }),
    shallowEqual,
  );

  // ZMI > portal_actions > footer_actions
  const actions = footerActions.length
    ? footerActions.map((action) => ({
        title: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.actions;

  const social = socialActions.length
    ? socialActions.map((action) => ({
        name: action.id,
        icon: action.icon,
        url: action.url,
      }))
    : eea.footerOpts.social;

  const options = {
    ...eea.footerOpts,
    social,
  };

  return (
    <>
      <EEAFooter>
        <EEAFooter.Header>{eea.footerOpts.logosHeader}</EEAFooter.Header>
        <EEAFooter.SubFooter {...options} />
        <Grid stackable relaxed padded>
          <Grid.Row>
            <Grid.Column
              mobile={12}
              tablet={12}
              computer={4}
              className="footer-services"
            >
              <h4 className="footer-section-title">Copernicus Services</h4>
              <Divider />
              <EEAFooter.Sites sites={eea.footerOpts.sites} />
            </Grid.Column>
            <Grid.Column
              mobile={12}
              tablet={12}
              computer={4}
              className="footer-follow-us"
            >
              <h4 className="footer-section-title">
                Sign up to In-Situ updates
              </h4>
              <Divider />
              <UniversalLink
                className="ui button inverted"
                href="/insituupdates"
                title="Subscribe to In Situ updates"
              >
                Subscribe
              </UniversalLink>
              <h4 className="footer-section-title">Follow us</h4>
              <Divider />
              <EEAFooter.Social social={social} />
            </Grid.Column>
            <Grid.Column
              mobile={12}
              tablet={12}
              computer={4}
              className="footer-about"
            >
              <h4 className="footer-section-title">Copernicus</h4>
              <Divider />
              <p>
                Copernicus is the Earth Observation component of the European
                Union's space programme, looking at our planet and its
                environment for the benefit of Europe's citizens.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </EEAFooter>
      <EEAFooter.Actions actions={actions} />
    </>
  );
};

export default Footer;
