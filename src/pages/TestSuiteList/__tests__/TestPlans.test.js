import { render, screen, within } from '@testing-library/react';
import TestPlans from '../TestPlans';

describe('TestPlans Component', () => {
  const plans = [
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
  ];

  it('renders the plans of a test suite', () => {
    render(<TestPlans plans={plans} />);

    const plansList = screen.getAllByTestId('test-plans-item');

    plansList.forEach((plan, idx) => {
      const current = plans[idx];

      expect(
        within(plan).getByTestId('test-plans-item-name')
      ).toHaveTextContent(current.test_name);

      expect(
        within(plan).getByTestId('test-plans-item-browser')
      ).toHaveTextContent(current.browser);

      expect(
        within(plan).getByTestId('test-plans-item-instructions')
      ).toHaveTextContent(current.instruction_count);
    });
  });
});
