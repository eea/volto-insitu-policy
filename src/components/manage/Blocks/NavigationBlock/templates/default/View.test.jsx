import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AssetTab } from './View';

describe('AssetTab', () => {
  const baseProps = {
    props: {
      image: [{ '@id': 'http://example.com/image' }],
      assetType: 'image',
      assetPosition: 'top',
      imageSize: 'medium',
      hideTitle: false,
    },
    tabIndex: 1,
    tabTitle: 'Example Title',
  };

  it('renders correctly with visible title', () => {
    render(<AssetTab {...baseProps} />);
    expect(screen.getByText('Example Title')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not render title when hideTitle is true', () => {
    const props = {
      ...baseProps,
      props: {
        ...baseProps.props,
        hideTitle: true,
      },
    };
    render(<AssetTab {...props} />);
    expect(screen.queryByText('Example Title')).toBeNull();
  });

  it('applies correct class based on assetPosition', () => {
    const { container } = render(<AssetTab {...baseProps} />);
    expect(container.firstChild).toHaveClass('asset-position asset-top');
  });

  it('renders an image when assetType is image and image object exists', () => {
    render(<AssetTab {...baseProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'http://example.com/image');
    expect(image).toHaveClass('ui medium aligned');
  });

  it('handles null image gracefully', () => {
    const props = {
      ...baseProps,
      props: {
        ...baseProps.props,
        image: null,
      },
    };
    render(<AssetTab {...props} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  // Additional test to check the URL manipulation if needed
  it('constructs internal image URL correctly', () => {
    const props = {
      ...baseProps,
      props: {
        ...baseProps.props,
        image: [
          {
            '@id': '/internal/image',
            image_scales: {
              image: [
                {
                  scales: {
                    medium: {
                      download: '/download/path',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };
    render(<AssetTab {...props} />);
    const image = screen.getByRole('img');
    expect(image.src).toContain('/download/path');
  });

  it('constructs internal image URL correctly', () => {
    const props = {
      ...baseProps,
      props: {
        ...baseProps.props,
        image: [
          {
            '@id': '/internal/image',
            image_scales: {
              image: [
                {
                  download: '/download/path',
                },
              ],
            },
          },
        ],
      },
    };
    render(<AssetTab {...props} />);
    const image = screen.getByRole('img');
    expect(image.src).toContain('/download/path');
  });
});
