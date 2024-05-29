import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.getSlate().click({ force: true }).type('/nav{enter}');
    cy.contains('Item 1');
    cy.get('.field-wrapper-verticalAlign').click();
    cy.contains('Middle').click();
    cy.get('.add-item-button-wrapper button').click();
    cy.contains('Item 1');
    cy.contains('Item 2').click();

    cy.contains('Item 1').click().type('{rightArrow}');

    cy.contains('Tab #1').click();
    cy.get('#field-title-0-data-0').click().type('Test tab 1');
    cy.get('#field-assetType-1-data-0').click();
    cy.contains('No value').click();
    cy.get('#field-assetType-1-data-0').click().type('{downArrow}{enter}');

    cy.get('#field-imageSize-4-data-0').click();
    cy.contains('Medium').click();

    cy.get('#field-assetPosition-5-data-0').click();
    cy.contains('Right side').click();

    cy.get('#field-linkToPage-2-data-0').click().type('/test-page');
    cy.contains('Tab #1').click();

    cy.get('.tabs-area .drag.handle')
      .eq(0)
      .trigger('mousedown', { button: 1 })
      .trigger('mousemove', 0, -100, { force: true })
      .trigger('mouseup', 0, -100, { force: true });
    cy.get('#field-menuAlign').click();
    cy.contains('Center').click();
    cy.get('#field-menuPosition').click();
    cy.contains('Bottom').click();
    cy.get('#field-menuPosition').click();
    cy.contains('Top').click();
    cy.get('#field-menuPosition').click();
    cy.contains('Right').click();
    cy.get('#field-menuPosition').click();
    cy.contains('Left').click();

    cy.contains('Items').click();
    // Save
    cy.get('#toolbar-save').click({ force: true });
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.contains('Test tab 1');
    cy.contains('Tab 2').click();
  });
});
