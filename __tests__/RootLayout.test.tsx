import { render } from '@testing-library/react';
import RootLayout from '../app/layout';

describe('layout', () => {
  it('renders children and applies font classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(container).toHaveTextContent('Test content');
    expect(container.querySelector('body')).toHaveClass('antialiased');
  });
});
