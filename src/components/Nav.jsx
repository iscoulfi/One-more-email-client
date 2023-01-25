import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { setAccord } from '../redux/slices/accSlice';

function BasicExample({ onClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    window.localStorage.removeItem('id');
    dispatch(logout());
    navigate('/');
  };

  const { username } = useSelector(state => state.auth.user);

  return (
    <Navbar
      className="navibar rounded-top"
      bg="secondary"
      expand="sm"
      sticky="top"
    >
      <Container>
        <NavLink to=".">
          <Navbar.Brand>
            <img
              src="../img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              onClick={e => {
                e.preventDefault();
                dispatch(setAccord(1));
                navigate('.');
              }}
            />
          </Navbar.Brand>
        </NavLink>
        <Link
          to="inbox"
          className="username mr-2"
          onClick={e => {
            e.preventDefault();
            dispatch(setAccord(0));
            navigate('inbox');
          }}
        >
          {username}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="inbox"
              onClick={e => {
                e.preventDefault();
                dispatch(setAccord(0));
                navigate('inbox');
              }}
            >
              INBOX
            </NavLink>
            <NavLink
              to="sent"
              onClick={e => {
                e.preventDefault();
                dispatch(setAccord(0));
                navigate('sent');
              }}
            >
              SENT
            </NavLink>
          </Nav>
          <TbLogout className="logout" onClick={logoutUser} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
