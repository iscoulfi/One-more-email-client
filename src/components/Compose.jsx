import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  getAll,
  inboxMsg,
  sentMsg,
} from '../redux/slices/tableSlice';
import { toggleAccord } from '../redux/slices/accSlice';
import { toast } from 'react-toastify';
import { setMessage, setTheme, setTo } from '../redux/slices/msgSlice';
import { io } from 'socket.io-client';
import Accordion from 'react-bootstrap/Accordion';
import AutoInput from './AutoInput';

function BasicExample() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const all = useSelector(state => state.table.all);
  const accord = useSelector(state => state.acc.accord);
  let { to, theme, message } = useSelector(state => state.msg);
  const from = user.username;
  const socket = useRef();
  const [state, setState] = useState([]);

  useEffect(() => {
    if (user) {
      socket.current = io(process.env.REACT_APP_SERVER);
      socket.current.emit('add-user', user._id);
    }
  }, [user, socket]);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const sendMessage = () => {
    dispatch(addMessage({ from, to, theme, message }));
    socket.current.emit('send-msg', {
      from,
      to: all.find(user => user.username === to)._id,
      theme,
      message,
    });
    dispatch(
      sentMsg({
        createdAt: Date(),
        recipient: to,
        sender: from,
        message: { theme, text: message },
      })
    );
    toast('Message sent.');
    setState([]);
    dispatch(setTo(''));
    dispatch(setTheme(''));
    dispatch(setMessage(''));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', ({ from, theme, message }) => {
        toast(`${from}: ${theme}`);
        dispatch(
          inboxMsg({
            createdAt: Date(),
            sender: from,
            message: { theme, text: message },
          })
        );
      });
    }
  }, [socket, user.username, dispatch]);

  function handleFormSubmit(event) {
    event.preventDefault();
    try {
      if (all.find(el => el.username === to)) {
        sendMessage();
      } else {
        toast('This user does not exist.');
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Accordion flush activeKey={`${accord}`}>
      <Accordion.Item eventKey="1">
        <Accordion.Header
          onClick={() => {
            dispatch(toggleAccord());
          }}
        >
          COMPOSE
        </Accordion.Header>
        <Accordion.Body>
          <div className="container message mb-5 mt-4">
            <Form onSubmit={handleFormSubmit}>
              <AutoInput state={state} setState={setState} />

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={theme}
                  onChange={event => dispatch(setTheme(event.target.value))}
                />
              </Form.Group>

              <FloatingLabel
                className="mb-3"
                controlId="floatingTextarea2"
                label="Message"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  value={message}
                  onChange={event => dispatch(setMessage(event.target.value))}
                />
              </FloatingLabel>

              <Button variant="secondary" type="submit" className="mb-3">
                Submit
              </Button>
            </Form>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;
