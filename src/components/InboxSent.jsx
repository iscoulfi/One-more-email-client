import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, getSentMessages } from '../redux/slices/tableSlice';
import Table from 'react-bootstrap/Table';
import Modal from './Modal';

function DarkExample({ messages, person }) {
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.auth.user);
  const answer = useSelector(state => state.acc.answer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = ind => setShow(reverseMsg[ind].message);

  useEffect(() => {
    dispatch(
      person === 'sender' ? getMessages(username) : getSentMessages(username)
    );
  }, [dispatch, username, person]);

  let reverseMsg = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    reverseMsg.push(messages[i]);
  }

  return (
    <>
      {answer ? (
        <>
          <Modal show={show} handleClose={handleClose} person={person} />
          <Table striped hover>
            <tbody>
              {reverseMsg.map((el, ind) => (
                <tr onClick={() => handleShow(ind)} key={el._id || ind}>
                  <td className="text-center col-2">{el[person]}</td>
                  <td className="col-6">{el.message.theme}</td>
                  <td className="text-center col-3">
                    {new Date(el.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default DarkExample;
