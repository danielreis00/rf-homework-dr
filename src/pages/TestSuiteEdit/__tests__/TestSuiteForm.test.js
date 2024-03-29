import { render, screen, within, fireEvent } from '@testing-library/react';
import TestSuiteForm from '../TestSuiteForm';

describe('TestSuiteEdit Component', () => {
  let editedTestSuite;
  let onBack;

  beforeEach(() => {
    editedTestSuite = {
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

    onBack = () => {};
  });

  it('renders form for a given test suite', () => {
    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Check title
    expect(screen.getByTestId('edit-form-title')).toBeInTheDocument();

    // Check Test suite name input
    expect(
      screen.getByTestId('edit-form-suite-name-input')
    ).toBeInTheDocument();

    // Check List of Test Plans
    const editPlans = screen.getAllByTestId('edit-form-test-plan');
    expect(editPlans).toHaveLength(6);

    editedTestSuite.test_plans.forEach((plan, idx) => {
      const currentPlan = editPlans[idx];

      const nameInput = within(currentPlan).getByTestId('edit-plan-name-input');
      expect(nameInput).toHaveValue(plan.test_names);

      const browserInput = within(currentPlan).getByTestId(
        'edit-plan-browser-input'
      );
      expect(browserInput).toHaveValue(plan.browser);

      const instructionsInput = within(currentPlan).getByTestId(
        'edit-plan-instructions-input'
      );
      expect(instructionsInput).toHaveValue(plan.instruction_count);

      const deleteButton = within(currentPlan).getByTestId('edit-plan-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    // Check Add Plan button
    expect(screen.getByTestId('edit-plan-add')).toBeInTheDocument();

    // Check Cancel and Save buttons
    expect(screen.getByTestId('edit-test-suite-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('edit-test-suite-save')).toBeInTheDocument();
  });

  it('allows changing values of every editable field', () => {
    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Change test suite name
    const newTestSuiteName = 'New Test Suite Name [Edited]';
    const testSuiteNameInput = screen.getByTestId('edit-form-suite-name-input');
    expect(testSuiteNameInput).toHaveValue('Suite Mix Save Mental');

    fireEvent.change(testSuiteNameInput, {
      target: { value: newTestSuiteName },
    });

    expect(testSuiteNameInput).toHaveValue(newTestSuiteName);

    // {
    //   test_name: "Test Plan Stiff Any Main",
    //   browser: "firefox",
    //   instruction_count: 33,
    // },
    const firstPlan = screen.getAllByTestId('edit-form-test-plan')[0];

    const nameInput = within(firstPlan).getByTestId('edit-plan-name-input');
    const browserInput = within(firstPlan).getByTestId(
      'edit-plan-browser-input'
    );
    const instructionsInput = within(firstPlan).getByTestId(
      'edit-plan-instructions-input'
    );

    expect(nameInput).toHaveValue('Test Plan Stiff Any Main');
    expect(browserInput).toHaveValue('firefox');
    expect(instructionsInput).toHaveValue(33);

    const newName = 'test-new-name';
    const newBrowser = 'safari';
    const newCount = 10;

    fireEvent.change(nameInput, { target: { value: newName } });
    fireEvent.change(browserInput, { target: { value: newBrowser } });
    fireEvent.change(instructionsInput, {
      target: { value: newCount },
    });

    expect(nameInput).toHaveValue(newName);
    expect(browserInput).toHaveValue(newBrowser);
    expect(instructionsInput).toHaveValue(newCount);
  });

  it('allows to add a new test plan', () => {
    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Check List of Test Plans
    expect(screen.getAllByTestId('edit-form-test-plan')).toHaveLength(6);

    const addPlanButton = screen.getByTestId('edit-plan-add');

    fireEvent.click(addPlanButton);

    expect(screen.getAllByTestId('edit-form-test-plan')).toHaveLength(7);

    fireEvent.click(addPlanButton);

    expect(screen.getAllByTestId('edit-form-test-plan')).toHaveLength(8);
  });

  it('allows delete a plan from the plan list', () => {
    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    const expectedResult = [
      {
        test_name: 'Test Plan Stiff Any Main',
        browser: 'firefox',
        instruction_count: 33,
      }, // Without second item
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

    // Check List of Test Plans
    const preDeletePlans = screen.getAllByTestId('edit-form-test-plan');
    expect(preDeletePlans).toHaveLength(6);

    // Check all the plans
    editedTestSuite.test_plans.forEach((plan, idx) => {
      const currentPlan = preDeletePlans[idx];

      const nameInput = within(currentPlan).getByTestId('edit-plan-name-input');
      expect(nameInput).toHaveValue(plan.test_names);
    });

    // Grab the second plan to delete
    const secondPlanToDeleteButton = within(preDeletePlans[1]).getByTestId(
      'edit-plan-delete'
    );

    fireEvent.click(secondPlanToDeleteButton);

    // Get all the plans again
    const postDeletePlans = screen.getAllByTestId('edit-form-test-plan');
    expect(postDeletePlans).toHaveLength(5);

    // Check all the plans and compare to the expected results
    expectedResult.forEach((plan, idx) => {
      const currentPlan = postDeletePlans[idx];

      const nameInput = within(currentPlan).getByTestId('edit-plan-name-input');
      expect(nameInput).toHaveValue(plan.test_names);
    });
  });

  it('when clicking on cancel goes back to the suite_list', () => {});

  it('when clicking on save without changing anything it prints the serialized test suite', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    const expectedResult = JSON.stringify(editedTestSuite);

    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Try without changes
    const saveButton = screen.getByTestId('edit-test-suite-save');

    fireEvent.click(saveButton);

    expect(consoleLogSpy).toBeCalledWith(expectedResult);
  });

  it('when clicking on save after changes it prints the serialized edited test suite', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Try with some changes
    const newTestSuiteNameSave =
      'Test Plan for Daniel Reis to join Rainforest QA';
    const expectedResultChanges = JSON.stringify({
      id: 1,
      test_suite_name: newTestSuiteNameSave,
      test_plans: [
        {
          test_name: 'Changed',
          browser: 'chrome',
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
        {
          test_name: 'new test',
          browser: 'chrome',
          instruction_count: 1,
        },
      ],
    });

    // Change test suite name
    const testSuiteNameInput = screen.getByTestId('edit-form-suite-name-input');
    fireEvent.change(testSuiteNameInput, {
      target: { value: newTestSuiteNameSave },
    });

    // Change Second element
    const secondPlan = screen.getAllByTestId('edit-form-test-plan')[1];
    const nameInput = within(secondPlan).getByTestId('edit-plan-name-input');
    const browserInput = within(secondPlan).getByTestId(
      'edit-plan-browser-input'
    );

    fireEvent.change(nameInput, {
      target: { value: 'Changed' },
    });
    fireEvent.change(browserInput, {
      target: { value: 'chrome' },
    });

    // Delete first
    const firstPlan = screen.getAllByTestId('edit-form-test-plan')[0];
    const deleteButton = within(firstPlan).getByTestId('edit-plan-delete');

    fireEvent.click(deleteButton);

    // Add new test plan
    const addButton = screen.getByTestId('edit-plan-add');
    fireEvent.click(addButton);
    const lastPlan = screen.getAllByTestId('edit-form-test-plan').pop();
    const lastPlanNameInput = within(lastPlan).getByTestId(
      'edit-plan-name-input'
    );

    fireEvent.change(lastPlanNameInput, { target: { value: 'new test' } });

    // Try with changes
    const saveButton = screen.getByTestId('edit-test-suite-save');

    fireEvent.click(saveButton);

    expect(consoleLogSpy).toBeCalledWith(expectedResultChanges);
  });

  it('when trying to submit invalid test suite edit it throws an error and does not submit', () => {
    const consoleLogSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<TestSuiteForm suite={editedTestSuite} onBack={onBack} />);

    // Add new test plan
    const addButton = screen.getByTestId('edit-plan-add');
    fireEvent.click(addButton);

    // Try with changes
    const saveButton = screen.getByTestId('edit-test-suite-save');

    fireEvent.click(saveButton);

    expect(consoleLogSpy).toBeCalledWith('Invalid edit please fix');
  });
});
