import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { setAccord } from '../redux/slices/accSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home/inbox');
  }, [status, user, dispatch, navigate]);

  function handleFormSubmit(event) {
    event.preventDefault();
    try {
      dispatch(loginUser(username));
      setUsername('');
      navigate('/home');
      dispatch(setAccord(1));
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleInputChange(text) {
    setUsername(text);
  }

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">Sign in</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="username"
                  className="form-control"
                  value={username}
                  onChange={event => handleInputChange(event.target.value)}
                />
                <label className="form-label">Username</label>
              </div>
              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
