import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the "Deploy now" button', () => {
    render(<Home />);
    const button = screen.getByRole('link', { name: /Deploy now/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the list items', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument();
  });
});
