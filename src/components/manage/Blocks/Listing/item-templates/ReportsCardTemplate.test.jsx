import { render, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import ReportsCardTemplate from './ReportsCardTemplate';
import articleLine from '@eeacms/volto-insitu-policy/../theme/themes/assets/images/extras/article-line.svg';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@plone/volto/components', () => ({
  ConditionalLink: (props) => <div>{props.item.title || props.item.Title}</div>,
}));

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('ReportsCardTemplate component', () => {
  it('should pass props to CardTitle and CardMeta and render elements conditionally', () => {
    const mockItem = { title: 'Test Title', EffectiveDate: '2023-11-19' };
    const mockItemModel = { hasLink: true, hasMetaType: true };

    render(
      <Provider store={store}>
        <ReportsCardTemplate item={mockItem} itemModel={mockItemModel} />
      </Provider>,
    );

    // Assert the presence of elements
    expect(screen.getByRole('img')).toHaveAttribute('src', articleLine);
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/November 2023/i)).toBeInTheDocument();
  });

  it('should render title and date with max lines for title and description', () => {
    const mockItem = { Title: 'Test Title', EffectiveDate: '2023-11-19' };
    const mockItemModel = {
      hasLink: true,
      hasMetaType: true,
      maxDescription: 3,
      maxTitle: 2,
    };

    render(
      <Provider store={store}>
        <ReportsCardTemplate item={mockItem} itemModel={mockItemModel} />
      </Provider>,
    );

    // Assert the presence of elements
    expect(screen.getByRole('img')).toHaveAttribute('src', articleLine);
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/November 2023/i)).toBeInTheDocument();
  });

  it('should not render title & date', () => {
    const mockItem = { Title: undefined, EffectiveDate: undefined };
    const mockItemModel = {
      hasLink: true,
      hasMetaType: true,
      maxDescription: 3,
      maxTitle: 2,
      hasDate: false,
    };

    render(
      <Provider store={store}>
        <ReportsCardTemplate item={mockItem} itemModel={mockItemModel} />
      </Provider>,
    );

    // Assert the presence of elements
    expect(screen.getByRole('img')).toHaveAttribute('src', articleLine);
  });

  it('should not render title & date & no itemModel', () => {
    const mockItem = { Title: undefined, EffectiveDate: undefined };

    render(
      <Provider store={store}>
        <ReportsCardTemplate item={mockItem} itemModel={undefined} />
      </Provider>,
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', articleLine);
  });
});
