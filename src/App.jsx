import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import NotFound from './components/NotFound';
import InboxSent from './components/InboxSent';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/slices/authSlice';
import { toast } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);
  const { messages, sentMessages } = useSelector(state => state.table);

  useEffect(() => {
    dispatch(getMe(window.localStorage.id));
  }, [dispatch]);

  useEffect(() => {
    if (status) toast(status);
  }, [status]);
  return (
    <BrowserRouter>
      <div className="container">
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainLayout />}>
              <Route
                path="inbox"
                element={<InboxSent messages={messages} person="sender" />}
              />
              <Route
                path="sent"
                element={
                  <InboxSent messages={sentMessages} person="recipient" />
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
