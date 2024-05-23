import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import View from './View';

jest.mock('./helpers', () => ({
  getParentTabFromHash: jest.fn().mockReturnValue(''),
}));

jest.mock('@plone/volto/registry', () => ({
  blocks: {
    blocksConfig: {
      navBlock: {
        variations: [{ id: 'default', view: () => <div>DefaultView</div> }],
      },
    },
  },
}));

describe('View Component', () => {
  it('renders without crashing', () => {
    const history = createMemoryHistory();
    const props = {
      data: {
        variation: 'default',
        data: {
          blocks_layout: {
            items: ['tab1', 'tab2'],
          },
          blocks: {
            tab1: { title: 'Tab 1' },
            tab2: { title: 'Tab 2' },
          },
        },
      },
      location: {
        search: '',
        hash: '',
        pathname: '',
      },
      history,
    };

    render(
      <Router history={history}>
        <View {...props} />
      </Router>,
    );

    // Check if DefaultView is rendered
    expect(screen.getByText('DefaultView')).toBeInTheDocument();
  });

  it('redirects to relative path on tab click', () => {
    const history = createMemoryHistory();
    const props = {
      data: {
        variation: 'default',
        data: {
          blocks_layout: {
            items: ['tab1', 'tab2'],
          },
          blocks: {
            tab1: { title: 'Tab 1' },
            tab2: { title: 'Tab 2' },
          },
        },
      },
      location: {
        search: '',
        hash: '',
        pathname: '',
      },
      history,
    };

    render(
      <Router history={history}>
        <View {...props} />
      </Router>,
    );

    // Simulate tab click
    // Note: Adjust this to find the correct element that triggers the navigation
    const tab1 = screen.getByText('Tab 1');
    fireEvent.click(tab1);

    // Check if the URL was updated to the relative path
    expect(history.location.pathname).toBe('/tab1');
  });
});
