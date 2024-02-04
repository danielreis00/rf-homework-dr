import React, { useState, useEffect } from 'react';
import TestSuite from './TestSuite';
import fetcher from '../../utils/fetcher';

/**
 * TestSuiteList component that renders a list of TestSuite components
 */
export default function TestSuiteList() {
  const [suites, setSuites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = [];

      setIsLoading(true);
      try {
        data = await fetcher('http://localhost:3456/test_suites');
      } catch {
        console.error('Error fetching data');
      } finally {
        setSuites(data);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div data-testid='list-is-loading'>Is Loading</div>;
  }

  if (suites.length === 0) {
    return <div data-testid='list-is-empty'>Add your first test suite</div>;
  }

  return (
    <div className='p-10'>
      <h1 className='font-semibold py-5 text-xl'>Test Suites:</h1>
      <div data-testid='test-suite-list' className='flex flex-col gap-3'>
        {suites.map((suite) => (
          <TestSuite key={suite.id} suite={suite} />
        ))}
      </div>
    </div>
  );
}
