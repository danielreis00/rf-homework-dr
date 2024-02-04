/**
 * TestPlans components renders a list of test plans
 * displaying the name, browser and steps count
 */
export default function TestPlans({ plans }) {
  return (
    <div className='grid grid-flow-row gap-1'>
      {plans.map((plan, idx) => {
        return (
          <div
            key={idx}
            className='grid grid-cols-4 text-left'
            data-testid='test-plans-item'
          >
            <div data-testid='test-plans-item-name' className='col-span-2'>
              {plan.test_name}
            </div>
            <div data-testid='test-plans-item-browser'>{plan.browser}</div>
            <div data-testid='test-plans-item-instructions'>
              {plan.instruction_count} steps
            </div>
          </div>
        );
      })}
    </div>
  );
}
