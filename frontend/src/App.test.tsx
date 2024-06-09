import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { StudentsProvider } from './contexts/studentsContext';

describe('<App /> Navigation', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentsProvider>
          <App />
        </StudentsProvider>
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    const homeText = screen.getByText('Class Grade: K1');

    expect(homeText).toBeInTheDocument();
  });

  it('navigates to classroom page', () => {
    const homeworkBtn = screen.getByText('Assign Homework');
    fireEvent.click(homeworkBtn);

    const classIndicatorText = screen.getByText('Class:');
    const homeworkIndicatorText = screen.getByText('Homework: None');

    expect(classIndicatorText).toBeInTheDocument();
    expect(homeworkIndicatorText).toBeInTheDocument();
  });
});

describe('<App /> Assignment', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/classroom']}>
        <StudentsProvider>
          <App />
        </StudentsProvider>
      </MemoryRouter>
    );
  });

  it('assigns resource to classroom', async () => {
    const homeworkBtn = screen.getByText('Assign Homework');

    fireEvent.click(homeworkBtn);

    const resource = await screen.findByTestId('book-[1]');

    fireEvent.click(resource);
    fireEvent.click(screen.getByText('Assign'));

    const homeworkIndicatorText = await screen.findByText('Homework: Book 1');

    expect(homeworkIndicatorText).toBeInTheDocument();
  });

  it('assigns resource to student', async () => {
    const students = await screen.findAllByTestId('student-card');

    fireEvent.click(students[0]);
    fireEvent.click(screen.getByText('Assign Homework'));

    const resource = await screen.findByTestId('student-book-[2]');

    fireEvent.click(resource);
    fireEvent.click(screen.getByText('Assign'));

    const homeworkIndicatorText = await screen.findByTestId('Book 2');

    expect(homeworkIndicatorText).toBeInTheDocument();
  });
});
