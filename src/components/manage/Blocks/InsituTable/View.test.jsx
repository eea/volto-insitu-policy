import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

import View from './View';

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

const storeWithSimpleData = mockStore({
  content: {
    data: {
      '@components': {
        data_providers_table: {
          simple: [
            {
              name: {
                title: 'Provider 1',
                link: 'http://example.com/Provider1',
              },
              countries: ['Romania'],
              link: 'http://example.com',
              provider_type: 'Type A',
              services: {
                'Service 1': ['Component 1', 'Component 2'],
                'Services 2': ['Component 3'],
              },
            },
          ],
        },
      },
    },
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

const storeWithNetworkData = mockStore({
  content: {
    data: {
      '@components': {
        data_providers_table: {
          network: [
            {
              name: {
                title: 'Provider 1',
                link: 'http://example.com/Provider1',
              },
              countries: ['Romania'],
              members: [
                {
                  link: 'http://example-member1.com',
                  name: 'Member 1',
                },
                {
                  link: 'http://example-member2.com',
                  name: 'Member 2',
                },
              ],
              link: 'http://example.com',
              services: ['Service 1', 'Service 2'],
              components: ['Component 1', 'Component 2'],
            },
          ],
        },
      },
    },
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('DataProvidersTable', () => {
  it('renders empty simple table correctly', () => {
    const { container, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <View data={{ tableType: 'all_organisations' }} />
      </Provider>,
    );

    // Verify that the search input is rendered
    const searchInput = getByPlaceholderText(
      'Start typing to filter by any column value',
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');
    expect(searchInput).toHaveClass('search-input');
    expect(container.querySelector('.search-container')).toBeInTheDocument();
    expect(container.querySelector('.search-icon')).toBeInTheDocument();

    // Verify that you can type in the search input and it changes the input value
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    // Verify that the table headers are rendered
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Countries')).toBeInTheDocument();
    expect(getByText('Website')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Services/Components')).toBeInTheDocument();
  });

  it('renders empty network table correctly', () => {
    const { container, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <View data={{ tableType: 'networks' }} />
      </Provider>,
    );

    // Verify that the search input is rendered
    const searchInput = getByPlaceholderText(
      'Start typing to filter by any column value',
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');
    expect(searchInput).toHaveClass('search-input');
    expect(container.querySelector('.search-container')).toBeInTheDocument();
    expect(container.querySelector('.search-icon')).toBeInTheDocument();

    // Verify that you can type in the search input and it changes the input value
    fireEvent.change(searchInput, {
      target: { value: 'test' },
    });
    expect(searchInput.value).toBe('test');

    // Verify that the table headers are rendered
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Countries')).toBeInTheDocument();
    expect(getByText('Members')).toBeInTheDocument();
    expect(getByText('Website')).toBeInTheDocument();
    expect(getByText('Services/Components')).toBeInTheDocument();
  });

  it('renders simple table with data correctly', () => {
    const { getByText } = render(
      <Provider store={storeWithSimpleData}>
        <View data={{ tableType: 'all_organisations' }} />
      </Provider>,
    );

    expect(getByText('Provider 1')).toBeInTheDocument();
    expect(getByText('Romania')).toBeInTheDocument();
    const linkElement = getByText('Provider 1')
      .closest('tr')
      .querySelector('a');
    expect(linkElement).toHaveAttribute('href', 'http://example.com/Provider1');
    expect(getByText('Type A')).toBeInTheDocument();
    expect(getByText(/Service 1/)).toBeInTheDocument();
    expect(getByText(/Component 1/)).toBeInTheDocument();
  });

  it('renders network table with data correctly', () => {
    const { container, getByText } = render(
      <Provider store={storeWithNetworkData}>
        <View data={{ tableType: 'networks' }} />
      </Provider>,
    );

    expect(getByText('Provider 1')).toBeInTheDocument();
    expect(getByText('Romania')).toBeInTheDocument();
    const linkElements = container.querySelectorAll('a');
    expect(linkElements).toHaveLength(4);
    expect(linkElements[0]).toHaveAttribute(
      'href',
      'http://example.com/Provider1',
    );
    expect(linkElements[1]).toHaveAttribute('href', 'http://example.com');
    expect(linkElements[2]).toHaveAttribute(
      'href',
      'http://example-member1.com',
    );
    expect(linkElements[3]).toHaveAttribute(
      'href',
      'http://example-member2.com',
    );
    expect(getByText(/Service 1/)).toBeInTheDocument();
    expect(getByText(/Component 1/)).toBeInTheDocument();
  });
});
