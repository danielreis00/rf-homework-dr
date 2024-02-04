import { render, screen, fireEvent } from '@testing-library/react';
import TestSuite from '../TestSuite';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TestSuite Component', () => {
  let suite;

  beforeEach(() => {
    suite = {
      id: 1,
      test_suite_name: 'Suite Mix Save Mental',
      test_plans: [
        {
          test_name: 'Test Plan Stiff Any Main',
          browser: 'firefox',
          instruction_count: 33,
        },
        {
          test_name: 'Test Plan Pride Queen Travel',
          browser: 'edge',
          instruction_count: 13,
        },
        {
          test_name: 'Test Plan Harbor Still Determine',
          browser: 'edge',
          instruction_count: 30,
        },
        {
          test_name: 'Test Plan Loose Difficulty Dirty Kept',
          browser: 'firefox',
          instruction_count: 14,
        },
        {
          test_name: 'Test Plan Extra Collect Entire Milk',
          browser: 'safari',
          instruction_count: 35,
        },
        {
          test_name: 'Test Plan Major Pet Program Dangerous',
          browser: 'edge',
          instruction_count: 31,
        },
      ],
    };
  });

  it('renders the test suite collapsed', () => {
    render(
      <Router>
        <TestSuite suite={suite} />
      </Router>
    );

    expect(screen.getByTestId('test-suite-title')).toHaveTextContent(
      'Suite Mix Save Mental'
    );
    expect(screen.getByTestId('test-suite-count')).toHaveTextContent('6 tests');
    expect(screen.getByTestId('test-suite-edit')).toBeInTheDocument();

    expect(screen.queryByTestId('test-suite-plans-section')).toBeNull();
  });

  it('displays the test plans when clicking on it', () => {
    render(
      <Router>
        <TestSuite suite={suite} />
      </Router>
    );

    expect(screen.queryByTestId('test-suite-plans-section')).toBeNull();

    const card = screen.getByTestId('test-suite-card');

    fireEvent.click(card);

    expect(screen.getByTestId('test-suite-plans-section')).toBeInTheDocument();
  });

  it('navigates to edit test suite page when clicking on edit', () => {
    render(
      <Router>
        <TestSuite suite={suite} />
      </Router>
    );

    const editLink = screen.getByTestId('test-suite-edit');

    fireEvent.click(editLink);

    expect(window.location.pathname).toBe(`/test_suites/${suite.id}`);
    expect(window.history.state.usr).toEqual({ suite });
  });
});
