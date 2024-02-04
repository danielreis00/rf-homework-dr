import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * TestSuiteForm component that allows edit a test suite
 * but could be easily adapted to be reused to add new ones too
 */
export default function TestSuiteForm({ suite, onBack }) {
  const { id, test_suite_name, test_plans } = suite;
  const [editSuiteName, setEditSuiteName] = useState(test_suite_name);
  const [editPlans, setEditPlans] = useState(
    test_plans.map((plan) => ({ ...plan, id: uuidv4() })) // Adding a local id to be used mainly as a react key when listing the items
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      id,
      test_suite_name: editSuiteName,
      // Remove the local id before sending to server
      test_plans: editPlans.map((plan) => ({
        test_name: plan.test_name,
        browser: plan.browser,
        instruction_count: plan.instruction_count,
      })),
    };

    // Really simplistic validation
    const validator = (payload) => {
      const { test_suite_name: name, test_plans: plans } = payload;
      let isValid = true;

      if (name.length === 0 || plans.length === 0) return false;

      for (let i = 0; i < plans.length; i++) {
        const current = plans[i];

        if (current.test_name.length === 0 || current.instruction_count < 1)
          return false;
      }

      return isValid;
    };

    const isValid = validator(payload);

    // If valid submits
    if (isValid) {
      console.log(JSON.stringify(payload));
    } else {
      //If not throws an error but should proper display UI feedback of course
      console.error('Invalid edit please fix');
    }
  };

  // Generic handler for edit plan field changes
  const handleEditPlanChange = (id) => {
    return (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      setEditPlans((prevEditPlans) =>
        prevEditPlans.map((plan) => {
          if (plan.id === id) {
            return { ...plan, [fieldName]: fieldValue };
          }

          return plan;
        })
      );
    };
  };

  return (
    <div className='flex flex-col items-center p-10'>
      <section className='rounded border border-slate-200'>
        <header className='bg-slate-200 w-full h-[40px] flex p-10 items-center'>
          <h1 data-testid='edit-form-title' className='text-xl font-semibold'>
            Edit Test Suite #{id}
          </h1>
        </header>
        <section className='p-10'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <h2 className='font-semibold'>Test Suite</h2>
            <div className='flex flex-col gap-2'>
              <label>Name:</label>
              <input
                data-testid='edit-form-suite-name-input'
                className='w-full py-1 px-3 border border-slate-400 rounded-sm h-[32px]'
                type='text'
                name='name'
                value={editSuiteName}
                onChange={(event) => setEditSuiteName(event.target.value)}
              />
            </div>
            <h2 className='font-semibold'>Test Plans</h2>
            <section className='grid grid-flow-row gap-2'>
              <div className='grid grid-cols-9 gap-2'>
                <div className='col-span-4'>Name</div>
                <div className='col-span-2'>Browser</div>
                <div className='col-span-2'>Instructions (steps)</div>
              </div>
              {editPlans.map((editPlan) => {
                return (
                  <div
                    key={editPlan.id}
                    className='grid grid-cols-9 gap-2'
                    data-testid='edit-form-test-plan'
                  >
                    <div className='col-span-4'>
                      <input
                        data-testid='edit-plan-name-input'
                        autoComplete='off'
                        className='w-full py-1 px-3 border border-slate-400 rounded-sm h-[32px]'
                        type='text'
                        name='test_name'
                        value={editPlan.test_name}
                        onChange={handleEditPlanChange(editPlan.id)}
                      />
                    </div>
                    <div className='col-span-2'>
                      <select
                        data-testid='edit-plan-browser-input'
                        name='browser'
                        value={editPlan.browser}
                        onChange={handleEditPlanChange(editPlan.id)}
                        className='w-full py-1 px-3 border border-slate-400 rounded-sm h-[32px]'
                      >
                        <option value='chrome'>Chrome</option>
                        <option value='firefox'>Firefox</option>
                        <option value='edge'>Edge</option>
                        <option value='safari'>Safari</option>
                      </select>
                    </div>
                    <div className='col-span-2'>
                      <input
                        data-testid='edit-plan-instructions-input'
                        type='number'
                        autoComplete='off'
                        min={1}
                        className='py-1 px-3 border border-slate-400 rounded-sm h-[32px]'
                        required='required'
                        placeholder='Enter a step count...'
                        name='instruction_count'
                        onChange={handleEditPlanChange(editPlan.id)}
                        value={editPlan.instruction_count}
                      ></input>
                    </div>
                    <div>
                      <button
                        data-testid='edit-plan-delete'
                        className=' text-red-600  h-[32px]'
                        onClick={(e) => {
                          e.preventDefault();
                          setEditPlans((prevList) =>
                            prevList.filter((plan) => plan.id !== editPlan.id)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                data-testid='edit-plan-add'
                className='p-2 text-blue-600 border rounded'
                onClick={(e) => {
                  e.preventDefault();
                  const newTestPlanSkeleton = {
                    id: uuidv4(),
                    test_name: '',
                    browser: 'chrome',
                    instruction_count: 1,
                  };

                  setEditPlans((prevList) => {
                    const newList = [...prevList];
                    newList.push(newTestPlanSkeleton);

                    return newList;
                  });
                }}
              >
                + Add Plan
              </button>
              <footer className='flex justify-center items-center gap-10 pt-10'>
                <button
                  data-testid='edit-test-suite-cancel'
                  className='text-blue-600'
                  onClick={(e) => {
                    e.preventDefault();
                    onBack();
                  }}
                >
                  Back
                </button>
                <button
                  data-testid='edit-test-suite-save'
                  className='h-[40px] w-[100px] rounded p-2 bg-green-600 text-white'
                >
                  Save
                </button>
              </footer>
            </section>
          </form>
        </section>
      </section>
    </div>
  );
}
