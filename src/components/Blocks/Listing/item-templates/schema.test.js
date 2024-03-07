import {
  setCardModelSchema,
  setItemModelSchema,
  setSimpleItemModelSchema,
  setSimpleItemStylingSchema,
  setCardStylingSchema,
} from './schema';

jest.mock('@eeacms/volto-listing-block/messages', () => ({
  formatMessage: jest.fn(),
}));

jest.mock('@plone/volto/registry', () => ({
  settings: { themeColors: [{ value: 'value1', title: 'title1' }] },
}));

let schemaWithoutFields;
let schemaWithFields;

describe('setCardModelSchema', () => {
  beforeEach(() => {
    schemaWithoutFields = {
      properties: {
        itemModel: {
          schema: {
            fieldsets: [{ fields: [] }],
            properties: {},
          },
        },
      },
    };
    schemaWithFields = {
      properties: {
        itemModel: {
          schema: {
            properties: {
              styles: {
                schema: {
                  fieldsets: [{ id: 'default', fields: [] }],
                  properties: {},
                },
              },
            },
          },
        },
      },
    };
  });
  it('should update the itemModelSchema fields based on formData', () => {
    const args = {
      formData: { itemModel: { hasDescription: true } },
      schema: schemaWithoutFields,
    };

    const updatedSchema = setCardModelSchema(args);
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).toContain('maxDescription');
  });

  it('should update the itemModelSchema fields based on formData', () => {
    const args = {
      formData: { itemModel: {} },
      schema: schemaWithoutFields,
    };

    const updatedSchema = setCardModelSchema(args);
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).not.toContain('maxDescription');
  });
});

describe('setItemModelSchema', () => {
  it('should update the itemModelSchema fields based on formData', () => {
    const updatedSchema = setItemModelSchema({
      formData: { itemModel: {} },
      schema: schemaWithoutFields,
    });
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).not.toContain('icon');
    expect(
      updatedSchema.properties.itemModel.schema.properties.hasIcon.default,
    ).toBe(false);
  });

  it('should update the itemModelSchema fields based on formData', () => {
    const updatedSchema = setItemModelSchema({
      formData: { itemModel: { hasIcon: true, hasImage: true } },
      schema: schemaWithoutFields,
    });
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).toContain('icon');
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).toContain('imageOnRightSide');
    expect(
      updatedSchema.properties.itemModel.schema.properties.hasIcon.default,
    ).toBe(false);
  });
});

describe('setSimpleItemModelSchema', () => {
  it('should update the itemModelSchema fields', () => {
    const updatedSchema = setSimpleItemModelSchema({
      schema: schemaWithoutFields,
    });
    expect(
      updatedSchema.properties.itemModel.schema.fieldsets[0].fields,
    ).toContain('maxTitle');
    expect(
      updatedSchema.properties.itemModel.schema.properties.maxTitle.default,
    ).toBe(2);
  });
});

describe('setSimpleItemStylingSchema', () => {
  it('should update the styling fieldset of the cards', () => {
    const updatedSchema = setSimpleItemStylingSchema({
      schema: schemaWithFields,
      intl: { formatMessage: () => {} },
    });
    expect(
      updatedSchema.properties.itemModel.schema.properties.styles.schema
        .fieldsets[0].fields,
    ).toContain('text');
  });
});

describe('setCardStylingSchema', () => {
  it('should update the styling fieldset of the cards', () => {
    const updatedSchema = setCardStylingSchema({
      schema: schemaWithFields,
      intl: { formatMessage: () => {} },
    });
    expect(
      updatedSchema.properties.itemModel.schema.properties.styles.schema
        .fieldsets[0].fields,
    ).toContain('text');
  });
});
