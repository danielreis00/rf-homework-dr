export default function TestPlans({ plans }) {
  return (
    <div className='grid grid-flow-row gap-1'>
      {plans.map((plan, idx) => {
        return (
          <div key={idx} className='grid grid-cols-4 text-left'>
            <div className='col-span-2'>{plan.test_name}</div>
            <div>{plan.browser}</div>
            <div>{plan.instruction_count}</div>
          </div>
        );
      })}
    </div>
  );
}
