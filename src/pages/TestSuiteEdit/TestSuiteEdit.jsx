import { useParams } from 'react-router-dom';

export default function TestSuiteEdit() {
  let { id } = useParams();

  return <div>Edit {id}</div>;
}
