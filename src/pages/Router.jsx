import { Route, Routes } from 'react-router-dom';
import TestSuiteList from './TestSuiteList';
import TestSuiteEdit from './TestSuiteEdit';

export default function Router() {
  return (
    <Routes>
      <Route index element={<TestSuiteList />} />
      <Route path='/test_suites'>
        <Route index element={<TestSuiteList />} />
        <Route path=':id' element={<TestSuiteEdit />} />
      </Route>
    </Routes>
  );
}
