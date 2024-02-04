import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TestSuiteForm from './TestSuiteForm';

export default function TestSuiteEdit() {
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <TestSuiteForm suite={state.suite} />
    </div>
  );
}
