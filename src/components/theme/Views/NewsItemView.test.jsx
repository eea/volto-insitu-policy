import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-intl-redux';
import NewsItemView from './NewsItemView';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';

config.blocks = {
  blocksConfig: {
    title: {
      view: () => <div>Title Block Component</div>,
    },
  },
};

const mockStore = configureStore();

jest.mock('semantic-ui-react', () => ({
  ...jest.requireActual('semantic-ui-react'),
}));

describe('NewsItemView', () => {
  it('should render the component', () => {
    const content = {
      title: 'NewsItemView',
    };

    const store = mockStore({
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsItemView content={content} />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Title Block Component')).toBeInTheDocument();
    // expect(getByText('Test test')).toHaveClass('test-class');
  });
});
