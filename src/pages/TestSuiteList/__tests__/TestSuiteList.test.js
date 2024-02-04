import { render, screen, waitFor, act } from '@testing-library/react';
import TestSuiteList from '../TestSuiteList';
import fetcher from '../../../utils/fetcher';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../utils/fetcher');

describe('TestSuiteList Component', () => {
  const mockResponse = [
    {
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
    },
  ];

  beforeEach(() => {
    fetcher.mockClear();
  });

  it('displays loading message while fetching data', async () => {
    fetcher.mockResolvedValue([]);

    render(<TestSuiteList />);

    expect(screen.getByTestId('list-is-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('list-is-empty')).toBeNull();

    await act(async () => {
      await waitFor(() => {});
    });

    expect(screen.queryByTestId('list-is-loading')).toBeNull();
    expect(screen.getByTestId('list-is-empty')).toBeInTheDocument();
  });

  it('displays test suite list after data is fetched', async () => {
    fetcher.mockResolvedValue(mockResponse);

    render(
      <Router>
        <TestSuiteList />
      </Router>
    );

    expect(screen.getByTestId('list-is-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('test-suite-list')).toBeNull();

    await act(async () => {
      await waitFor(() => {});
    });

    expect(screen.queryByTestId('list-is-loading')).toBeNull();
    expect(screen.getByTestId('test-suite-list')).toBeInTheDocument();
  });
});
