import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TestSuiteForm from './TestSuiteForm';
import { useNavigate } from 'react-router-dom';

export default function TestSuiteEdit() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <TestSuiteForm
        suite={state.suite}
        onBack={() => navigate('/test_suites')}
      />
    </div>
  );
}
