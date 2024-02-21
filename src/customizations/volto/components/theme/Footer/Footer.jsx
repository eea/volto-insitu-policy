/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
// import { flattenToAppURL } from '@plone/volto/helpers';
import EEAFooter from '@eeacms/volto-eea-design-system/ui/Footer/Footer';
import config from '@plone/volto/registry';
import { Grid, Input, Checkbox } from 'semantic-ui-react';

const Footer = () => {
  const { eea } = config.settings;
  // const logo = eea.footerOpts.logoWhite;
  const {
    // footerActions = [],
    // copyrightActions = [],
    socialActions = [],
  } = useSelector(
    (state) => ({
      footerActions: state.actions?.actions?.footer_actions,
      copyrightActions: state.actions?.actions?.copyright_actions,
      socialActions: state.actions?.actions?.social_actions,
    }),
    shallowEqual,
  );
  // ZMI > portal_actions > footer_actions
  // const actions = footerActions.length
  //   ? footerActions.map((action) => ({
  //       title: action.title,
  //       link: flattenToAppURL(action.url),
  //     }))
  //   : eea.footerOpts.actions;

  // ZMI > portal_actions > copyright_actions
  // const copyright = copyrightActions.length
  //   ? copyrightActions.map((action) => ({
  //       title: action.title,
  //       site: action.title,
  //       link: flattenToAppURL(action.url),
  //     }))
  //   : eea.footerOpts.copyright;

  // ZMI > portal_actions > social_actions
  const social = socialActions.length
    ? socialActions.map((action) => ({
        name: action.id,
        icon: action.icon,
        url: action.url,
      }))
    : eea.footerOpts.social;

  // const siteUrl = eea?.logoTargetUrl;

  const options = {
    ...eea.footerOpts,
    social,
  };

  return (
    <EEAFooter>
      <EEAFooter.Header>{eea.footerOpts.logosHeader}</EEAFooter.Header>
      <EEAFooter.SubFooter {...options} />
      <Grid stackable relaxed>
        <Grid.Row>
          <Grid.Column width={4}>
            <h3>Copernicus Services</h3>
            <EEAFooter.Sites sites={eea.footerOpts.sites} />
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Sign up to In Situ updates</h3>
            {/* add form to connect the input and checkbox */}
            <Input
              placeholder="Enter an email address"
              action={{ content: 'Subscribe' }}
            />
            <Checkbox label="I agree to privacy policy" required />
            <h3>Follow us</h3>
            <EEAFooter.Social social={social} />
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Copernicus</h3>
            <p>
              Copernicus is the Earth Observation component of the European
              Union's space programme, looking at our planet and its environment
              for the benefit of Europe's citizens.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </EEAFooter>
  );
};

export default Footer;
