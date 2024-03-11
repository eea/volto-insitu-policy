/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import EEAFooter from '@eeacms/volto-eea-design-system/ui/Footer/Footer';
import config from '@plone/volto/registry';
import {
  Grid,
  Input,
  Checkbox,
  Divider,
  Form,
  FormField,
} from 'semantic-ui-react';

const Footer = () => {
  const { eea } = config.settings;
  // const logo = eea.footerOpts.logoWhite;
  const {
    footerActions = [],
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
  const actions = footerActions.length
    ? footerActions.map((action) => ({
        title: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.actions;

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

  const customSocialActions = social.filter((item) =>
    ['youtube', 'twitter', 'facebook', 'linkedin'].includes(item.name),
  );

  console.log(customSocialActions, 'customSocialActions');

  // const siteUrl = eea?.logoTargetUrl;

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
                Sign up to In Situ updates
              </h4>
              <Form>
                <FormField>
                  <Input
                    placeholder="Enter an email address"
                    action={{ content: 'Subscribe' }}
                  />
                  <Checkbox
                    label={
                      // eslint-disable-next-line jsx-a11y/label-has-associated-control
                      <label>
                        I agree to the <a href="/privacy">privacy policy</a>
                      </label>
                    }
                    required
                  />
                </FormField>
              </Form>
              <h4 className="footer-section-title">Follow us</h4>
              <Divider />
              <EEAFooter.Social social={customSocialActions} />
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
