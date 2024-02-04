import React, { useState, useEffect } from 'react';
import TestSuite from './TestSuite';

export default function TestSuiteList() {
  const [suites, setSuites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3456/test_suites')
      .then((response) => response.json())
      .then((data) => setSuites(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (suites.length === 0) {
    return <div>Add your first test suite</div>;
  }

  return (
    <div className='p-10'>
      <h1>Test Suites:</h1>
      <div data-testid='test-suite-list' className='flex flex-col gap-3'>
        {suites.map((suite) => (
          <TestSuite key={suite.id} suite={suite} />
        ))}
      </div>
    </div>
  );
}
