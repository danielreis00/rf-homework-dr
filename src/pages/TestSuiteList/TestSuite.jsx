import React, { useState } from 'react';
import TestPlans from './TestPlans';
import { Link } from 'react-router-dom';

/**
 * TestSuite component that allows displaying a test suite information
 * (name, test count and each test plan inside it)
 */
export default function TestSuite({ suite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { test_suite_name: name, test_plans: plans } = suite;

  return (
    <button
      data-testid='test-suite-card'
      onClick={(e) => {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      }}
    >
      <section className='border rounded border-slate-300'>
        <header className='bg-slate-200 p-3 rounded'>
          <div className='flex gap-5 items-center'>
            <div>
              <ExpandIcon isExpanded={isExpanded} />
            </div>
            <div data-testid='test-suite-title' className='flex-1 text-left'>
              {name}
            </div>
            <div data-testid='test-suite-count'>{plans.length} tests</div>
            <Link
              className='text-blue-600'
              to={`/test_suites/${suite.id}`}
              state={{ suite }}
              data-testid='test-suite-edit'
            >
              Edit
            </Link>
          </div>
        </header>
        {isExpanded ? (
          <div className='py-5 px-14' data-testid='test-suite-plans-section'>
            <TestPlans plans={plans} />
          </div>
        ) : null}
      </section>
    </button>
  );
}

function ExpandIcon({ isExpanded }) {
  if (isExpanded) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m4.5 15.75 7.5-7.5 7.5 7.5'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-5 h-5'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m19.5 8.25-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
}
