// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TestSuiteForm from './TestSuiteForm';
import { useNavigate } from 'react-router-dom';

export default function TestSuiteEdit() {
  // const { id } = useParams(); This would be used for the fetch if state was undefined
  const { state } = useLocation();
  const navigate = useNavigate();

  // There is a possibility of the user access directly the url and that would
  // throw an error because state would be undefined. I would add some logic here
  // so if there is no state it would fetch the item from the server and go throw
  // a normal fetch/loading flow

  if (!state) {
    return <div>This was out of the scope and therefore not implemented</div>;
  }

  return (
    <div>
      <TestSuiteForm
        suite={state.suite}
        onBack={() => navigate('/test_suites')}
      />
    </div>
  );
}
