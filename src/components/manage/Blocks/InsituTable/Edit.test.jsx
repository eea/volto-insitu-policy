import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

import Edit from './Edit';

const mockOnChangeBlock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/test-jest',
    search: '',
    hash: '',
    state: null,
    key: 'test-jest',
  }),
  useHistory: () => ({
    push: jest.fn,
    replace: jest.fn,
  }),
}));

jest.mock('@plone/volto/components', () => ({
  BlockDataForm: ({ title, children, onChangeField }) => (
    <div>
      <div>
        <input
          id="test-input"
          defaultValue="initial"
          onChange={(e) => onChangeField('field1', e.target.value)}
        />
      </div>
      {children}
      <h1>{title}</h1>
    </div>
  ),
  SidebarPortal: ({ children }) => (
    <div data-testid="mock-sidebar-portal">{children}</div>
  ),
}));

const mockStore = configureStore();
const store = mockStore({
  content: {
    data: {
      id: 'test',
      placeholder: 'placeholder',
      '@components': {
        data_providers_table: {
          simple: [],
          network: [],
        },
      },
    },
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('Edit Component', () => {
  const baseProps = {
    block: 'testBlock',
    data: { field1: 'value1' },
    onChangeBlock: mockOnChangeBlock,
    selected: true,
    id: 'testId',
    intl: {
      locale: 'en',
      formatMessage: jest.fn(({ id, defaultMessage }) => defaultMessage || id),
      messages: {
        messageId: 'test message',
      },
    },
  };

  it('renders View and SidebarPortal correctly', () => {
    render(
      <Provider store={store}>
        <Edit {...baseProps} data={undefined} />
      </Provider>,
    );
  });

  it('calls onChangeBlock with correct parameters on data change', () => {
    const { container } = render(
      <Provider store={store}>
        <Edit {...baseProps} />
      </Provider>,
    );

    const newFieldValue = 'new value';
    const changedFieldId = 'field1';
    fireEvent.change(container.querySelector('#test-input'), {
      target: { value: newFieldValue },
    });

    expect(mockOnChangeBlock).toHaveBeenCalledWith(baseProps.block, {
      ...baseProps.data,
      [changedFieldId]: newFieldValue,
    });
  });
});
