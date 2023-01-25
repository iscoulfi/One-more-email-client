import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccord } from '../redux/slices/accSlice';

function Example({ show, handleClose, person }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        show={show !== false}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{show.theme}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{show.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {person === 'sender' && (
            <Button
              variant="dark"
              onClick={() => {
                handleClose();
                navigate('/home');
                dispatch(setAccord(1));
              }}
            >
              Answer
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
