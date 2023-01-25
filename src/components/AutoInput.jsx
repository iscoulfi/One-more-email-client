import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useEffect } from 'react';
import { setTo } from '../redux/slices/msgSlice';
import { useDispatch, useSelector } from 'react-redux';

const AutoInput = ({ state, setState }) => {
  const dispatch = useDispatch();
  const all = useSelector(state => state.table.all);

  useEffect(() => {
    dispatch(setTo(state[0]));
  }, [dispatch, state]);

  const options = all.map(user => user.username);

  return (
    <>
      <Form.Group>
        <Form.Label>Select Name</Form.Label>
        <Typeahead
          clearButton
          id="basic-typeahead-single"
          labelKey="name"
          onChange={setState}
          options={options}
          placeholder="Enter username"
          selected={state}
        />
      </Form.Group>
    </>
  );
};
export default AutoInput;
