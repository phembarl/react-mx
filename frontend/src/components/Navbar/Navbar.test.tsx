import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { StudentsProvider } from '../../contexts/studentsContext';

describe('<Navbar />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/classroom']}>
        <StudentsProvider>
          <App />
        </StudentsProvider>
      </MemoryRouter>
    );
  });
  it('should find header text', () => {
    const navHeading = screen.getByRole('heading', {
      name: 'Professor Dashboard',
    });

    expect(navHeading).toBeInTheDocument();
  });

  it('should navigate to home page', () => {
    const homeLink = screen.getByText('Professor Dashboard');
    fireEvent.click(homeLink);

    const homeText = screen.getByText('Class Grade: K1');

    expect(homeText).toBeInTheDocument();
  });
});
